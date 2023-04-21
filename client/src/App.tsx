import "./App.css";
// Import the FirebaseUI authentication UI library.
import "firebaseui/dist/firebaseui.css";
// import bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
// Import leaflet css
import "leaflet/dist/leaflet.css";
import { Home } from "./pages/Home";
import { Map } from "./pages/Map";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { Capture } from "./pages/Capture";
import Account from "./pages/Account";
import { RouterPath } from "./app/router-path";
import { PasswordRecoveryPage } from "./pages/PasswordRecovery";
import Garden from "./pages/Garden";
import Battle from "./pages/Battle";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useEffect } from "react";
import {
  getSession,
  setSession,
  getResetPasswordStatus,
} from "./actions/session";
import { getProfileInformation } from "./actions/user-api";
import { supabase } from "./app/supabaseClient";
import { passwordRecoveryUpdated } from "./features/session-slice";
import Pokedex from "./pages/Pokedex";

function App() {
  const dispatch = useAppDispatch();
  const session = useAppSelector((state) => state.session.session);

  // Get session on component mount
  useEffect(() => {
    dispatch(getSession());
    supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setSession(session));
      if (_event === "PASSWORD_RECOVERY") {
        dispatch(passwordRecoveryUpdated(true));
        localStorage.setItem("passwordRecovery", "true");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If Session changes, fetch user information
  useEffect(() => {
    if (session) {
      dispatch(getProfileInformation(session));
      dispatch(getResetPasswordStatus());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, dispatch]);
  return (
    <>
      <NavBar></NavBar>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path={RouterPath.home} element={<Home />} />
          <Route path={RouterPath.map} element={<Map />} />
          <Route path={RouterPath.pokedex} element={<Pokedex/>} />
          <Route path={RouterPath.login} element={<Login />} />
          <Route
            path={RouterPath.passwordRecovery}
            element={<PasswordRecoveryPage />}
          />
          {session ? (
            <>
              <Route path={RouterPath.pokedex} element={<NotFound />} />

              <Route path={RouterPath.capture} element={<Capture />} />
              <Route path={RouterPath.account} element={<Account />} />
              <Route path={RouterPath.profile} element={<Account />} />

              <Route path={RouterPath.garden} element={<Garden />} />
              <Route path={RouterPath.battle} element={<Battle />} />
            </>
          ) : (
            <></>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
