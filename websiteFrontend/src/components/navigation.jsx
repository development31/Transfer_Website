import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from './AuthContext';

export const Navigation = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  const scrollHandler = (e) => {
    window.scrollTo({ top: e.current.offsetTop, behavior: 'smooth' });
  };

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <Link className="navbar-brand page-scroll" to="/about">
            <img className="logo" src="/img/logo.png" alt="LOGO" />
          </Link>{" "}
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            <li onClick={scrollHandler}>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/Transfer">Transfer</Link>
            </li>
            <li>
              <Link to="/Tour">Tour</Link>
            </li>
            <li>
              <Link to="/product">Products</Link>
            </li>
            <li>
              <Link to="/Faq">FAQ</Link>
            </li>
            {!isLoggedIn ? (
              <li>
                <Link to="/Login">Login</Link>
              </li> 
            ) : (
              <li>
              <Link to="#"   onClick={logout}>Logout</Link>
            </li>

            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
