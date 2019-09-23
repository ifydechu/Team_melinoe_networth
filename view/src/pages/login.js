import React from 'react';
import './login.css';

class Login extends React.Component{
    render() {
        return (
            <div style={{ transform: 'translateY(80%)' }} className="contain ">
                <div className="ui middle aligned center aligned grid">
                    <div className="column">
                        <h2 className="ui teal image header">
                            <div className="content">Login to your Account</div>
                        </h2>
                        <form
                            className="ui large form error"
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
                                    {' '}
                                    <button
                                        type="submit"
                                        className="ui fluid large teal submit button"
                                    >
                                            Login
                                    </button>
                                </div>
                            </div>

                            <div
                                className="ui error message"
                                type="submit"
                            >
                                
                            </div>
                        </form>
                        <div className="ui message">
                            <p style={{ fontSize: '1.1rem' }}>
                                New to us? <a href='#'>Sign Up</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;