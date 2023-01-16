import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
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
import { Provider } from "react-redux";
import { store } from "./app/store";
import Account from "./pages/Account";
import { MagicInitializingComponent } from "./components/DispatchComponent";
import { RouterPath } from "./app/router-path";
import { PasswordRecoveryPage } from "./pages/PasswordRecovery";

function App() {
  return (
    <>
      <Provider store={store}>
        <div
          className="App d-flex align-items-center"
          style={{
            background:
              "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cad4b52e-f6b1-432f-9035-a5f4853bcf15/d84o6a9-28125268-b60b-4752-a665-acf6b32fbe37.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NhZDRiNTJlLWY2YjEtNDMyZi05MDM1LWE1ZjQ4NTNiY2YxNVwvZDg0bzZhOS0yODEyNTI2OC1iNjBiLTQ3NTItYTY2NS1hY2Y2YjMyZmJlMzcuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.E8Cz0zggZe_qb5KHtrjPAJJTDCl3YQ7K7GUvLtOBrbg')",
            backgroundSize: "cover",
          }}
        >
          <MagicInitializingComponent></MagicInitializingComponent>
          <NavBar></NavBar>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path={RouterPath.home} element={<Home />} />
              <Route path={RouterPath.map} element={<Map />} />
              <Route path={RouterPath.pokedex} element={<NotFound />} />
              <Route path={RouterPath.login} element={<Login />} />
              <Route path={RouterPath.capture} element={<Capture />} />
              <Route path={RouterPath.account} element={<Account />} />
              <Route path={RouterPath.profile} element={<Account/>} />
              <Route path={RouterPath.passwordRecovery} element={<PasswordRecoveryPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </Provider>
    </>
  );
}

export default App;
