import { Col, Container, Row } from "react-bootstrap";
import { BattleTerrain } from "../../components/BattleTerrain";
import { RoomList } from "../../components/RoomList";

function Battle() {
  return (
    <>
      <Container fluid style={{margin: "20px", height: "80%"}}>
        <Row>
          <Col md={9}>
            <Container style={{backgroundImage: "https://i.pinimg.com/736x/e2/84/b1/e284b14af595f046c749aea762b546a6--labels-backgrounds.jpg", width: "100%", height: "100%"}}>
              <BattleTerrain></BattleTerrain>
            </Container>
          </Col>
          <Col md={3}>
            <RoomList></RoomList>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Battle;
