import React, { Component } from "react";

import { Link, Redirect } from "react-router-dom";

import "./login.css";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      isLoggedIn: false
    };
  }

  onEmailInput = e => {
    this.setState({ email: e.target.value });
  };

  onPasswordInput = e => {
    this.setState({ password: e.target.value });
  };

  // Submit to the backend for authentication
  onSubmitInputs = e => {
    e.preventDefault();
    const { email, password } = this.state;
    fetch("", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then();
  };

  render() {
    const { isLoggedIn } = this.state;

    return isLoggedIn ? (
      <Redirect to="/calculator" />
    ) : (
      <div style={{ transform: "translateY(80%)" }} className="contain ">
        <div className="ui middle aligned center aligned grid">
          <div className="column">
            <h2 className="ui teal image header">
              <div className="content">Login to your Account</div>
            </h2>
            <form
              className="ui large form error"
              method="post"
              onSubmit={this.onSubmitInputs}
            >
              <div className="ui stacked segment">
                <div className="field">
                  <div className="ui left icon input">
                    <i className="mail icon"></i>
                    <input
                      type="email"
                      name="text"
                      placeholder="E-mail Address"
                      onChange={this.onEmailInput}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={this.onPasswordInput}
                      required
                    />
                  </div>
                </div>

                <div className="">
                  {" "}
                  <button
                    type="submit"
                    className="ui fluid large teal submit button"
                  >
                    <Link to='/calculator'>Login</Link>
                  </button>
                </div>
              </div>

              <div className="ui error message" type="submit"></div>
            </form>
            <div className="ui message">
              <p style={{ fontSize: "1.1rem" }}>
                New to us? <Link to="/register">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
