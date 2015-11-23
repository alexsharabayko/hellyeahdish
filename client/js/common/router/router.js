import React from 'react';
import ReactDom from 'react-dom';

import user from '../user/userModel';

import HomeView from '../../home/homeView';
import DishesCatalogView from '../../dishes-catalog/dishesCatalogView';
import CreateDishView from '../../create-dish/createDishView';
import DishDetailsView from '../../dish-details/dishDetailsView';

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
            '/': {
                view: HomeView
            },
            '/logout': {
                fn: function () {
                    new PopupView({
                        data: {
                            title: 'Logout',
                            content: 'Do you want to be logged out?'
                        },
                        buttons: [
                            {
                                text: 'Yes, I do',
                                onClick: function () {
                                    user.logout();
                                }
                            }
                        ]
                    });
                }
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
        user.on('loginSuccess', this.navigate.bind(this, '/dishes-catalog'));
        user.on('loginFail', this.navigate.bind(this, '/'));
        user.on('logout', this.navigate.bind(this, '/'));

        //window.addEventListener('load', () => {
        //    this.navigate(window.location.pathname);
        //});
    }

    handleRoute (view, paths) {
        var Factory = React.createFactory(view);

        unmountAll();
        ReactDom.render(Factory({ urlParams: this.getUrlParams(), urlPaths: paths }), applicationRootElement);
    }

    navigate (path) {
        var p = path.replace(/\?.*/, ''),
            routeObj = this.routes.filter(route => route.path.test(p))[0],
            paths = {};

        if (routeObj && routeObj.vars) {
            let values = path.match(routeObj.path);

            values.shift();

            routeObj.vars.forEach((item, i) => {
                paths[item] = values[i];
            });
        }

        if (routeObj && routeObj.fn) {
            routeObj.fn(paths);
        }
        else {
            routeObj = routeObj || this.routes.filter(item => item.route === '/')[0];

            window.history.pushState(null, null, path || '/');

            this.handleRoute(routeObj.view, paths);
        }
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