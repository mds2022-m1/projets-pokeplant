import { supabase } from "../app/supabaseClient";
import { useAppSelector } from "../app/hooks";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import graphql from "../graphql/graphql";
declare global {
  interface Window {
    cloudinary: any;
  }
}

const useCloudinaryUploadWidget = (cloudName: any, uploadPreset: any) => {
  const [imageUrl, setImageUrl] = useState("");
  const [plantName, setPlantName] = useState("");
  const userId = useAppSelector((state) => state.user.id);
  console.log(userId);

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    // Get the current location coordinates using the Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  useEffect(() => {
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        sources: ["camera", "local"],
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          setImageUrl(result.info.secure_url);
          fetch(
            "https://my-api.plantnet.org/v2/identify/all?images=" +
              result.info.secure_url +
              "&include-related-images=false&no-reject=false&lang=fr&api-key=2b10hlrRSUiQV3AAUjb9L3P7e"
          )
            .then((response) => response.json())
            .then(async (data) => {
              setPlantName(data.bestMatch);
              const imageToSet = document.getElementById("uploadedimage");
              if (imageToSet) {
                imageToSet.setAttribute("src", result.info.secure_url);
              }
              const plantNameToSet = document.getElementById("plantName");
              if (plantNameToSet) {
                plantNameToSet.textContent = data.bestMatch;
              }

              if (userId) {
                const bestMatch = data.bestMatch;
                const imageUrl = result.info.secure_url;

                await insertPokePlantByGraph(bestMatch, imageUrl, userId, latitude, longitude);

                // await supabase.rpc('insert_pokeplant', {
                //   name: bestMatch, // Nom de la plante
                //   image: imageUrl,
                //   latitude: latitude,
                //   longitude: longitude
                // });
              }
            });
        }
      }
    );

    const buttonUpload = document.getElementById("upload_widget");

    if (buttonUpload) {
      buttonUpload.addEventListener(
        "click",
        function () {
          myWidget.open();
        },
        false
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cloudName, uploadPreset, userId]);

  return { imageUrl, plantName };
};

function CloudinaryUploadWidget() {
  const { imageUrl, plantName } = useCloudinaryUploadWidget(
    "df2mi0xff",
    "pokePlant"
  );

  return (
    <>
      <Button
        variant="primary"
        id="upload_widget"
        className="cloudinary-button"
      >
        Initiate Capture!
      </Button>
    </>
  );
}

async function insertPokePlantByGraph(
  name: string,
  image: string,
  owner: string,
  latitude?: number | null,
  longitude?: number | null
) {
  await graphql(`mutation insertPoPl{
    insertIntopokeplantCollection(objects: [
      {
        name: "${name}",
        image: "${image}",
        latitude: ${latitude},
        longitude: ${longitude},
        owner: "${owner}"
      }
    ]) {
      affectedCount
    }
  }
  `);
  await graphql(`query getMyPlants {
    profilesCollection(orderBy: [{id: AscNullsFirst}] filter: {id: {eq: "${owner}"}}){
      edges{
        node{
          id
          username
          gender
          pokeplantCollection{
            edges{
              node{
                name
                latitude
                longitude
              }
            }
          }
        }
      }
    }
  }`)
}

// async function graphqltest(name: String, image: String, latitude: any, longitude: any) {
//   axios.post("https://omtnzppzghmnxbwxmrha.supabase.co/graphql/v1?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tdG56cHB6Z2htbnhid3htcmhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM4NTc3NjgsImV4cCI6MTk4OTQzMzc2OH0.iKL1RCvE5mpq3wbv1t1j5yCK3LQk3Q8iHK1I7vcSNw8", {
//     query: `mutation insertPoPl{
//       insertIntopokeplantCollection(objects: [
//         {
//           name: `+name+`,
//           image: `+image+`,
//           latitude: `+latitude+`,
//           longitude: `+longitude+`
//         }
//       ]) {
//         affectedCount
//       }
//     }
//     `
//   });
// }

export default CloudinaryUploadWidget;
