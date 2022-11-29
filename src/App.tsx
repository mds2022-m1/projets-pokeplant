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
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { Capture } from "./pages/Capture";
import { Provider } from "react-redux";
import { store } from "./app/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <div className="App d-flex align-items-center" style={{background: "url('bg.jpg')", backgroundSize: "cover"}}>
          <NavBar></NavBar>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Home />} />
              <Route path="/map" element={<Map />} />
              <Route path="/pokedex" />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="capture" element={<Capture />} />
            </Routes>
          </BrowserRouter>
        </div>
      </Provider>
    </>
  );
}

export default App;
