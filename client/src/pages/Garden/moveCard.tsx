import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function MoveCard(props: any) {
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
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Logo_Type_Plante_Pokemon_EB.png/100px-Logo_Type_Plante_Pokemon_EB.png";
    case "fire":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Logo_Type_Feu_Pokemon_EB.png/100px-Logo_Type_Feu_Pokemon_EB.png";
    case "water":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Logo_Type_Eau_Pokemon_EB.png/100px-Logo_Type_Eau_Pokemon_EB.png";
    case "electric":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Logo_Type_%C3%89lectrik_Pokemon_EB.png/100px-Logo_Type_%C3%89lectrik_Pokemon_EB.png";
    case "ice":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Logo_Type_Glace_Pokemon_EB.png/100px-Logo_Type_Glace_Pokemon_EB.png";
    case "poison":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Logo_Type_Poison_Pokemon_EB.png/100px-Logo_Type_Poison_Pokemon_EB.png";
    case "ground":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Logo_Type_Sol_Pokemon_EB.png/100px-Logo_Type_Sol_Pokemon_EB.png";
    case "flying":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Logo_Type_Vol_Pokemon_EB.png/100px-Logo_Type_Vol_Pokemon_EB.png";
    case "psychic":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_Type_Psy_Pokemon_EB.png/100px-Logo_Type_Psy_Pokemon_EB.png";
    case "bug":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Logo_Type_Insecte_Pokemon_EB.png/100px-Logo_Type_Insecte_Pokemon_EB.png";
    case "rock":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Logo_Type_Roche_Pokemon_EB.png/100px-Logo_Type_Roche_Pokemon_EB.png";
    case "ghost":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Logo_Type_Spectre_Pokemon_EB.png/100px-Logo_Type_Spectre_Pokemon_EB.png";
    case "dragon":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Logo_Type_Dragon_Pokemon_EB.png/100px-Logo_Type_Dragon_Pokemon_EB.png";
    case "dark":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Logo_Type_Tenebres_Pokemon_EB.png/100px-Logo_Type_Tenebres_Pokemon_EB.png";
    case "steel":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Logo_Type_Acier_Pokemon_EB.png/100px-Logo_Type_Acier_Pokemon_EB.png";
    case "fairy":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Logo_Type_F%C3%A9e_Pokemon_EB.png/100px-Logo_Type_F%C3%A9e_Pokemon_EB.png";
    case "fighting":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Logo_Type_Combat_Pokemon_EB.png/100px-Logo_Type_Combat_Pokemon_EB.png";
    default:
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Logo_Type_Normal_Pokemon_EB.png/100px-Logo_Type_Normal_Pokemon_EB.png";
  }
}

export default MoveCard;
