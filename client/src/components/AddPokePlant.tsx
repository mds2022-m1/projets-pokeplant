import { Button, Card, Container, Row } from "react-bootstrap";

import CloudinaryUploadWidget from "./CloudinaryUploadWidget";

export function AddPokePlant() {
  return (
    <Container>
      <Row>
        <h3>Capture</h3>
        <CloudinaryUploadWidget />
      </Row>
      <Row className="text-center">
        <Card>
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
      </Row>
      
    </Container>
  );
}
