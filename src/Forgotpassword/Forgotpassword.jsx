import React, { useState } from "react";
import "../Forgotpassword/Forgotpassword.css";
import db from "../firestore";

export function Forgotpassword() {
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const keyword = e.target.keyword.value;
    const newPassword = e.target.newPassword.value;

    try {
      // Validar campos
      if (username === "" || keyword === "" || newPassword === "") {
        setIsError(true);
        setMessage("All fields are mandatory");
        return;
      }

      // Buscar el usuario por nombre de usuario y palabra clave
      const userSnapshot = await db
        .collection("users")
        .where("username", "==", username)
        .where("keyword", "==", keyword)
        .get();

      if (userSnapshot.empty) {
        setIsError(true);
        setMessage("Invalid username or keyword");
        return;
      }

      // Obtener el ID del usuario encontrado
      const userId = userSnapshot.docs[0].id;

      // Actualizar la contraseña del usuario
      await db.collection("users").doc(userId).update({ password: newPassword });

      setMessage("Password updated successfully");
      setTimeout(() => {
        setMessage("");
        e.target.reset(); // Vaciar los campos del formulario
      }, 2000);
    } catch (error) {
      setIsError(true);
      setMessage("An error has occurred: " + error.message);
    }
  };

  return (
    <div className="container">
      <h2>Recover your account</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            User:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="User"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="keyword" className="form-label">
            Keyword:
          </label>
          <input
            type="password"
            className="form-control"
            id="keyword"
            placeholder="Keyword"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">
            New password:
          </label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            placeholder="New password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Recover password
        </button>
      </form>
      <div style={{ color: isError ? "red" : "green" }}>{message}</div>
      <div className="mt-3">
        <span className="mx-2">
          Already have an account? <a href="/">Login</a>
        </span>
      </div>
    </div>
  );
}
