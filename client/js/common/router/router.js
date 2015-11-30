import React from 'react';
import ReactDom from 'react-dom';

import user from '../user/userModel';

import HomeView from '../../home/homeView';
import DishesCatalogView from '../../dishes-catalog/dishesCatalogView';
import CreateDishView from '../../create-dish/createDishView';
import DishDetailsView from '../../dish-details/dishDetailsView';
import CookingView from '../../cooking/cookingView';

import PopupView from '../../widgets/popup/popupView';

var applicationRootElement = document.querySelector('.application-root'),
    popupContainerElement = document.querySelector('.popup-container');

var unmountAll = function () {
    ReactDom.unmountComponentAtNode(applicationRootElement);
    ReactDom.unmountComponentAtNode(popupContainerElement);
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
            '/dish-details/:id': {
                view: DishDetailsView
            },
            '/cooking/:id': {
                view: CookingView
            },
            '/': {
                view: HomeView
            }
        };

        this.routes = [];

        Object.keys(routes).forEach(key => {
            var m = key.match(/\:[a-zA-Z0_-]+/g);

            this.routes.push({
                path: new RegExp('^' + key.replace(/:[a-zA-Z_-]+/g, '([a-zA-Z0-9-_]+)') + '$'),
                vars: m && m.map(i => i.substr(1)),
                route: key,
                view: routes[key].view,
                fn: routes[key].fn
            });
        });
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
        user.on('loginSuccess', this.handleRoute.bind(this));
        user.on('loginFail', this.handleRoute.bind(this));
        user.on('logout', this.handleRoute.bind(this));
    }

    handleRoute (paths) {
        var routeObj = this.routes.filter(route => route.path.test(window.location.pathname))[0];

        if (routeObj) {
            var Factory = React.createFactory(routeObj.view);

            unmountAll();
            ReactDom.render(Factory({ urlParams: this.getUrlParams(), urlPaths: this.getUrlPathParams(routeObj.vars, routeObj.path) }), applicationRootElement);
        }
        else {
            this.navigate('/');
        }
    }

    navigate (path) {
        window.history.pushState(null, null, path || '/');

        this.handleRoute();

    }

    getUrlPathParams (vars, path) {
        var pathParams = {};

        if (vars) {
            let values = window.location.pathname.match(path);

            values.shift();

            vars.forEach((item, i) => {
                pathParams[item] = values[i];
            });
        }

        return pathParams;
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

var router = new Router();

export default router;