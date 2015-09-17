import React from 'react';
import DishesCatalogModel from './dishesCatalogModel';
import DishesListView from './dishesListView';
import DishesAddPropsView from './dishesAddPropsView';

class DishesCatalogView extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            categories: null,
            kitchens: null,
            preferences: null
        }
    }

    componentDidMount () {
        DishesCatalogModel.getProperties().then((data) => {
            var categories = data.categories.map((category, i) => {
                return (
                    <li key={i}>
                        <img src={category.url} alt={category.name}/>
                        <div className="hover-text">
                            <a className="cell" href="javascript:void(0)">{category.name}</a>
                        </div>
                    </li>
                )
            });

            var preferences = data.preferences.map((preference) => {
                return (
                    <li>{preference.name}</li>
                );
            });

            var kitchens = data.kitchens.map((kitchen) => {
                return (
                    <li>{kitchen.name}</li>
                );
            });

            this.setState({categories, kitchens, preferences});

            this.forceUpdate();
        });
    }

    scrollDishesCategories (event) {
        event.preventDefault();

        event.currentTarget.scrollLeft -= event.nativeEvent.wheelDelta;
    }

    render () {
        return (
            <div className="dishes-catalog">
                <ul className="dishes-categories-list" onWheel={this.scrollDishesCategories}>{this.state.categories}</ul>

                <div className="dishes-catalog-area">
                    <DishesAddPropsView />

                    <DishesListView />
                </div>
            </div>
        );
    }
}

export default DishesCatalogView;