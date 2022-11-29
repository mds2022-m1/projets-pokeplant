import { useEffect, useRef, useState } from "react";
import {
  Card,
  Container,
  FormControl,
  FormLabel,
  NavLink,
} from "react-bootstrap";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, setDoc,getFirestore } from "firebase/firestore";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { db } from "..";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userLoggedIn } from "../features/user-slice";
export function AuthenticateForm() {
  

  const password = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const matchSpan = useRef<HTMLSpanElement>(null);
  const username = useRef<HTMLInputElement>(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const auth = getAuth();
  const signIn = () => {
    if (!email.current?.value) {
      return;
    }
    if (!password.current?.value) {
      return;
    }
    if (!username.current?.value) {
      return;
    }
    createUserWithEmailAndPassword(
      auth,
      email.current?.value,
      password.current?.value
    )
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.uid);
        const docRef = collection(db, "users");
        const userData = {
          username: username.current?.value,
          email: email.current?.value,
        };
        await setDoc(doc(db, "users", user.uid),userData);
        console.log("Document written with ID: ", docRef.id);
      })
  };

  function handlePasswordChange() {
    if (password.current?.value === confirmPassword.current?.value) {
      matchSpan.current?.classList.remove("text-danger");
      matchSpan.current?.classList.add("text-success");
      (matchSpan.current as HTMLSpanElement).innerHTML = "No issue.";
    } else {
      matchSpan.current?.classList.remove("text-success");
      matchSpan.current?.classList.add("text-danger");
      (matchSpan.current as HTMLSpanElement).innerHTML =
        "Passwords do not match!";
    }
  }

  return (
    <>
      <Container className="">
        <Card className="text-center" >
          <Card.Header><h3>Register</h3></Card.Header>
          <Card.Body>
            <div className="mb-3">
              <FormLabel
                htmlFor="exampleFormControlInput1"
                className="form-label"
              >
                Email address
              </FormLabel>
              <FormControl
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Email"
                ref={email}
              />
            </div>

            <div className="mb-3">
              <FormLabel
                htmlFor="exampleFormControlInput1"
                className="form-label"
              >
                Password
              </FormLabel>
              <FormControl
                type="password"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Password"
                ref={password}
                onChange={handlePasswordChange}
              />
            </div>

            <div className="mb-3">
              <FormLabel
                htmlFor="exampleFormControlInput1"
                className="form-label"
              >
                Confirm Password
              </FormLabel>
              <FormControl
                type="password"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Confirm Password"
                ref={confirmPassword}
                onChange={handlePasswordChange}
              />
              <span ref={matchSpan} className="text-danger">
                Password doesn't match!
              </span>
            </div>
            <div className="mb-3">
              <FormLabel
                htmlFor="exampleFormControlInput1"
                className="form-label"
              >
                Username
              </FormLabel>
              <FormControl
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Username"
                ref={username}
              />
            </div>
            <Button variant="primary" onClick={signIn}>
              Creat your account
            </Button>
            <NavLink href="/login">Or login here</NavLink>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

// function AuthenticateMailPassw() {

// const auth = getAuth();
// createUserWithEmailAndPassword(auth, props.email, props.password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });
// }
