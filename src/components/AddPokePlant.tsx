import { Button, Card } from "react-bootstrap";

import CloudinaryUploadWidget from "./CloudinaryUploadWidget";

export function AddPokePlant() {
  return (
    <div className="App">
      <h3>Cloudinary Upload Widget Example</h3>
      <CloudinaryUploadWidget />

      <Card style={{ width: "18rem" }}>
        <Card.Img id="uploadedimage" variant="top" src="" />
        <Card.Body>
          <Card.Title id="plantName">Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
