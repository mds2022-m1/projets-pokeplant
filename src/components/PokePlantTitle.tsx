import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/esm/CardHeader";
import imageCard from "../assets/image/testP.jpg";

export function PokePlantTitle() {
  return (
    <Card style={{ width: "18rem" }}>
      <CardHeader>
        <Card.Img
          variant="top"
          src="https://www.sciencesetavenir.fr/assets/img/2017/03/31/cover-r4x3w1200-6214a248e6018-la-dionee-attrape-mouches-la-plus-spectaculaire-des-tueuses.jpg"
        />
      </CardHeader>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">PokePlant details</Button>
      </Card.Body>
    </Card>
  );
}
