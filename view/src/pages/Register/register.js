import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class SignUp extends Component {
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

  // Submit details to the backend
  onSubmit = e => {
    this.setState({ loading: true });
    e.preventDefault();
    const { email, password } = this.state;

    fetch("https://hidden-island-59990.herokuapp.com/api/v1/auth/signup", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(user => {
        if (user.message === "User created successfully") {
          this.setState({ loading: false });
          this.setState({ isLoggedIn: true });
        } else if (user.error) {
          this.setState({ loading: false });
          this.setState({ error: user.error });
        }
      });
  };

  render() {
    const { isLoggedIn, error } = this.state;
    //console.log(error);

    return isLoggedIn ? (
      <Redirect to="/calculator" />
    ) : (
      <div>
        <div
          className="ui middle aligned center aligned grid"
          style={{ transform: "translateY(30%)" }}
        >
          <div className="column">
            <h2 className="ui teal image header">
              <div className="content">Register with us</div>
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
                  <button
                    className="ui fluid large teal submit button"
                    disabled={this.state.loading}
                  >
                    {this.state.loading ? "Sending..." : "Register"}
                  </button>
                </div>
              </div>
              <div className="ui error message">{error}</div>

              <div className="ui message">
                Already have an account? <Link to="/login">Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default SignUp;
