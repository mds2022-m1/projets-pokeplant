import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { supabase } from "../app/supabaseClient";
import MoveCard from "../pages/Garden/moveCard";
import { getPokeplantMoves } from "../pages/Garden/modalMoves";

export function BattleTerrain() {
  const [myPokeplants, setMyPokeplants] = useState<any[]>([]);
  const [selectedPokeplant, setSelectedPokeplant] = useState<any>(null);
  const [moves, setMoves] = useState<any[]>([]);
  const [show, setShow] = useState(false);

  async function getPokeplants() {
    try {
      const { data, error } = await supabase.rpc("get_user_pokeplants");
      if (error) {
        console.log(error);
      } else {
        setMyPokeplants(data);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  async function getMoves(id: number) {
    const data = await getPokeplantMoves(id);
    if (data) {
      setMoves(data);
      setShow(true);
    }
    
  }



  useEffect(() => {
    getPokeplants();
  }, []);

  useEffect(() => {
    console.log(selectedPokeplant);
    if (selectedPokeplant) {
      getMoves(selectedPokeplant.id);
    }
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
                  <>
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
                  </>
                );
              })
            ) : show ? (
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
                  <MoveCard
                    moveSet={moves}
                  ></MoveCard>
                </Col>
              </>
            ) : null}
            {myPokeplants.length === 0 ? (
              <Col md={12}>
                <Card>
                  <Card.Body className="text-center">
                    <Card.Title>
                      Hey! You can't battle without Pokeplants.
                    </Card.Title>
                    <img
                      src="https://www.pokepedia.fr/images/f/f6/Goyah-NB.png"
                      alt="goyah"
                      width={180}
                      height={300}
                    ></img>
                    <p>
                      <b>Go to the garden to catch some pokeplants!</b>
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ) : null}
          </Row>
        </Container>
      </Container>
    </>
  );
}
