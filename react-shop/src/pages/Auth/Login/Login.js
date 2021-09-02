import React, { Component } from "react";

import { Link } from "react-router-dom";
import { required, length, email } from "../../../utils/validators";

import "./Login.css";

class Login extends Component {
  state = {
    loginForm: {
      email: {
        value: "",
        valid: false,
        touched: false,
        validators: [required, email],
      },
      password: {
        value: "",
        valid: false,
        touched: false,
        validators: [required, length({ min: 6 })],
      },
    },
    isFormValid: false,
  };

  inputChangeHandler = (input, e) => {
    const value = e.target.value;

    this.setState((prevState) => {
      let isValid = true;

      for (const validator of prevState.loginForm[input].validators) {
        isValid = isValid && validator(value);
      }

      const updatedForm = {
        ...prevState.loginForm,
        [input]: {
          ...prevState.loginForm[input],
          valid: isValid,
          value: value,
        },
      };

      let formIsValid = true;

      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }
      return {
        loginForm: updatedForm,
        isFormValid: formIsValid,
      };
    });

    //console.log(this.state);
  };

  inputBlurHandler = (input) => {
    this.setState((prevState) => {
      return {
        loginForm: {
          ...prevState.loginForm,
          [input]: {
            ...prevState.loginForm[input],
            touched: true,
          },
        },
      };
    });
  };

  render() {
    const form = this.state.loginForm;

    return (
      <>
        <h2 className="form__header">SignIn form</h2>
        <form
          className="form--login"
          onSubmit={(evt) =>
            this.props.onLogin(evt, {
              email: this.state.loginForm.email.value,
              password: this.state.loginForm.password.value,
            })
          }
        >
          <div className="form__group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              className="form__input"
              onChange={this.inputChangeHandler.bind(this, "email")}
              onBlur={this.inputBlurHandler.bind(this, "email")}
            />
            {form.email.touched && !form.email.valid ? (
              <span className="form__error">Enter valid email!</span>
            ) : null}
          </div>

          <div className="form__group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              className="form__input"
              onChange={this.inputChangeHandler.bind(this, "password")}
              onBlur={this.inputBlurHandler.bind(this, "password")}
            />
            {form.password.touched && !form.password.valid ? (
              <span className="form__error">Enter valid password!</span>
            ) : null}
          </div>

          <button
            className="btn--auth"
            type="submit"
            disabled={this.state.isFormValid === true ? "" : "disabled"}
          >
            Login
          </button>
        </form>

        <p className="register-info">
          If you don't have an account you can
          <Link to="/register"> Register</Link>
        </p>
      </>
    );
  }
}

export default Login;
