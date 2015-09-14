import React from 'react';
import HomeView from './home/homeView';
import user from './common/user/userModel';
import DishesCatalogView from './dishes-catalog/dishesCatalogView';

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

React.render(<DishesCatalogView />, applicationRootElement);