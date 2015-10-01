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
    React.render(<DishesCatalogView />, applicationRootElement);
});

user.on('loginFail', () => {
    unmountAll();
    React.render(<HomeView />, applicationRootElement);
});

user.loginByToken();

//React.render(<HomeView />, applicationRootElement);