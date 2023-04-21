import { Button } from "react-bootstrap";
import MovesCenteredModal from "./modalMoves";
import { useState } from "react";

export function MovesModalButton(props: any) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Button onClick={() => setModalShow(true)} variant="info">
        Stats & Moves
      </Button>
      <MovesCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        pokeplant={props.pokeplant}
      />
    </>
  );
}
