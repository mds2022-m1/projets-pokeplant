import { useEffect, useState } from "react";
import { supabase } from "../../app/supabaseClient";
import { Card, Col, Container, Row } from "react-bootstrap";
import "./style.css";

export default function Pokedex() {
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
      const { data, error } = await supabase.rpc("get_pokeplants");
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
        <Container className="text-center" id="pokedex_container">
          <Row className="text-center">
            {pokeplants.length !== 0 ? (
              pokeplants.map((pokeplant) => {
                return (
                  <Col md="3" key={pokeplant.name} className="mb-2">
                    <Card style={{ height: "fit-content" }}>
                      <Card.Img
                        variant="top"
                        src={pokeplant.image}
                        style={{ width: "100%" }}
                      />
                      <Card.Body>
                        <Card.Title>{shortenName(pokeplant.name)}</Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            ) : (
              <Col>
                <Card>
                  <Card.Header>
                    <h1 className="text-danger">The pokedex is empty!</h1>
                  </Card.Header>
                  <Card.Body>
                    <img
                      src="https://archives.bulbagarden.net/media/upload/thumb/8/8b/Red_Green_Prof_Oak.png/150px-Red_Green_Prof_Oak.png"
                      alt="oak"
                    ></img>
                    <h3 className="text-dark">
                      Please help Professor Oak by catching some pokeplants!
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
