import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/Products/ProductDetails/ProductDetails";
import UserPage from "./pages/UserPage/UserPage";
import Cart from "./components/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";

class App extends Component {
  state = {
    isAuth: false,
    token: null,
    userId: null,
    error: null,
    message: "",
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expirationDate");
    const isExpirationDateValid = new Date(expirationDate) <= new Date();

    if (!token || !expirationDate) {
      return;
    }
    if (isExpirationDateValid) {
      this.logoutHandler();
      return;
    }
    const userId = localStorage.getItem("userId");
    const toExpirationDateMs =
      new Date(expirationDate).getTime() - new Date().getTime();
    this.setState({ isAuth: true, token: token, userId: userId });
    this.setAutologout(toExpirationDateMs);
  }

  setAutologout = (ms) => {
    setTimeout(() => {
      this.logoutHandler();
    }, ms);
  };

  signUpHandler = (evt, data) => {
    evt.preventDefault();
    fetch("http://localhost:8085/t-shop/signup", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        surname: data.surname,
        email: data.email,
        password: data.password,
        country: data.country,
        city: data.city,
        address: data.address,
      }),
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error("Validation failed!");
        }
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Creating user failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        this.setState({ isAuth: false, message: resData.message });
        //! ///////////////////////////////////this.props.history.replace("/login");
      })
      .catch((err) => {
        this.setState({
          isAuth: false,
          error: err,
        });
      });
  };

  logInHandler = (evt, data) => {
    evt.preventDefault();
    fetch("http://localhost:8085/t-shop/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error("Validation failed!");
        }
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Authentication failed!");
        }
        return res.json();
      })
      .then((res) => {
        this.setState({
          isAuth: true,
          userId: res.userId,
          token: res.token,
          error: null,
        });
        localStorage.setItem("token", res.token);
        localStorage.setItem("userId", res.userId);
        localStorage.setItem("email", res.email); //email
        const expirationTimeMs = 60 * 60 * 1000;
        const expirationDate = new Date(
          new Date().getTime() + expirationTimeMs
        );
        localStorage.setItem("expirationDate", expirationDate.toISOString());
        this.setAutologout(expirationTimeMs);
      })
      .catch((err) => {
        this.setState({
          isAuth: false,
          error: err,
        });
      });
  };

  logoutHandler = () => {
    this.setState({ isAuth: false, token: null });
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
  };

  render() {
    let routes = (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/about">
          <About />
        </Route>

        {/*-------------------------------------------------Registration*/}
        <Route path="/login">
          <Login onLogin={this.logInHandler} />
        </Route>
        <Route path="/register">
          <Register onRegister={this.signUpHandler} state={this.state} />
        </Route>
        {/*-------------------------------------------------Registration*/}

        <Route path="/products/:category">
          <Products />
        </Route>

        <Route path="/products">
          <Products />
        </Route>

        <Route path="/product/:id">
          <ProductDetails />
        </Route>

        <Redirect to="/login" />
      </Switch>
    );

    if (this.state.isAuth) {
      routes = (
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/about">
            <About />
          </Route>

          <Route path="/cart">
            <Cart />
          </Route>

          <Route path="/user">
            <UserPage onLogout={this.logoutHandler} />
          </Route>

          <Route path="/products/:category">
            <Products />
          </Route>

          <Route path="/products">
            <Products />
          </Route>

          <Route path="/product/:id">
            <ProductDetails />
          </Route>

          <Route path="/checkout">
            <Checkout />
          </Route>

          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <>
        <Router>
          <Navigation isAuth={this.state.isAuth} />
          <div className="app-wrapper">{routes}</div>
        </Router>
      </>
    );
  }
}

export default App;
