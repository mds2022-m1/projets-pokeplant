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
                      src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b41ebc74-a9a7-41c3-98c6-4e68c588fca9/ddmvjr1-1b0c02b9-57ff-4481-a644-cd2bad2f2e41.png/v1/fill/w_1280,h_1318/professor_oak_by_captainedwardteague_ddmvjr1-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTMxOCIsInBhdGgiOiJcL2ZcL2I0MWViYzc0LWE5YTctNDFjMy05OGM2LTRlNjhjNTg4ZmNhOVwvZGRtdmpyMS0xYjBjMDJiOS01N2ZmLTQ0ODEtYTY0NC1jZDJiYWQyZjJlNDEucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.5g2vXX_euQjx3m29NKx7RJd-dxvIbwpcDhviOkZNv-A"
                      alt="oak"
                      width={300}
                      height={300}
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
