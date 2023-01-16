// Import all the necessary react bootstrap components for login/register page form
import { LoginRegister } from "../../components/LoginRegister";
import { useAppSelector } from "../../app/hooks";
import { RouterPath } from "../../app/router-path";
import { Navigate } from "react-router-dom";

export function Login() {
  const session = useAppSelector((state) => state.session.session);
  // Form for logging in or registering (use react-bootstrap)
  return (
    <>
      {session !== null ? <Navigate to={RouterPath.home} /> : null}
      <div className="d-flex align-items-center justify-content-center h-100 w-100">
        <LoginRegister></LoginRegister>
      </div>
    </>
  );
}
