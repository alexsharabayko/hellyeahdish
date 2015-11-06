import React from 'react';
import urlUtil from '../common/url-util/urlUtil';

class DishesNavView extends React.Component {
    render () {
        return (
            <ul className="dishes-catalog-nav">
                <li className="logo">
                    <a href={urlUtil.routes.home}>
                        <img src="img/cook-hat.png" alt="logo"/>
                        <span>Hell yeah dish!</span>
                    </a>
                </li>
                <li><a href={urlUtil.routes.mySettings}>My settings</a></li>
                <li><a href={urlUtil.routes.createDish}>Create dish</a></li>
                <li className="logout"><a href={urlUtil.routes.logout}>Logout</a></li>
            </ul>
        );
    }
}

export default DishesNavView;