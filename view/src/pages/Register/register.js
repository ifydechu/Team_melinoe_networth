import React from "react";
import {Link} from 'react-router-dom';

class SignUp extends React.Component {
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
            <form className="ui large form error">
              <div className="ui stacked segment">
                <div className="field">
                  <div className="ui left icon input">
                    <i className="mail icon"></i>
                    <input
                      type="email"
                      name="email"
                      placeholder="E-mail Address"
                      onChange={this.inputHandler}
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
                      onChange={this.inputHandler}
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
                Already have an account? <Link to='/login'>Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default SignUp;
