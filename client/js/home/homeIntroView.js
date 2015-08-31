import React from 'react';
import PopupView from '../common/popup/popupView.js';
import SignView from '../common/login/signView.js';

class HomeIntroView extends React.Component {
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
            <div className="home-page-intro">
                <div className="cell">
                    <div className="cook-hat">
                        <img src="img/cook-hat.png" alt="cook-hat"/>
                    </div>

                    <h1>Hell yeah dish!
                        <small>You smell what he is cooking?</small>
                    </h1>
                </div>

                <ul className="home-menu">
                    <li className="active"><a href="javascript:void(0)">Home</a></li>
                    <li><a href="javascript:void(0)">Second Place</a></li>
                    <li><a href="javascript:void(0)">Contacts</a></li>
                    <li><a href="javascript:void(0)">Popular</a></li>
                    <li><a href="javascript:void(0)">About</a></li>

                    <span className="login-button" onClick={this.handleClick}>Login</span>
                </ul>
            </div>
        )
    }
}

export default HomeIntroView;