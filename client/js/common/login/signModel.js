import Ajax from '../ajax/ajax.js';

class SignModel {
    constructor (options) {
        console.log(Ajax);
    }

    login (data) {
        return Ajax.postJSON('/login', data);
    }
}

export default SignModel;