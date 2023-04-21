import { Card, Col, Container, Row } from "react-bootstrap";

import CloudinaryUploadWidget from "./CloudinaryUploadWidget";

export function AddPokePlant() {
  return (
    <Container>
      <Row>
        <CloudinaryUploadWidget />
      </Row>
      <Row className="text-center mt-3">
        <Card>
          <Col className="md-6">
          <Card.Img id="uploadedimage" variant="top" src="" style={{ maxWidth: "20vw"}}/>
          </Col>
          <Card.Body>
            <Card.Title id="plantName">Pokeplant added will appear here</Card.Title>
          </Card.Body>
        </Card>
      </Row>
      
    </Container>
  );
}
