import React from 'react';
import HomeIntroView from './homeIntroView';
import Router from '../common/router/router';
import DishesView from '../dishes/dishesView';
import user from '../common/user/userModel';

user.on('loginSuccess', () => {
    //debugger;
});

console.log(user.id);

//Router.addRoutes({
//    '#/home': function () {
//        document.querySelector('.home-page').transform('translate(0, 0)');
//    },
//
//    '#/home/dishes': function () {
//        document.querySelector('.home-page').transform('translate(-50%, 0)');
//    }
//});

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