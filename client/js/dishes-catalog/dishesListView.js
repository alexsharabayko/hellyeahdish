import React from 'react';
import DishesCatalogModel from './dishesCatalogModel';
import DishesViewOptionsView from './dishesViewOptionsView';

class DishesCatalogView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: null
        }
    }

    componentDidMount() {
        DishesCatalogModel.getDishes().then((data) => {
            var items = data.map((dish, i) => {
                //if (i % 5) {
                dish.mainImageUrl = 'http://www.tablespoon.com/-/media/Images/Articles/PostImages/2011/07/week3/2011-07-16-top-chef-party-competition-500w.jpg';
                //}

                return (
                    <li className="dishes-list-item" key={i}>
                        <img src={dish.mainImageUrl} alt={dish.name}/>

                        <div className="dl-image-hover">
                            <div className="inline-block">
                                <span className="dish-icon-name">{dish.name}</span>

                                <button className="smart-border-button">View dish</button>
                            </div>
                        </div>

                        <span className="level-label">83%</span>
                    </li>
                )
            });

            this.setState({items});

            this.forceUpdate();
        });
    }

    render() {
        return (
            <div className="dishes-list-wrapper">
                <DishesViewOptionsView />
                <ul className="dishes-list">{this.state.items}</ul>
            </div>
        );
    }
}

export default DishesCatalogView;