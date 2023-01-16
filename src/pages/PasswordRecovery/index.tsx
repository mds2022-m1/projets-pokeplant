import { useAppSelector } from "../../app/hooks";
import { PasswordRecovery } from "../../components/PasswordRecovery";
import { NotFound } from "../NotFound/index";
// import { PageNotFound } from "pages/NotFound/PageNotFound";

export function PasswordRecoveryPage() {
  const passwordRecovery = useAppSelector(
    (state) => state.session.passwordRecovery
  );
  return (
    <>
      {passwordRecovery ? (
        <div style={{ padding: "200px" }}>
          <PasswordRecovery></PasswordRecovery>
        </div>
      ) : <NotFound></NotFound>}
    </>
  );
}
