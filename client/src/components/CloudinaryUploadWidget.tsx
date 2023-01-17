import React, { Component } from "react";
import { supabase } from "../app/supabaseClient";
import { useAppSelector } from "../app/hooks";
import { useState, useEffect } from 'react';
declare global {
  interface Window {
    cloudinary: any;
  }
}


const useCloudinaryUploadWidget = (cloudName:any, uploadPreset:any, session:any) => {
  const [imageUrl, setImageUrl] = useState('');
  const [plantName, setPlantName] = useState('');
  

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
              if(imageToSet){
                imageToSet.setAttribute("src", result.info.secure_url);
              }
              const plantNameToSet = document.getElementById("plantName");
              if(plantNameToSet){
                plantNameToSet.textContent = data.bestMatch;
              }
              
                console.log("session.user.id");
                //TODO il que je propage session jusqu'ici de façon à pouvoir faire un insert en étant co
                const { error } = await supabase
                .from('pokePlant')
                .insert({ name: data.bestMatch,  owner: 3, image: result.info.secure_url, description: "Une plante de test", type:"Feu"})
              
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
  }, [cloudName, uploadPreset]);

  return { imageUrl, plantName };
}

function CloudinaryUploadWidget() {
  const session = useAppSelector((state) => state.session.session)
  const { imageUrl, plantName } = useCloudinaryUploadWidget("df2mi0xff", "pokePlant", session);

  return (
    <>
      <button id="upload_widget" className="cloudinary-button">
        Upload
      </button>
    </>
  );
}

export default CloudinaryUploadWidget;
