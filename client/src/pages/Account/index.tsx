import { useState } from "react";
import { supabase } from "../../app/supabaseClient";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { userCreated } from "../../features/user-slice";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";
import { updateProfileInformation } from "../../actions/user-api";
import { useForm } from "react-hook-form";
import { NotFound } from "../../pages/NotFound/index";

const Account = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();
  const session = useAppSelector((state) => state.session.session);

  const [website] = useState("");
  const [avatar_url] = useState("");

  const name = useAppSelector((state) => state.user.name);
  const gender = useAppSelector((state) => state.user.gender);

  const updateProfile = async (formData: any) => {
    if (session) {
      const { user } = session;

      const updates = {
        id: user.id,
        username: formData.username,
        website,
        avatar_url,
        updated_at: new Date(),
        user_kind: formData.user_kind,
      };

      const { error } = await supabase.auth.updateUser({
        email: formData.email,
      });

      if (error) {
        alert(error.message);
      }
      dispatch(updateProfileInformation(session, updates));
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 vw-100">
      {session !== null ? (
        <Card>
          <Card.Header>
            {" "}
            <h4>Trainer Card</h4>{" "}
          </Card.Header>
          <Card.Body>
            <Container>
              <Row>
                <Col>
                  <img
                    src={
                      gender === "Female"
                        ? "https://gamepress.gg/pokemonmasters/sites/pokemonmasters/files/2020-11/ch0116_00_hikari_expose_256.ktx_.png"
                        : "https://gamepress.gg/pokemonmasters/sites/pokemonmasters/files/2021-12/ch0162_00_koki_expose_256.ktx_.png"
                    }
                    alt="pfp"
                  ></img>
                </Col>
                <Col>
                  <Form
                    onSubmit={handleSubmit((data) => {
                      updateProfile(data);
                    })}
                    className="form-widget"
                  >
                    <div className="mb-3">User ID : {session.user.id} </div>

                    <FloatingLabel
                      label="Email"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <FormControl
                        id="email"
                        type="email"
                        defaultValue={session.user.email}
                        {...register("email", { required: true })}
                      />
                    </FloatingLabel>

                    <FloatingLabel
                      label="Name"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <FormControl
                        id="username"
                        type="text"
                        defaultValue={name}
                        {...register("username", { required: true })}
                      />
                    </FloatingLabel>

                    <div>
                      <Container>
                        <Row>
                          <Col>
                            <Button
                              variant="primary"
                              type="submit"
                            >
                              Update
                            </Button>
                          </Col>
                          <Col>
                            <Button
                              variant="danger"
                              onClick={() => {
                                supabase.auth.signOut();
                                dispatch(userCreated({ name: "", id: "" }));
                              }}
                            >
                              Sign Out
                            </Button>
                          </Col>
                        </Row>
                      </Container>
                    </div>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      ) : (
        <NotFound></NotFound>
      )}
    </div>
  );
};

export default Account;
