import Ajax from '../ajax/ajax.js';

class SignModel {
    login (data) {
        return Ajax.postJSON('/login', data);
    }
}

export default SignModel;