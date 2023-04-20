import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import MoveCard from "./moveCard";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { supabase } from "../../app/supabaseClient";

export default function MovesCenteredModal(props: any) {
  const [moves, setMoves] = useState(Array<any>);

  useEffect(() => {
    async function fetchMoves() {
      const moves = await getPokeplantMoves(props.pokeplant.id);
      setMoves(moves as any);
      console.log(moves);
    }
    fetchMoves();
  }, []);

  return (
    <Modal
      onHide={props.onHide}
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.pokeplant.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <img
          src={props.pokeplant.image}
          alt={props.pokeplant.name}
          width={"30%"}
          height={"20%"}
        ></img>
        <Container className="mt-3">
          <Row>
            <Col style={{ color: "#63BD5A" }}>HP: {props.pokeplant.hp}</Col>
            <Col style={{ color: "#CF3F6B" }}>ATK: {props.pokeplant.atk}</Col>
            <Col style={{ color: "#036DC4" }}>DEF: {props.pokeplant.def}</Col>
            <Col style={{ color: "#ED90E7" }}>
              ATK SPE: {props.pokeplant.atk_spe}
            </Col>
            <Col style={{ color: "#90ABDF" }}>SPD: {props.pokeplant.spd}</Col>
          </Row>
        </Container>
        <MoveCard moveSet={moves} className="mt-3" />
      </Modal.Body>
      <Modal.Footer className="text-center">
        <Button variant="warning" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export async function getPokeplantMoves(plant_id: number) {
  try {
    const {data, error} = await supabase.rpc("get_pokeplant_moves", {pokeplant_id: plant_id});
    if (error) {
      console.error(error);
    }
    return data;
  } catch (error: any) {
    console.error(error.message);
  }
}
