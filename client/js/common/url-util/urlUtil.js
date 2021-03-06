class UrlUtil {
    constructor () {
        this.routes = {
            dishesCatalog: '/dishes-catalog',
            createDish: '/create-dish',
            dishDetails: '/dish-details',
            cooking: '/cooking',
            home: '/',
            logout: '/logout',
            mySettings: '/my-settings'
        };
    }

    createRelativeUrl (params, path) {
        var obj = this.getUrlParams();

        params = typeof params === 'string' ? this.getUrlParams(params) : params;

        Object.keys(params).forEach((key) => {
            if (params[key] !== null) {
                obj[key] = params[key];
            }
            else {
                delete obj[key];
            }
        });

        return (path || window.location.pathname) + this.createUrlParamsFromObject(obj);
    }

    createUrlParamsFromObject (obj) {
        var s = '?';

        Object.keys(obj).forEach((key) => {
            s += `${key}=${obj[key]}&`;
        });

        return s.substring(0, s.length - 1);
    }

    getUrlParams (path) {
        path = path || window.location.search;

        var paramsStrings = path ? path.slice(1).split('&') : [],
            o = {};

        paramsStrings.forEach((str) => {
            var arr = str.split('=');

            o[arr[0]] = arr[1];
        });

        return o;
    }
}

var util = new UrlUtil();

export default util;