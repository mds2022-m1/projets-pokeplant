import { useEffect, useState } from "react";
import { supabase } from "../../app/supabaseClient";
import { Button, Card, Col, Container, Row, Modal } from "react-bootstrap";
import MovesCenteredModal from "./modalMoves";
import "./style.css";
import { MovesModalButton } from "./movesModalButton";

export default function Garden() {
  const [pokeplants, setPokeplants] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Shorten the name of the pokeplant
  const shortenName = (name: string) => {
    if (name.length > 30) {
      return name.substring(0, 30) + "...";
    } else {
      return name;
    }
  };

  async function getPokeplants() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.rpc("get_user_pokeplants");
      if (error) {
        console.log(error);
      } else {
        setPokeplants(data);
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function deletePokeplant(id: string) {
    setIsLoading(true);
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to release this pokeplant ?")) {
      try {
        const { error } = await supabase
          .from("pokeplant")
          .delete()
          .eq("id", id);
        if (error) {
          console.error(error);
        } else {
          setPokeplants(pokeplants.filter((pokeplant) => pokeplant.id !== id));
        }
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    getPokeplants();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="d-flex align-items-center justify-content-center vh-100 vw-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <Container className="text-center" id="garden_container">
          <Row className="text-center">
            {pokeplants.length !== 0 ? (
              pokeplants.map((pokeplant) => {
                return (
                  <Col md="3" key={pokeplant.id} className="mb-2">
                    <Card style={{ height: "fit-content" }}>
                      <Card.Img
                        variant="top"
                        src={pokeplant.image}
                        style={{ width: "100%" }}
                      />
                      <Card.Body>
                        <Card.Title>{shortenName(pokeplant.name)}</Card.Title>
                        <p>
                          <b>TYPE :</b> {pokeplant.type}
                        </p>
                        <p>
                          <strong> BASE STATS : {pokeplant.base_stats}</strong>
                        </p>
                        <Button
                          variant="danger"
                          onClick={() => deletePokeplant(pokeplant.id)}
                        >
                          Release
                        </Button>
                        &nbsp;
                        <MovesModalButton pokeplant={pokeplant}></MovesModalButton>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            ) : (
              <Col>
                <Card>
                  <Card.Header>
                    <h1 className="text-danger">Your garden is empty</h1>
                  </Card.Header>
                  <Card.Body>
                    <h3 className="text-dark">
                      It's dangerous to walk in the tall grass alone. Please
                      capture a pokeplant!
                    </h3>
                  </Card.Body>
                </Card>
              </Col>
            )}
          </Row>
        </Container>
      )}
    </>
  );
}
