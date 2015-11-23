import Ajax from '../common/ajax/ajax';

var props = null;

class DishDetailsModel {
    static getDish (id) {
        return Ajax.getJSON('/dishes/' + id);
    }
}

export default DishDetailsModel;