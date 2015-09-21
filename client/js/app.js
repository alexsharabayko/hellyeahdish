import React from 'react';

import user from './common/user/userModel';
import Router from './common/router/router';

import HomeView from './home/homeView';
import DishesCatalogView from './dishes-catalog/dishesCatalogView';
import CreateDishView from './create-dish/createDishView';

var applicationRootElement = document.querySelector('.application-root');

//user.on('loginSuccess', () => {
//    React.unmountComponentAtNode(applicationRootElement);
//    React.render(<DishesCatalogView />, applicationRootElement);
//});

//user.on('loginFail', () => {
//    React.unmountComponentAtNode(applicationRootElement);
//    React.render(<HomeView />, applicationRootElement);
//});

user.loginByToken();

React.render(<CreateDishView />, applicationRootElement);