import React, { useState } from "react";
import "../Login/Login.css";
import db from "../firestore";

export function Login() {
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      // Validar campos
      if (username === "" || password === "") {
        setIsError(true);
        setMessage("All fields are mandatory");
        return;
      }

      // Buscar el usuario por nombre de usuario
      const userSnapshot = await db
        .collection("users")
        .where("username", "==", username)
        .get();

      if (userSnapshot.empty) {
        setIsError(true);
        setMessage("Invalid username or password");
        return;
      }

      const userDoc = userSnapshot.docs[0];
      const userData = userDoc.data();

      // Verificar la contraseña
      if (userData.password === password) {
        // Contraseña válida, guardar el rol del usuario en el estado
        localStorage.setItem("role", userData.role);

        // Redirigir al usuario a la siguiente página
        window.location.href = "/Home";
      } else {
        setIsError(true);
        setMessage("Invalid username or password");
      }
    } catch (error) {
      setIsError(true);
      setMessage("An error has occurred: " + error.message);
    }
  };

  return (
    <div className="container">
      <h3 className="renting-title">Renting intl</h3>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            User:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            required
            placeholder="user"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
            placeholder="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <div className="mt-3">
        <a href="/Forgot">Forgot your password?</a>
        <span className="mx-2">
          Don't you have an account? <a href="/Register">Register</a>
        </span>
      </div>
      <div style={{ color: isError ? "red" : "green" }}>{message}</div>
    </div>
  );
}
