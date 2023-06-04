import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Menu/Menu.css";

export function Menu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userRole = localStorage.getItem("role");

  const handleLogout = () => {
    // Realiza la lógica para cerrar sesión, como eliminar los datos del usuario del local storage
    window.location.href = "/";
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (userRole !== null) {
      setIsLoggedIn(true);
    }
  }, [userRole]);

  return (
    <div className="Menu">
      <nav className="navbar navbar-expand-lg bg-secondary navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Renting intl
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {!isLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Login
                  </Link>
                </li>
              )}
              {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Home">
                      Home
                    </Link>
                  </li>
                  {userRole === "Admin" && (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link" to="/Addcar">
                          Add a car
                        </Link>
                      </li>
                    </>
                  )}
                                        <li className="nav-item">
                        <Link className="nav-link" to="/Rent">
                          Rent a car
                        </Link>
                      </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Return">
                      Return a car
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-link nav-link"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
