/* eslint-disable jsx-a11y/anchor-is-valid */
import { supabase } from "../app/supabaseClient";
import { useEffect, useState } from "react";
import {
  Card,
  Button,
  Spinner,
  Form,
  FloatingLabel,
  FormControl,
  Alert,
  FormSelect,
} from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { useForm, FieldValues } from "react-hook-form";
import { RouterPath } from "../app/router-path";

export function LoginRegister() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const [registerConfirm, setRegisterConfirm] = useState(false);
  const [forgotPasswordConfirm, setForgotPasswordConfirm] = useState(false);
  const baseUrl = window.location.origin;

  const [mode, setMode] = useState<"login" | "register" | "forgotPassword">(
    "login"
  );

  const Register = async (userData: FieldValues) => {
    try {
      setLoading(true);
      if (userData.password !== userData.confirmPassword) {
        alert("Password does not match");
        return;
      }
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            user_name: userData.userName,
            gender: userData.gender,
          },
        },
      });
      if (error) {
        alert(error);
        return;
      }
      if (data) setRegisterConfirm(true);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const Login = async (userData: FieldValues) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password,
      });
      if (error) {
        alert(error);
        return;
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const ForgotPassword = async (userData: FieldValues) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.resetPasswordForEmail(
        userData.email,
        {
          redirectTo:
            baseUrl + RouterPath.passwordRecovery,
        }
      );
      if (error) {
        alert(error);
        return;
      }
      if (data) setForgotPasswordConfirm(true);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Card.Header>
        <h3>
          <strong>
            {mode === "register"
              ? "Register"
              : mode === "login"
              ? "Login"
              : mode === "forgotPassword"
              ? "Reset Password"
              : null}
          </strong>
        </h3>
      </Card.Header>
      <Card.Body>
        {loading ? (
          <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading, please wait...
          </Button>
        ) : (
          <Form
            onSubmit={handleSubmit((data) => {
              switch (mode) {
                case "register":
                  Register(data);
                  break;
                case "login":
                  Login(data);
                  break;
                case "forgotPassword":
                  ForgotPassword(data);
                  break;
                default:
                  break;
              }
            })}
          >
            <FloatingLabel label="Email" className="mb-3">
              <FormControl
                id="email"
                className="inputField"
                type="email"
                placeholder="Your email"
                {...register("email", { required: true })}
              />
            </FloatingLabel>

            {mode === "register" ? (
              <>
                <FloatingLabel label="Name" className="mb-3">
                  <FormControl
                    id="userName"
                    className="inputField"
                    placeholder="Your name"
                    {...register("userName", { required: true })}
                  />
                </FloatingLabel>

                <FloatingLabel label="Gender" className="mb-3">
                  <FormSelect
                    id="Gender"
                    className="inputField"
                    {...register("gender", { required: true })}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </FormSelect>
                </FloatingLabel>
              </>
            ) : null}

            {mode === "login" || mode === "register" ? (
              <FloatingLabel label="Password" className="mb-3">
                <FormControl
                  id="password"
                  className="inputField"
                  type="password"
                  placeholder="Your password"
                  {...register("password", { required: true })}
                />
              </FloatingLabel>
            ) : null}

            {mode === "register" ? (
              <FloatingLabel label="Confirm Password" className="mb-3">
                <FormControl
                  id="confirmPassword"
                  className="inputField"
                  type="password"
                  placeholder="Confirm your password"
                  {...register("confirmPassword", { required: true })}
                />
              </FloatingLabel>
            ) : null}
            {registerConfirm ? (
              <Alert variant="success">
                <strong>Success!</strong> Please check your email to confirm
                your account.
              </Alert>
            ) : null}
            {forgotPasswordConfirm ? (
              <Alert variant="success">
                <strong>Success!</strong> Please check your email to reset your
                password. <br /> If you don't see the email, please check your
                spam folder.
              </Alert>
            ) : null}
            <Button type="submit" className="primary" aria-live="polite">
              {mode === "register"
                ? "Register"
                : mode === "login"
                ? "Login"
                : mode === "forgotPassword"
                ? "Reset Password"
                : null}
            </Button>
            <hr></hr>
            <h5>Or connect using : </h5>
            <Button
              variant="outline-primary"
              className="mx-2"
              onClick={() => {
                supabase.auth.signInWithOAuth({ provider: "google" });
              }}
            >
              <FcGoogle />
            </Button>
            <hr></hr>
            {mode === "register" ? (
              <>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                  className="text-muted"
                  onClick={() => {
                    setMode("login");
                  }}
                >
                  Already have an account?
                </a>
              </>
            ) : mode === "login" ? (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <>
                <a
                  className="text-muted"
                  onClick={() => {
                    setMode("register");
                  }}
                >
                  No account?
                </a>
                {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
                <a
                  className="text-muted mx-3"
                  onClick={() => {
                    setMode("forgotPassword");
                  }}
                >
                  Forgot password?
                </a>
              </>
            ) : mode === "forgotPassword" ? (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a
                className="text-muted"
                onClick={() => {
                  setMode("login");
                }}
              >
                Back
              </a>
            ) : null}
            {/* {mode === "register" || mode === "login" ? (
              <>
                <hr></hr>
                <a>Or connect using those :</a>
                <div className="d-flex justify-content-center">
                  <Button
                    variant="outline-primary"
                    className="mx-2"
                    onClick={() => {
                      supabase.auth.signIn({ provider: "google" });
                    }}
                  >
                    Google
                  </Button>
                </div>
              </>
            ) : null} */}
          </Form>
        )}
      </Card.Body>
    </Card>
  );
}
