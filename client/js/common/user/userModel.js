import EventEmitter from '../event-emitter/eventEmitter';
import Ajax from '../ajax/ajax.js';

class User extends EventEmitter {
    removeData() {
        this.data = {};
        this.data.isLogin = false;

        localStorage.removeItem('userToken');
    }

    saveData(data) {
        this.data = {};

        localStorage.setItem('userToken', data.token);

        Object.keys(data).forEach((key) => {
            this.data[key] = data[key];
        });

        this.data.isLogin = true;
    }

    login(data) {
        return Ajax.postJSON('/login', data)
            .then(this.loginSuccess.bind(this)).catch(this.loginFail.bind(this));
    }

    loginByToken () {
        var token = localStorage.getItem('userToken');

        if (!token) {
            return this.loginFail(null);
        }

        return Ajax.postJSON('/loginByToken', { token: token })
            .then(this.loginSuccess.bind(this)).catch(this.loginFail.bind(this));
    }

    loginSuccess (data) {
        this.saveData(data);

        this.trigger('loginSuccess');

        return data;
    }

    loginFail (data) {
        this.removeData();

        this.trigger('loginFail');

        return data;
    }
}

var user = new User();

export default user;