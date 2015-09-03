import React from 'react';
import HomeIntroView from './homeIntroView';
import Router from '../common/router/router';
import DishesView from '../dishes/dishesView';

Router.addRoutes({
    '#/home': function () {
        document.querySelector('.home-page').transform('translate(0, 0)');
    },

    '#/home/dishes': function () {
        document.querySelector('.home-page').transform('translate(-50%, 0)');
    }
});

class HomeView extends React.Component {
    render () {
        return (
            <div className="home-page">
                <DishesView />
            </div>
        );
    }
}

export default HomeView;