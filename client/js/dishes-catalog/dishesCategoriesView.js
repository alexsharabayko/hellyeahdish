import React from 'react';
import DishesCatalogModel from './dishesCatalogModel';
import DishesListView from './dishesListView';
import DishesAddPropsView from './dishesAddPropsView';

class DishesCategoriesView extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            categories: null
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

            this.setState({categories});

            this.forceUpdate();
        });
    }

    scrollDishesCategories (event) {
        event.preventDefault();

        event.currentTarget.scrollLeft -= event.nativeEvent.wheelDelta;
    }

    render () {
        return (
            <ul className="dishes-categories-list" onWheel={this.scrollDishesCategories}>{this.state.categories}</ul>
        );
    }
}

export default DishesCategoriesView;