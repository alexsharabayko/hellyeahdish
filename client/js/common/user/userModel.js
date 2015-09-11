import EventEmitter from '../event-emitter/eventEmitter';
import Ajax from '../ajax/ajax.js';

class User extends EventEmitter {
    constructor () {
        super();

        this.isLogin = false;
        this.id = Math.random() * 1000000000;
    }

    login (data) {
        return Ajax.postJSON('/login', data).then((data) => {
            this.isLogin = true;

            this.trigger('loginSuccess');

            return data;
        });
    }
}

var user = new User();

export default user;