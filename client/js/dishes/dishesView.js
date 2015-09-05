import React from 'react';
import DishesModel from './dishesModel';
import DishItem from './dishItem';
import MainNavView from '../mainNav/mainNavView';

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
                if (i % 5) {
                    dish.mainImageUrl = 'http://www.tablespoon.com/-/media/Images/Articles/PostImages/2011/07/week3/2011-07-16-top-chef-party-competition-500w.jpg';
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
            <div className="dishes-view">
                <MainNavView />
                <ul className="dish-items">{this.state.dishesList}</ul>
            </div>
        );
    }
}

export default DishesView;