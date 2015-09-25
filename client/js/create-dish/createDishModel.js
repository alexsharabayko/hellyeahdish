import Ajax from '../common/ajax/ajax';
import user from '../common/user/userModel';

class CreateDishModel {
    static createDish (form) {
        var formData = new FormData(form);

        formData.append('userToken', user.data.token);

        Ajax.postJSON('/dishes', formData);
    }
}

export default CreateDishModel;