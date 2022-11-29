import { Container } from "react-bootstrap";
import { MusicModal } from "../../components/MusicModal";

export function Home() {
  // return a page with music playing automatically in the background
  return (
    <>
      <Container>
        <MusicModal></MusicModal>
      </Container>
    </>
  );
}
