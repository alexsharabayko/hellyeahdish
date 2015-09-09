import React from 'react';
import PopupView from '../common/popup/popupView';
import SignView from '../common/login/signView';

class MainNavView extends React.Component {
    static handleClick (event) {
        new PopupView({
            bounds: {
                bindElement: event.target
            },

            data: {
                content: SignView
            }
        });
    }

    getLoginButton () {
        return this.props.isLogin ? <span className="login-button" onClick={MainNavView.handleClick}>Login</span> : null;
    }

    render () {
        return (
            <ul className="main-nav">
                <li className="active"><a href="#/home">Home</a></li>
                <li><a href="#/home/dishes">Dishes</a></li>
                <li><a href="javascript:void(0)">Contacts</a></li>
                <li><a href="javascript:void(0)">Popular</a></li>
                <li><a href="javascript:void(0)">About</a></li>

                {this.getLoginButton()}
            </ul>
        )
    }
}

export default MainNavView;