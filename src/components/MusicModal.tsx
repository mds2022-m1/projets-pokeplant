import { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
// Import mp3 file
import opening from "../assets/music/opening.mp3";
export function MusicModal() {
  const [show, setShow] = useState(true);
  const [music, setMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClose = () => {
    setShow(false);
    playVideo();
  };
  const handleMusic = () => {
    setMusic(true);
    setShow(false);
    playVideo();
  };

  function playVideo() {
    videoRef.current?.play();
  }

  useEffect(() => {
    if (music) {
      (audioRef.current as HTMLAudioElement).volume = 0.5;
      audioRef.current?.play();
    }
  }, [music]);
  // return a modal with music playing automatically in the background
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Background Music</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to activate music?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleMusic}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <audio ref={audioRef} loop>
        <source src={opening}></source>
      </audio>

      <video muted loop id="videobg" ref={videoRef}>
        <source src="pokemonbg.mp4" type="video/mp4"/>
      </video>
    </>
  );
}
