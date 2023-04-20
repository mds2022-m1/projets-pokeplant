import { Button, Card, Container, Row } from "react-bootstrap";

import CloudinaryUploadWidget from "./CloudinaryUploadWidget";

export function AddPokePlant() {
  return (
    <Container>
      <Row>
        <h3>Capture</h3>
        <CloudinaryUploadWidget />
      </Row>
      <Row className="text-center mt-5">
        <Card>
          <Card.Img id="uploadedimage" variant="top" src="" style={{ maxWidth: "20vw"}}/>
          <Card.Body>
            <Card.Title id="plantName">Pokeplant added will appear here</Card.Title>
          </Card.Body>
        </Card>
      </Row>
      
    </Container>
  );
}
