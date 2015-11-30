import Ajax from '../common/ajax/ajax';

var props = null;

class CookingModel {
    static getDish (id) {
        return Ajax.getJSON('/dishes/' + id);
    }
}

export default CookingModel;