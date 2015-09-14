var methodNames = ['get', 'post', 'put', 'delete'];

const apiPath = 'http://localhost:4000';

var Ajax = {
    xhr (url, methodName, data) {
        return new Promise((resolve, reject) => {
            var req = new XMLHttpRequest();

            req.open(methodName, apiPath + url);

            req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

            req.onload = function () {
                req.status === 200 ? resolve(req.response) : reject(req.response);
            };

            req.onerror = function () {
                reject(Error('Network error'));
            };

            data ? req.send(JSON.stringify(data)) : req.send();
        }).then((response) => {
                response.json = function () {
                    return JSON.parse(this);
                };

                return response;
            });
    },

    fetch (url, methodName, data) {
        return window.fetch(apiPath + url, {
            method: methodName,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
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
            debugger;
            return response.json();
        });
    };
});

export default Ajax;