import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { required, length, email } from "../../../utils/validators";

import "./Register.css";

class Register extends Component {
  constructor(props) {
    super(props);

    console.log(props);
  }

  state = {
    registerForm: {
      name: {
        value: "",
        valid: false,
        touched: false,
        validators: [required],
      },
      surname: {
        value: "",
        valid: false,
        touched: false,
        validators: [required],
      },
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
      country: {
        value: "",
        valid: false,
        touched: false,
        validators: [required],
      },
      city: {
        value: "",
        valid: false,
        touched: false,
        validators: [required],
      },
      address: {
        value: "",
        valid: false,
        touched: false,
        validators: [required],
      },
    },
    isFormValid: false,
    isRegistered: false,
  };

  inputChangeHandler = (input, e) => {
    const value = e.target.value;

    this.setState((prevState) => {
      let isValid = true;

      for (const validator of prevState.registerForm[input].validators) {
        isValid = isValid && validator(value);
      }

      const updatedForm = {
        ...prevState.registerForm,
        [input]: {
          ...prevState.registerForm[input],
          valid: isValid,
          value: value,
        },
      };

      let formIsValid = true;

      for (const inputName in updatedForm) {
        if (inputName !== "isFormValid") {
          formIsValid = formIsValid && updatedForm[inputName]?.valid;
        }
      }

      return {
        registerForm: updatedForm,
        isFormValid: formIsValid,
      };
    });
  };

  inputBlurHandler = (input) => {
    this.setState((prevState) => {
      return {
        registerForm: {
          ...prevState.registerForm,
          [input]: {
            ...prevState.registerForm[input],
            touched: true,
          },
        },
      };
    });
  };

  render() {
    const form = this.state.registerForm;

    if (this.props.state.message) {
      this.props.state.message = "";
      this.props.history.push("/login");
      /* if (props.state.registered) {
          props.history.push("/login");
        }*/
    }

    return (
      <>
        <h2 className="form__header">SignUp form</h2>
        <form
          className="form--register"
          onSubmit={(evt) =>
            this.props.onRegister(evt, {
              name: form.name.value,
              surname: form.surname.value,
              email: form.email.value,
              password: form.password.value,
              country: form.country.value,
              city: form.city.value,
              address: form.address.value,
            })
          }
        >
          <div className="form__group">
            <label htmlFor="name">*Name:</label>
            <input
              id="name"
              type="text"
              className="form__input"
              onChange={this.inputChangeHandler.bind(this, "name")}
              onBlur={this.inputBlurHandler.bind(this, "name")}
              placeholder="John"
            />
            {form.name.touched && !form.name.valid ? (
              <span className="form__error">Enter valid name!</span>
            ) : null}
          </div>

          <div className="form__group">
            <label htmlFor="surname">*Surname:</label>
            <input
              id="surname"
              type="text"
              className="form__input"
              onChange={this.inputChangeHandler.bind(this, "surname")}
              onBlur={this.inputBlurHandler.bind(this, "surname")}
              placeholder="Donavan"
            />
            {form.surname.touched && !form.surname.valid ? (
              <span className="form__error">Enter valid surname!</span>
            ) : null}
          </div>

          <div className="form__group">
            <label htmlFor="email">*Email:</label>
            <input
              id="email"
              type="email"
              className="form__input"
              onChange={this.inputChangeHandler.bind(this, "email")}
              onBlur={this.inputBlurHandler.bind(this, "email")}
              placeholder="example@mail.com"
            />
            {form.email.touched && !form.email.valid ? (
              <span className="form__error">Enter valid email!</span>
            ) : null}
          </div>

          <div className="form__group">
            <label htmlFor="password">*Password:</label>
            <input
              id="password"
              type="password"
              className="form__input"
              onChange={this.inputChangeHandler.bind(this, "password")}
              onBlur={this.inputBlurHandler.bind(this, "password")}
              placeholder="at least 6 characters"
            />
            {form.password.touched && !form.password.valid ? (
              <span className="form__error">
                Password must be at least 6 char!
              </span>
            ) : null}
          </div>

          <div className="form__group">
            <label htmlFor="country">*Country:</label>
            <input
              id="country"
              type="text"
              className="form__input"
              onChange={this.inputChangeHandler.bind(this, "country")}
              onBlur={this.inputBlurHandler.bind(this, "country")}
              placeholder="Ukraine"
            />
            {form.country.touched && !form.country.valid ? (
              <span className="form__error">Enter valid country!</span>
            ) : null}
          </div>

          <div className="form__group">
            <label htmlFor="city">*City:</label>
            <input
              id="city"
              type="text"
              className="form__input"
              onChange={this.inputChangeHandler.bind(this, "city")}
              onBlur={this.inputBlurHandler.bind(this, "city")}
              placeholder="Odessa"
            />
            {form.city.touched && !form.city.valid ? (
              <span className="form__error">Enter valid city!</span>
            ) : null}
          </div>

          <div className="form__group">
            <label htmlFor="address">*Address:</label>
            <input
              id="address"
              type="text"
              className="form__input"
              onChange={this.inputChangeHandler.bind(this, "address")}
              onBlur={this.inputBlurHandler.bind(this, "address")}
              placeholder="str. Staroportofrankovskaya, 32"
            />
            {form.address.touched && !form.address.valid ? (
              <span className="form__error">Enter valid address!</span>
            ) : null}
          </div>

          <button
            type="submit"
            className="btn--auth"
            disabled={this.state.isFormValid === true ? "" : "disabled"}
            onClick={this.isRegistered}
          >
            Register
          </button>
        </form>
      </>
    );
  }
}

export default withRouter(Register);
