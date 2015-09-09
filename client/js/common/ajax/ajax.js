var methodNames = ['get', 'post', 'put', 'delete'];

const apiPath = 'http://localhost:4000';

var Ajax = {
    send (url, methodName, data) {
        return fetch(apiPath + url, {
            method: methodName,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
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