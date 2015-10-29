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

class Router {
    constructor () {
        this.initRoutes();
        this.bindListeners();
        this.bindToUser();

        user.loginByToken();
    }

    initRoutes () {
        var routes = {
            '/dishes-catalog': {
                view: DishesCatalogView
            },
            '/create-dish': {
                view: CreateDishView
            },
            '/': {
                view: HomeView
            }
        };

        this.routes = Object.freeze(routes);
    }

    bindListeners () {
        document.addEventListener('click', (event) => {
            var t = event.target;

            while (t !== document.body && !t.href) {
                t = t.parentElement;
            }

            if (t.href) {
                event.preventDefault();

                this.navigate(t.getAttribute('href'));
            }
        }, true);

        window.addEventListener('popstate', this.handleRoute.bind(this));
    }

    bindToUser () {
        user.on('loginSuccess', this.navigate.bind(this, '/dishes-catalog'));
        user.on('loginFail', this.navigate.bind(this, '/'));
    }

    handleRoute () {
        var Factory = React.createFactory((this.routes[location.pathname] || this.routes['/']).view);

        unmountAll();
        React.render(Factory({ urlParams: this.getUrlParams() }), applicationRootElement);
    }

    navigate (path) {
        window.history.pushState(null, null, path || '/');

        this.handleRoute();
    }

    getUrlParams () {
        var paramsStrings = window.location.search ? window.location.search.slice(1).split('&') : [],
            o = {};

        paramsStrings.forEach((str) => {
            var arr = str.split('=');

            o[arr[0]] = arr[1];
        });

        return o;
    }
}

new Router();