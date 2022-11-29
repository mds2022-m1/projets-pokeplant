import { useRef, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";


export function AddPokePlant() {
    const file = useRef<HTMLInputElement>(null);

    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
    const [isSelected, setIsSelected] = useState(false)

	const changeHandler = (event: any) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

	const handleSubmission = () => {
        if (!file.current?.value) {
            return;
          }
		const formData = new FormData();

		formData.append('File', file.current?.value);

		fetch(
			'https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5',
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};
    const AddPlant = () => {
        console.log(file.current?.value);
      };  

  return (
    <>
      <Container className="">
          <Card className="text-center">
            <Card.Header>
              <h3>Add a PokePlant</h3>
            </Card.Header>
            <Card.Body>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Default file input example</Form.Label>
                    <Form.Control ref={file} type="file" />
                </Form.Group>
                <hr></hr>
                <Button variant="primary" onClick={handleSubmission}>
                    Valid
                </Button>
            </Card.Body>
          </Card>
      </Container>
    </>
  );
}
