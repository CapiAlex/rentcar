
import "../Login/Login.css";
import { Link } from "react-router-dom";

export function Login(){ 
  return (
    <div className="container">
      <h3 className="renting-title">Renting intl</h3>
      <form>
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
        <Link to="/Home" className="btn btn-primary">
        Login
      </Link>
      </form>
      <div className="mt-3">
        <a href="/Forgot">Forgot your password?</a>
        <span className="mx-2">
          Don't you have an account? <a href="/Register">Register</a>
        </span>
      </div>
    </div>
  );
 }
