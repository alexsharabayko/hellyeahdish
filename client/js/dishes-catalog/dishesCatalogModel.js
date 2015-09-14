import Ajax from '../common/ajax/ajax';

class DishesModel {
    static getDishes () {
        return Ajax.getJSON('/dishes');
    }

    static getProperties () {
        return Ajax.getJSON('/dish-properties');
    }
}

export default DishesModel;