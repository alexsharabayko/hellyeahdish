import React from 'react';

import user from './common/user/userModel';

import HomeView from './home/homeView';
import DishesCatalogView from './dishes-catalog/dishesCatalogView';
import CreateDishView from './create-dish/createDishView';

var applicationRootElement = document.querySelector('.application-root'),
    popupContainerElement = document.querySelector('.popup-container');

var unmountAll = function () {
    React.unmountComponentAtNode(applicationRootElement);
    React.unmountComponentAtNode(popupContainerElement);
};

React.render(<CreateDishView />, applicationRootElement);

//class Router {
//    constructor () {
//        this.initRoutes();
//        this.bindListeners();
//        this.bindToUser();
//
//        this.navigate();
//    }
//
//    initRoutes () {
//        this.routes = {
//            '/dishes-catalog': DishesCatalogView,
//            '/create-dish': CreateDishView,
//            '/': HomeView
//        }
//    }
//
//    bindListeners () {
//        document.addEventListener('click', (event) => {
//            if (event.target.href) {
//                event.preventDefault();
//
//                this.navigate(event.target.getAttribute('href'));
//            }
//        }, true);
//
//        window.addEventListener('popstate', this.handleRoute.bind(this));
//    }
//
//    bindToUser () {
//        user.on('loginSuccess', () => {
//            this.navigate('/create-dish');
//        });
//
//        user.on('loginSuccess', this.navigate.bind(this, '/create-dish'));
//        user.on('loginFail', this.navigate.bind(this, '/'));
//
//        user.on('loginFail', () => {
//            unmountAll();
//            React.render(<HomeView />, applicationRootElement);
//        });
//    }
//
//    handleRoute () {
//        var Factory = React.createFactory(this.routes[location.pathname] || '/');
//
//        unmountAll();
//        React.render(Factory(), applicationRootElement);
//    }
//
//    navigate (path) {
//        window.history.pushState(null, null, path || '/');
//
//        this.handleRoute();
//    }
//}
//
//new Router();