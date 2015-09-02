import React from 'react';
import HomeIntroView from './homeIntroView';
import Router from '../common/router/router';

Router.addRoutes({
    '#/home': function () {
        document.querySelector('.home-page').transform('translate(0, 0)');
    },

    '#/home/dishes': function () {
        document.querySelector('.home-page').transform('translate(-100%, 0)');
    }
});

class HomeView extends React.Component {
    render () {
        return (
            <div className="home-page">
                <HomeIntroView />
            </div>
        );
    }
}

export default HomeView;