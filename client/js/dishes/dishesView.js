import React from 'react';
import DishesModel from './dishesModel';
import DishItem from './dishItem';

class DishesView extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            dishesList: null
        }
    }

    componentDidMount () {
        var dishesList = [];

        DishesModel.getDishes().then(function (dishes) {
            dishes.forEach((dish, i) => {
                if (i % 2) {
                    dish.mainImageUrl = 'http://www.pragueangkor.com/sites/default/files/imagecache/Stranky-Obsah/pages/obsah/kde-se-dobre-najist/best-dish-015.jpg';
                }
                dishesList.push(<DishItem dish={dish} />);
            });

            this.setState({
                dishesList: dishesList
            });

            this.forceUpdate();
        }.bind(this));
    }

    render () {
        return (
            <div>
                <ul className="dish-items">{this.state.dishesList}</ul>
            </div>
        );
    }
}

export default DishesView;