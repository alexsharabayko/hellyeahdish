var methodNames = ['get', 'post', 'put', 'delete'];

const apiPath = 'http://localhost:4000';

var Ajax = {
    send (url, methodName, data) {
        return new Promise(function (resolve, reject) {
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
        });
    }
};

methodNames.forEach((methodName) => {
    Ajax[methodName] = function (url, data) {
        return Ajax.send(url, methodName.toUpperCase(), data);
    };

    Ajax[methodName + 'JSON'] = function (url, data) {
        return Ajax[methodName](url, data).then(JSON.parse);
    };
});

export default Ajax;