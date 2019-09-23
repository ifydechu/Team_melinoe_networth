import React, { Component } from "react";

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: ""
    };
  }

  onEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  onPasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  // Submit details to the backend
  onSubmit = e => {
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
    return (
      <div>
        <div
          className="ui middle aligned center aligned grid"
          style={{ transform: "translateY(30%)" }}
        >
          <div className="column">
            <h2 className="ui teal image header">
              <div className="content">Sign-up</div>
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
                      name="email"
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
                      minLength="6"
                    />
                  </div>
                </div>

                <div>
                  <button className="ui fluid large teal submit button">
                    Sign Up
                  </button>
                </div>
              </div>
              <div className="ui error message"></div>
              <div className="ui error message"></div>
              <div className="ui message">
                Already have an account? <a href="#">Login</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default SignUp;
