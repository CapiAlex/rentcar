import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Menu } from "../Menu/Menu";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import { Forgotpassword } from "../Forgotpassword/Forgotpassword";
import { ReturnCar } from "../Return/Return";
import { Rent } from "../Rent/Rent";
import { Addcar } from "../Addcar/Addcar";
import { Home } from "../Home/Home";

export function Rutas() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de inicio de sesión

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />{" "}
        {/* Pasar la función para actualizar el estado de inicio de sesión */}
        <Route path="/Register" element={<Register />} />
        <Route path="/Forgot" element={<Forgotpassword />} />
        <Route path="/Return" element={<ReturnCar />} />
        <Route path="/Rent" element={<Rent />} />
        <Route path="/Addcar" element={<Addcar />} />
        <Route path="/Home" element={<Home isLoggedIn={isLoggedIn} />} />{" "}
        {/* Pasar el estado de inicio de sesión */}
      </Routes>
      <Menu isLoggedIn={isLoggedIn} /> {/* Pasar el estado de inicio de sesión */}
    </>
  );
}
