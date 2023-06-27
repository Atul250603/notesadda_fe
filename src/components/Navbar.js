import React from "react";
import logo from "../logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
export default function Navbar() {
  let location = useLocation();
  let navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <img src={logo} alt="LOGO" style={{width:"80px",height:"80px"}}/>
        <Link
          className="navbar-brand text-stylish fw-bolder text-warning large-size"
          to="/"
        >
          NotesAdda
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
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link text-stylish"
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-stylish" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link text-stylish`}
                to="/public"
              >
                Public
              </Link>
            </li>
          </ul>
          
          {!localStorage.getItem("token") ? (
            <div>
              <Link
                to="/login"
                className="btn btn-warning btn-sm mx-1 text-stylish"
                tabIndex="-1"
                role="button"
                aria-disabled="true"
              >
                <strong>Login</strong>
              </Link>
              <Link
                to="/signup"
                className="btn btn-warning btn-sm mx-1 text-stylish"
                tabIndex="-1"
                role="button"
                aria-disabled="true"
              >
                <strong>Signup</strong>
              </Link>
            </div>
          ) : (
            <div>
              <button
                className="btn btn-warning btn-sm mx-1 text-stylish fw-bold"
                tabIndex="-1"
                role="button"
                aria-disabled="true"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("download");
                  navigate("/login");
                }}
              >
                <strong>Logout</strong>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
