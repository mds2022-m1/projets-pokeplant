import { useEffect, useRef, useState } from "react";
import {
  Card,
  Container,
  FormControl,
  FormLabel,
  NavLink,
} from "react-bootstrap";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Button from "react-bootstrap/Button";
import { auth, db } from "..";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useAppDispatch } from "../app/hooks";
import { userLoggedIn } from "../features/user-slice";
import { userLogIn } from "../features/usercredential-slice";

export function LoginForm() {
  const dispatch = useAppDispatch();
  const password = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  
  const signIn = () => {
    if (!email.current?.value) {
      return;
    }
    if (!password.current?.value) {
      return;
    }

    signInWithEmailAndPassword(
      auth,
      email.current?.value,
      password.current?.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch( 
          userLoggedIn({ id: user.uid, name: user.displayName as string, email: user.email as string })
        );
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const signInGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        const userData = {
          username: user.displayName,
          email: user.email,
        };
        console.log(credential);
        await setDoc(doc(db, "users", user.uid), userData);
        dispatch(
          userLoggedIn({ id: user.uid, name: user.displayName as string, email: user.email as string })
        );
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <>
      <Container className="w-100">
        <Card className="text-center">
          <Card.Header>
            <h3>Login</h3>
          </Card.Header>
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
              />
            </div>

            <Button variant="primary" onClick={signIn}>
              Login
            </Button>
            <NavLink href="/register" className="text-primary mt-3">
              Forgot password? Click Here!
            </NavLink>
            <hr></hr>
            <p>Or Log In using</p>
            <Button variant="outline-secondary" onClick={signInGoogle}>
              <FaGoogle />
            </Button>
            <hr></hr>
            <NavLink href="/register" className="text-primary">
              No Account? Create one here!
            </NavLink>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
