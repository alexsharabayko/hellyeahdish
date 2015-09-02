class RouterClass {
    constructor () {
        this.routes = {};
    }

    start () {
        if (!this.isStarted) {
            window.addEventListener('hashchange', this.routeHandler.bind(this));
            window.addEventListener('load', this.routeHandler.bind(this));

            this.isStarted = true;
        }
    }

    addRoutes (routes) {
        this.start();

        Object.keys(routes).forEach((key) => {
            this.routes[key] = routes[key]
        }, this);
    }

    doRoute (route) {
        if (typeof this.routes[route] === 'function') {
            this.routes[route].call(this);
        }
    }

    routeHandler () {
        this.doRoute(location.href.replace(location.origin + '/', ''));
    }
}

var Router = new RouterClass();

export default Router;