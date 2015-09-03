import Ajax from '../common/ajax/ajax';

class DishesModel {
    static getDishes () {
        return Ajax.getJSON('/dishes');
    }
}

export default DishesModel;