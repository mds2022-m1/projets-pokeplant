import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { supabase } from "../app/supabaseClient";
import { getColorByType, getImageByType } from "../pages/Garden/moveCard";

export function BattleTerrain() {
  const [myPokeplants, setMyPokeplants] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPokeplant, setSelectedPokeplant] = useState<any>(null);
  const [moves, setMoves] = useState<any[]>([]);

  async function getPokeplants() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.rpc("get_user_pokeplants");
      if (error) {
        console.log(error);
      } else {
        setMyPokeplants(data);
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getPokeplants();
  }, []);

  useEffect(() => {
    console.log(selectedPokeplant);
  }, [selectedPokeplant]);

  return (
    <>
      <Container
        style={{
          backgroundImage: "url('https://wallpapercave.com/wp/wp2878389.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div style={{ width: "100%", height: "100%" }}>
          <img
            src="https://wallpapercave.com/wp/wp2878389.jpg"
            alt="battle-terrain"
            width={"100%"}
            height={"100%"}
            style={{ opacity: "0" }}
          ></img>
        </div>
        <Container style={{ maxWidth: "100%", overflow: "auto" }}>
          <Row>
            {!selectedPokeplant ? (
              myPokeplants.map((pokeplant) => {
                return (
                  <Col md={3} key={pokeplant.id}>
                    <Card>
                      <Card.Img variant="top" src={pokeplant.image} />
                      <Card.Body className="text-center">
                        <Card.Title>{pokeplant.name}</Card.Title>
                        <p>
                          <b>Type : </b> {pokeplant.type}
                        </p>
                        <Button
                          variant="success"
                          onClick={() => setSelectedPokeplant(pokeplant)}
                        >
                          Select
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            ) : (
              <>
                <Col md={3}>
                  <Card>
                    <Card.Img variant="top" src={selectedPokeplant.image} />
                    <Card.Body className="text-center">
                      <Card.Title>{selectedPokeplant.name}</Card.Title>
                      <p>
                        <b>Type : </b> {selectedPokeplant.type}
                      </p>
                      <Button
                        variant="danger"
                        onClick={() => setSelectedPokeplant(null)}
                      >
                        Unselect
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={9}>
                  <Card>
                    <Row>
                      
                    </Row>
                  </Card>
                </Col>
              </>
            )}
          </Row>
        </Container>
      </Container>
    </>
  );
}
