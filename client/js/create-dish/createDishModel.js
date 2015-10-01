import Ajax from '../common/ajax/ajax';
import user from '../common/user/userModel';

var serializeToFormData = function (data) {
    var formData = new FormData();

    formData.append('userToken', user.data.token);

    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('totalTime', data.totalTime);
    formData.append('mainImage', data.mainImage || new Blob());

    data.ingredients.forEach((ingredient) => {
        formData.append('ingredientsNames', ingredient.name);
        formData.append('ingredientsQuantities', ingredient.quantity);
    });

    data.steps.forEach((step, i) => {
        formData.append('stepsDescriptions', step.description);
        formData.append('stepsStartTimes', step.startTime);
        formData.append('stepsImages', step.image || new Blob());
    });

    return formData;
};

class CreateDishModel {
    static createDish (data) {
        Ajax.postJSON('/dishes', serializeToFormData(data));
    }
}

export default CreateDishModel;