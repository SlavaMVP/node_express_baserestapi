import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation(props) {
  return (
    <nav className="app-nav">
      <ul className="nav__list">
        <li className="nav__item">
          <NavLink className="nav__link" to="/" exact>
            <img
              className="logo"
              src="http://localhost:8085/images/logo.png"
              alt="logo"
              width="50"
            ></img>
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            className="nav__link"
            activeClassName="nav__link--active"
            to="/"
            exact
          >
            Main
          </NavLink>
        </li>

        {props.isAuth ? null : (
          <li className="nav__item">
            <NavLink
              className="nav__link"
              activeClassName="nav__link--active"
              to="/login"
            >
              Login
            </NavLink>
          </li>
        )}

        {!props.isAuth ? null : (
          <>
            <li className="nav__item">
              <NavLink
                className="nav__link"
                activeClassName="nav__link--active"
                to="/user"
              >
                User info
              </NavLink>
            </li>
          </>
        )}

        <li className="nav__iteme">
          <NavLink
            className="nav__link"
            activeClassName="nav__link--active"
            to="/about"
          >
            About Us
          </NavLink>
        </li>

        <li className="nav__item">
          <NavLink
            className="nav__link"
            activeClassName="nav__link--active"
            to="/cart"
          >
            <img
              src="http://localhost:8085/images/shopping-cart.svg"
              width="30"
              alt="cart"
            />
          </NavLink>
        </li>
      </ul>

      <hr />
    </nav>
  );
}

export default Navigation;
