import React, { useState } from "react";
import "../Register/Register.css";
import db from "../firestore";

export function Register() {
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [dataUser, setDataUser] = useState({
    name: "",
    username: "",
    role: "",
    keyword: "",
    status:"",
  });

  const handleChange = (e) => {
    setDataUser({ ...dataUser, [e.target.name]: e.target.value });
  };

  const onSave = (e) => {
    e.preventDefault();

    // Validar campos
    if (
      dataUser.name === "" ||
      dataUser.username === "" ||
      dataUser.role === "" ||
      dataUser.keyword === ""
    ) {
      setIsError(true);
      setMessage("All fields are mandatory");
      return;
    }

    // Buscar el username
    db.collection("users")
      .where("username", "==", dataUser.username)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          // No se encuentra el username
          db.collection("users")
            .add({
              name: dataUser.name,
              username: dataUser.username,
              role: dataUser.role,
              keyword: dataUser.keyword,
              status: "No",
            })
            .then(() => {
              setMessage("User registered successfully");
              setTimeout(() => {
                setMessage("");
              }, 2000);
              setDataUser({
                name: "",
                username: "",
                role: "",
                keyword: "",
              });
            })
            .catch((error) => {
              setIsError(true);
              setMessage("An error has occurred: " + error.message);
            });
        } else {
          setIsError(true);
          setMessage("User already exists");
        }
      });
  };

  return (
    <div className="container">
      <h3 className="renting-title">Register on Renting intl</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            User:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            placeholder="User"
            required
            value={dataUser.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Name"
            required
            value={dataUser.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role:
          </label>
          <input
            type="text"
            className="form-control"
            id="role"
            name="role"
            placeholder="Role"
            required
            value={dataUser.role}
            onChange={handleChange}
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
            name="keyword"
            placeholder="Keyword"
            required
            value={dataUser.keyword}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={onSave}>
          Register
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
