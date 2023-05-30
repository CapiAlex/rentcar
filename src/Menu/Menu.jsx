import { Link } from "react-router-dom"
import "../Menu/Menu.css"

export function Menu() {
    return (
        <>
            <div className="Menu">
                <nav className="navbar navbar-expand-lg bg-secondary navbar-dark bg-dark">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                                <li className="nav-item">
                                    <Link className="nav-link" to="/Home">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/Rent"> Rent a car</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/Return"> Return a car</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/Addcar"> Add a car</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}