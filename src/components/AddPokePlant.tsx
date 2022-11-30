import { useRef, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import React from "react";
import { useForm, Resolver } from "react-hook-form";

export function AddPokePlant() {

  // const file = useRef<HTMLInputElement>(null);

  // const handleSubmission = async () => {
  //   if (!file.current?.value) {
  //     return;
  //   }

  //   const formData = new FormData();

  //   formData.append("source", file.current?.value);

  //   const options = {
  //     method: "POST",
  //     body: formData,
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   };

  //   fetch(
  //     "https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5&format=json",
  //     options
  //   )
  //     .then((result) => {
  //       console.log("Success:", result);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  // const AddPlant = () => {
  //   console.log(file.current?.value);
  // };

  // return (
  //   <>
  //     <Container className="">
  //       <Card className="text-center">
  //         <Card.Header>
  //           <h3>Add a PokePlant</h3>
  //         </Card.Header>
  //         <Card.Body>
  //           <Form.Group controlId="formFile" className="mb-3">
  //             <Form.Label>Default file input example</Form.Label>
  //             <Form.Control ref={file} type="file" />
  //           </Form.Group>
  //           <hr></hr>
  //           <Button variant="primary" onClick={handleSubmission}>
  //             Valid
  //           </Button>
  //         </Card.Body>
  //       </Card>
  //     </Container>
  //   </>
  // );



  
  type FormValues = {
    source: File;
  };
  
  const resolver: Resolver<FormValues> = async (values) => {
    return {
      values: values.source ? values : {},
      errors: !values.source
        ? {
            source: {
              type: 'required',
              message: 'This is required.',
            },
          }
        : {},
    };
  };
  

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver });
    //const onSubmit = handleSubmit((data) => console.log(data));
    const onSubmit = handleSubmit(function (data) {console.log(data); 

      const formData = new FormData();

    formData.append("source", data.source.webkitRelativePath);

    const options = {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    fetch(
      "https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5&format=json",
      options
    )
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      return data;});


    

  // const handleSubmission = async () => {
    

  //   const formData = new FormData();

  //   formData.append("source", file.current?.value);

  //   const options = {
  //     method: "POST",
  //     body: formData,
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   };

  //   fetch(
  //     "https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5&format=json",
  //     options
  //   )
  //     .then((result) => {
  //       console.log("Success:", result);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };
  
    return (
      
      <form onSubmit={onSubmit}>
        <input {...register("source")} type='file' />
        {errors?.source && <p>{errors.source.message}</p>}
          
        <input type="submit" />
      
      </form>
    );
  
}
