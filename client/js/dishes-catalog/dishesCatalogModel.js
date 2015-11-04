import Ajax from '../common/ajax/ajax';

var props = null;

class DishesCatalogModel {
    static getDishes () {
        return Ajax.getJSON('/dishes' + window.location.search);
    }

    static getProperties () {
        if (props) {
            return new Promise((resolve) => {
                resolve(props);
            });
        }
        else {
            return Ajax.getJSON('/dish-properties').then((properties) => {
                props = properties;

                return properties;
            });
        }
    }
}

export default DishesCatalogModel;