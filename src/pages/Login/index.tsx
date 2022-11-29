// Import all the necessary react bootstrap components for login/register page form
import { useState } from "react";
import { FormControl, FormLabel } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LoginForm } from "../../components/LoginForm";

export function Login() {
  // Form for logging in or registering (use react-bootstrap)
  return (
    <>
      <LoginForm></LoginForm>
    </>
  );
}
