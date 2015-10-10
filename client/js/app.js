import React from 'react';

import user from './common/user/userModel';
import Router from './common/router/router';

import HomeView from './home/homeView';
import DishesCatalogView from './dishes-catalog/dishesCatalogView';
import CreateDishView from './create-dish/createDishView';

var applicationRootElement = document.querySelector('.application-root'),
    popupContainerElement = document.querySelector('.popup-container');

var unmountAll = function () {
    React.unmountComponentAtNode(applicationRootElement);
    React.unmountComponentAtNode(popupContainerElement);
};

user.on('loginSuccess', () => {
    unmountAll();
    React.render(<CreateDishView />, applicationRootElement);
});

user.on('loginFail', () => {
    unmountAll();
    React.render(<HomeView />, applicationRootElement);
});

user.loginByToken();

var routes = {
    '/#/dishes-catalog': DishesCatalogView,

    'default': HomeView
};

window.addEventListener('hashchange', (event) => {
    let path = location.href.replace(location.origin, ''),
        Factory = React.createFactory(routes[path] || routes['default']);

    unmountAll();
    React.render(Factory(), applicationRootElement);
});

//React.render(<HomeView />, applicationRootElement);