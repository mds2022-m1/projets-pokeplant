import {
  Button,
  Card,
  Container,
  Form,
  FormControl,
  FormLabel,
} from "react-bootstrap";
import { MusicModal } from "../../components/MusicModal";
import { useAppSelector } from "../../app/hooks";
import { NotFound } from "../NotFound";
import { AddPokePlant } from "../../components/AddPokePlant";

export function Capture() {
  const userId = useAppSelector((state) => state.user.id);
  const session = useAppSelector((state) => state.session.session);
  
  return (
    <>
      {session !== null ? (<AddPokePlant></AddPokePlant>) : (<NotFound></NotFound>)}
    </>
  );
}
