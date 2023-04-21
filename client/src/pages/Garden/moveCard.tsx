import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useEffect } from "react";

function MoveCard(props: any) {
  useEffect(() => {
    console.log(props.moveSet);
  }, [props.moveSet]);
  return (
    <>
      <Container>
        <Row>
          {props.moveSet.map((variant: any, index: number) => (
            <Col md={6} key={`move-${index}`}>
              <Card
                bg={getColorByType(variant.type).toLowerCase()}
                key={variant.name}
                text={
                  getColorByType(variant.type).toLowerCase() === "light"
                    ? "dark"
                    : "white"
                }
                style={{ margin: "2%" }}
              >
                <Card.Body>
                  <Card.Title>
                    {variant.name}{" "}
                    <img
                      style={{ width: "100px" }}
                      src={getImageByType(variant.type)}
                      alt="Logo"
                    />{" "}
                  </Card.Title>

                  <div>
                    <p><b>PP :</b> {variant.power_point}</p>
                    <p><b>Power :</b> {variant.power}</p>
                    <p><b>Accuracy :</b> {variant.accuracy}%</p>
                    <p><b>Nature :</b> {variant.nature ? "Physical" : "Special"}</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export function getColorByType(type: string) {
  //simple switch statement to return the color of the type
  switch (type.toLowerCase()) {
    case "grass":
      return "Success";
    case "fire":
      return "Danger";
    case "water":
      return "Primary";
    case "electric":
      return "Warning";
    case "ice":
      return "Info";
    case "poison":
      return "Danger";
    case "ground":
      return "Dark";
    case "flying":
      return "Info";
    case "psychic":
      return "Danger";
    case "bug":
      return "Success";
    case "rock":
      return "Dark";
    case "ghost":
      return "Secondary";
    case "dragon":
      return "Secondary";
    case "dark":
      return "Dark";
    case "steel":
      return "Secondary";
    case "fairy":
      return "Danger";
    case "fighting":
      return "Danger";
    default:
      return "Light";
  }
}

export function getImageByType(type: string) {
  //simple switch statement to return the color of the type
  switch (type.toLowerCase()) {
    case "grass":
      return "https://archives.bulbagarden.net/media/upload/thumb/4/48/GrassIC_Tera.png/70px-GrassIC_Tera.png";
    case "fire":
      return "https://archives.bulbagarden.net/media/upload/thumb/e/eb/FireIC_Tera.png/70px-FireIC_Tera.png";
    case "water":
      return "https://archives.bulbagarden.net/media/upload/thumb/c/c0/WaterIC_Tera.png/70px-WaterIC_Tera.png";
    case "electric":
      return "https://archives.bulbagarden.net/media/upload/thumb/7/7b/ElectricIC_Tera.png/70px-ElectricIC_Tera.png";
    case "ice":
      return "https://archives.bulbagarden.net/media/upload/thumb/5/5f/IceIC_Tera.png/70px-IceIC_Tera.png";
    case "poison":
      return "https://archives.bulbagarden.net/media/upload/thumb/d/db/PoisonIC_Tera.png/70px-PoisonIC_Tera.png";
    case "ground":
      return "https://archives.bulbagarden.net/media/upload/thumb/2/22/GroundIC_Tera.png/70px-GroundIC_Tera.png";
    case "flying":
      return "https://archives.bulbagarden.net/media/upload/thumb/4/44/FlyingIC_Tera.png/70px-FlyingIC_Tera.png";
    case "psychic":
      return "https://archives.bulbagarden.net/media/upload/thumb/f/fd/PsychicIC_Tera.png/70px-PsychicIC_Tera.png";
    case "bug":
      return "https://archives.bulbagarden.net/media/upload/thumb/2/2e/BugIC_Tera.png/70px-BugIC_Tera.png";
    case "rock":
      return "https://archives.bulbagarden.net/media/upload/thumb/5/5f/RockIC_Tera.png/70px-RockIC_Tera.png";
    case "ghost":
      return "https://archives.bulbagarden.net/media/upload/thumb/0/04/GhostIC_Tera.png/70px-GhostIC_Tera.png";
    case "dragon":
      return "https://archives.bulbagarden.net/media/upload/thumb/6/65/DragonIC_Tera.png/70px-DragonIC_Tera.png";
    case "dark":
      return "https://archives.bulbagarden.net/media/upload/thumb/f/f2/DarkIC_Tera.png/70px-DarkIC_Tera.png";
    case "steel":
      return "https://archives.bulbagarden.net/media/upload/thumb/2/26/SteelIC_Tera.png/70px-SteelIC_Tera.png";
    case "fairy":
      return "https://archives.bulbagarden.net/media/upload/thumb/5/5d/FairyIC_Tera.png/70px-FairyIC_Tera.png";
    case "fighting":
      return "https://archives.bulbagarden.net/media/upload/thumb/e/ea/FightingIC_Tera.png/70px-FightingIC_Tera.png";
    default:
      return "https://archives.bulbagarden.net/media/upload/thumb/9/9a/NormalIC_Tera.png/70px-NormalIC_Tera.png";
  }
}

export default MoveCard;
