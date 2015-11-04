import React from 'react';

class DishesNavView extends React.Component {
    render () {
        return (
            <ul className="dishes-catalog-nav">
                <li className="logo">
                    <a href="/">
                        <img src="img/cook-hat.png" alt="logo"/>
                        <span>Hell yeah dish!</span>
                    </a>
                </li>
                <li><a href="/my-settings">My settings</a></li>
                <li><a href="/create-dish">Create dish</a></li>
                <li className="logout"><a href="/logout">Logout</a></li>
            </ul>
        );
    }
}

export default DishesNavView;