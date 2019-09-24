import React, { Component } from "react";

import { Link, Redirect } from "react-router-dom";

import "./login.css";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      isLoggedIn: false,
      loading: false,
      error: ""
    };
  }

  onEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  onPasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  // Submit to the backend for authentication
  onSubmit = e => {
    this.setState({ loading: true });
    e.preventDefault();
    const { email, password } = this.state;
    fetch("https://hidden-island-59990.herokuapp.com/api/v1/auth/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(user => {
        if (user.message === "User logged in successfully") {
          this.setState({ isLoggedIn: true });
          this.setState({ loading: false });
        } else if (user.error) {
          this.setState({ error: user.error });
          this.setState({ loading: false });
        }
      });
  };

  render() {
    const { isLoggedIn, error, loading } = this.state;

    return isLoggedIn ? (
      <Redirect to="/calculator" />
    ) : (
      <div style={{ transform: "translateY(80%)" }} className="contain ">
        <div className="ui middle aligned center aligned grid">
          <div className="column">
            <h2 className="ui teal image header">
              <div className="content">Login to your account</div>
            </h2>
            <form
              className="ui large form error"
              method="post"
              onSubmit={this.onSubmit}
            >
              <div className="ui stacked segment">
                <div className="field">
                  <div className="ui left icon input">
                    <i className="mail icon"></i>
                    <input
                      type="email"
                      name="text"
                      placeholder="E-mail Address"
                      onChange={this.onEmailChange}
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
                      onChange={this.onPasswordChange}
                      required
                    />
                  </div>
                </div>

                <div className="">
                  <button
                    type="submit"
                    className="ui fluid large teal submit button"
                  >
                    {loading ? "Hold on..." : "Login"}
                  </button>
                </div>
              </div>

              <div className="ui error message" type="submit">
                {error}
              </div>
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
