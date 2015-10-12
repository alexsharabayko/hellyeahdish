import Ajax from '../common/ajax/ajax';
import user from '../common/user/userModel';

var products;

class CreateDishModel {
    static createDish (form) {
        var formData = new FormData(form);

        formData.append('userToken', user.data.token);

        return Ajax.postJSON('/dishes', formData);
    }

    static getProducts () {
        if (products) {
            return new Promise((resolve) => {
                resolve(products);
            });
        }
        else {
            return Ajax.getJSON('/products').then((properties) => {
                products = properties;

                return properties;
            });
        }
    }
}

export default CreateDishModel;