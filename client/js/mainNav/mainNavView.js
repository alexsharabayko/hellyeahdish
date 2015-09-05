import React from 'react';
import PopupView from '../common/popup/popupView';
import SignView from '../common/login/signView';

class MainNavView extends React.Component {
    handleClick (event) {
        new PopupView({
            bounds: {
                bindElement: event.target
            },

            data: {
                content: SignView
            }
        });
    }

    render () {
        return (
            <ul className="main-nav">
                <li className="active"><a href="#/home">Home</a></li>
                <li><a href="#/home/dishes">Dishes</a></li>
                <li><a href="javascript:void(0)">Contacts</a></li>
                <li><a href="javascript:void(0)">Popular</a></li>
                <li><a href="javascript:void(0)">About</a></li>

                <span className="login-button" onClick={this.handleClick}>Login</span>
            </ul>
        )
    }
}

export default MainNavView;