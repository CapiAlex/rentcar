import '../Home/Home.css'
import { Link } from "react-router-dom";


export function Home() {
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
          <Link to="/Addcar" className="btn btn-primary btn-large">
            Go to Add a car
          </Link>
        </div>
      </div>
    );
  }