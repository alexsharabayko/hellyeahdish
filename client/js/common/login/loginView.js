import React from 'react';

class LoginView extends React.Component {
    constructor (props) {
        super(props);
    }

    loginSubmitHandler (event) {
        debugger;
    }

    render () {
        return (
            <div className="login-wrapper">
                <div className="cell">
                    <from className="login-view" onSubmit={this.loginSubmitHandler}>
                        <div className="login-view-field">
                            <i className="fa fa-user"></i>
                            <input type="text" placeholder="username"/>
                        </div>
                        <div className="login-view-field">
                            <i className="fa fa-lock"></i>
                            <input type="password" placeholder="password"/>
                        </div>
                        <input type="submit" value="Submit"/>
                    </from>
                </div>
            </div>
        );
    }
}

export default LoginView;