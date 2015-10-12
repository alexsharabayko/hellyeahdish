import React from 'react';
import user from '../../common/user/userModel';

class SignView extends React.Component {
    constructor (props) {
        super(props);
    }

    loginSubmitHandler (event) {
        var data = {};

        event.preventDefault();

        Array.prototype.forEach.call(event.target.elements, (input) => {
            if (input.name) {
                data[input.name] = input.value || input.textContent;
            }
        });

        user.login(data);
    }

    switchForm (event) {
        this.refs.loginForm.getDOMNode().classList.toggle('hidden');
        this.refs.registerForm.getDOMNode().classList.toggle('hidden');
    }

    render () {
        return (
            <div className="sign-wrapper">
                <div className="cell">
                    <div className="sign-view">
                        <form className="login-form" onSubmit={this.loginSubmitHandler} ref="loginForm">
                            <h3>Enter your credentials</h3>

                            <div className="sign-view-field">
                                <i className="fa fa-user"></i>
                                <input name="username" type="text"/>
                            </div>
                            <div className="sign-view-field">
                                <i className="fa fa-lock"></i>
                                <input name="password" type="password"/>
                            </div>

                            <input className="submit-btn" type="submit" value="Submit"/>

                            <div className="switch-form" onClick={this.switchForm.bind(this)}>If you are not a user,
                                please register
                            </div>
                        </form>

                        <form className="register-form hidden" ref="registerForm">
                            <h3>Enter your information</h3>

                            <div className="sign-view-field">
                                <i className="fa fa-user"></i>
                                <input type="text" placeholder="Username" />
                            </div>
                            <div className="sign-view-field">
                                <i className="fa fa-lock"></i>
                                <input type="text" placeholder="Password" />
                            </div>
                            <div className="sign-view-field">
                                <i className="fa fa-envelope"></i>
                                <input type="text" placeholder="Email" />
                            </div>
                            <div className="sign-view-field">
                                <i className="fa fa-smile-o"></i>
                                <input type="text" placeholder="First name" />
                            </div>
                            <div className="sign-view-field">
                                <i className="fa fa-smile-o"></i>
                                <input type="text" placeholder="Last name" />
                            </div>

                            <input className="submit-btn" type="submit" value="Submit"/>

                            <div className="switch-form" onClick={this.switchForm.bind(this)}>Login if you are already
                                registered
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignView;