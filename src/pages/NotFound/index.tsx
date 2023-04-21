import { useAppSelector } from "../../app/hooks";
import { RouterPath } from "../../app/router-path";

export function NotFound() {
  const session = useAppSelector((state) => state.session.session);
  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center vh-100 vw-100"
        style={{
          background:
            "url('https://mobimg.b-cdn.net/v3/fetch/d0/d007db1abf7c95b623a6dccce07fc758.jpeg')",
          backgroundSize: "cover",
        }}
      >
        <div className="text-center">
          <h1 className="display-1 fw-bold">404</h1>
          <p className="fs-3">
            {" "}
            <span className="text-danger">Opps!</span> Unown Page.
          </p>
          <p className="lead text-light">
            The page you’re looking for doesn’t exist.
          </p>
          {!session ? (
            <p className="lead text-light">Maybe you want to login first?</p>
          ) : null}
          <a href="/" className="btn btn-primary">
            Go Home
          </a>
          {!session ? (
            <a href={RouterPath.login} className="mx-3 btn btn-primary">
              Login
            </a>
          ) : null}
        </div>
      </div>
    </>
  );
}
