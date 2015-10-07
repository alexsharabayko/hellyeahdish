require('../../lib/fetch-polyfill');

var methodNames = ['get', 'post', 'put', 'delete'];

const apiPath = 'http://localhost:4000';

var Ajax = {
    fetch (url, method, data) {
        var headers = {},
            body = data;

        if (!(data instanceof FormData)) {
            headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };
            body = JSON.stringify(data);
        }

        return window.fetch(apiPath + url, {method, headers, body});
    },

    send (url, methodName, data) {
        return window.fetch ? this.fetch(url, methodName, data) : this.xhr(url, methodName, data);
    }
};

methodNames.forEach((methodName) => {
    Ajax[methodName] = function (url, data) {
        return Ajax.send(url, methodName.toUpperCase(), data);
    };

    Ajax[methodName + 'JSON'] = function (url, data) {
        return Ajax[methodName](url, data).then(function (response) {
            return response.json();
        });
    };
});

export default Ajax;