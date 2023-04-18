import { supabase } from "../app/supabaseClient";
import { useAppSelector } from "../app/hooks";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
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
          console.error('Error getting location:', error);
        }
      );
    }, []);
  

  useEffect(() => {
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        sources: ["local", "camera"],
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

                console.log(latitude);
                console.log(longitude);
                const bestMatch = data.bestMatch;
                const imageUrl = result.info.secure_url;

                await supabase.rpc('insert_pokeplant', {
                  name: bestMatch, // Nom de la plante
                  image: imageUrl,
                });
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
      <Button variant="primary" id="upload_widget" className="cloudinary-button">
        Initiate Capture!
      </Button>
    </>
  );
}



export default CloudinaryUploadWidget;
