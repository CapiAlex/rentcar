import React from "react";
import { Link } from "react-router-dom";
import "../Home/Home.css";

export function Home() {
  const userRole = localStorage.getItem("role");

  return (
    <div className="container">
      <h3>Welcome to Renting Intl</h3>
      <div className="button-container">
        <Link to="/Rent" className="btn btn-primary btn-large">
          Go to Renting
        </Link>
        <Link to="/Return" className="btn btn-primary btn-large">
          Go to Return
        </Link>
        {userRole === "Admin" && (
          <Link to="/Addcar" className="btn btn-primary btn-large">
            Go to Add a car
          </Link>
        )}
      </div>
    </div>
  );
}
