import { useEffect, useRef, useState } from "react";
import {
  Card,
  Container,
  FormControl,
  FormLabel,
  NavLink,
} from "react-bootstrap";
import { collection, doc, setDoc } from "firebase/firestore";
import Button from "react-bootstrap/Button";
import { auth, db } from "..";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { userLoggedIn } from "../features/user-slice";

export function RegisterForm() {
  const dispatch = useAppDispatch();

  const password = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const matchSpan = useRef<HTMLSpanElement>(null);
  const username = useRef<HTMLInputElement>(null);

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
    ).then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      const userData = {
        username: username.current?.value,
        email: email.current?.value,
      };
      await setDoc(doc(db, "users", user.uid), userData);
      dispatch(
        userLoggedIn({ id: user.uid, name: user.displayName as string, email: user.email as string })
      );
    });
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

  useEffect(() => {
    handlePasswordChange();
  }, []);

  return (
    <>
      <Container className="">
        <Card className="text-center">
          <Card.Header>
            <h3>Register</h3>
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
            <Button variant="primary" onClick={signIn}>
              Create your account
            </Button>
            <hr></hr>
            <p>Or Register using</p>
            <Button variant="outline-secondary" onClick={signInGoogle}>
              <FaGoogle />
            </Button>
            <hr></hr>
            <NavLink href="/login" className="text-primary">
              Already have an account? Log in here!
            </NavLink>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
