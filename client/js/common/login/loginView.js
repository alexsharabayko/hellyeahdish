import React from 'react';

class LoginView extends React.Component {
    constructor(props) {
        super(props);
    }

    loginSubmitHandler(event) {
        event.preventDefault();

        debugger;
    }

    switchForm(event) {
        var el = React.findDOMNode(this);

        el.q('form').forEach(function (form) {
            form.classList.toggle('hidden');
        });
    }

    render() {
        return (
            <div className="login-wrapper">
                <div className="cell">
                    <div className="login-view">
                        <form onSubmit={this.loginSubmitHandler}>
                            <h3>Enter your credentials</h3>

                            <div className="login-view-field">
                                <i className="fa fa-user"></i>
                                <input type="text"/>
                            </div>
                            <div className="login-view-field">
                                <i className="fa fa-lock"></i>
                                <input type="password"/>
                            </div>

                            <input className="submit-btn" type="submit" value="Submit"/>

                            <div className="switch-form" onClick={this.switchForm.bind(this)}>If you are not a user,
                                please register
                            </div>
                        </form>

                        <form className="hidden">
                            <h3>Enter your information</h3>

                            <div className="login-view-field">
                                <i className="fa fa-user"></i>
                                <input type="text"/>
                            </div>
                            <div className="login-view-field">
                                <i className="fa fa-lock"></i>
                                <input type="password"/>
                            </div>
                            <div className="login-view-field">
                                <i className="fa fa-user"></i>
                                <input type="text"/>
                            </div>
                            <div className="login-view-field">
                                <i className="fa fa-lock"></i>
                                <input type="password"/>
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

export default LoginView;