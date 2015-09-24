import Ajax from '../common/ajax/ajax';

class CreateDishModel {
    static createDish (form) {
        var formData = new FormData(form);

        //formData.append('name', data.name);
        //formData.append('description', data.description);
        //formData.append('totalTime', data.totalTime);
        //formData.append('mainImage', data.mainImage);

        //formData.append('allData', data);

        Ajax.postJSON('/dishes', formData);
    }
}

export default CreateDishModel;