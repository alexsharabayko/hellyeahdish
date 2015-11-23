import React from 'react';

import DishesCatalogModel from './dishesCatalogModel';
import DishesListView from './dishesListView';
import DishesAddPropsView from './dishesAddPropsView';
import urlUtil from '../common/url-util/urlUtil';

class DishesCategoriesView extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            categories: []
        }
    }

    componentDidMount () {
        DishesCatalogModel.getProperties().then((data) => {
            this.setState({
                categories: React.addons.update(this.state.categories, { $push: data.categories })
            });
        });


    }

    scrollDishesCategories (event) {
        event.preventDefault();

        event.currentTarget.scrollLeft -= event.nativeEvent.wheelDelta;
    }

    renderWithoutId () {
        return (
            <ul className="dishes-categories-list" onWheel={this.scrollDishesCategories}>
                {this.state.categories.map((category, i) => {
                    return (
                        <li key={i}>
                            <img src={category.url} alt={category.name}/>
                            <div className="hover-text">
                                <a className="cell" href={urlUtil.createRelativeUrl({ categoryId: category._id })}>{category.name}</a>
                            </div>
                        </li>
                    )
                })}
            </ul>
        );
    }

    renderWithId () {
        return (
            <img src="http://res.cloudinary.com/dz6xtu1hj/image/upload/v1442224437/categories/Beverage.jpg"
                 alt="hello" />
        );
    }

    render () {
        return (
            <div>
                {this.props.categoryId && <img src="http://res.cloudinary.com/dz6xtu1hj/image/upload/v1442224437/categories/Beverage.jpg"
                                               alt="hello" />}

                <ul className="dishes-categories-list" onWheel={this.scrollDishesCategories}>
                    {this.state.categories.map((category, i) => {
                        return (
                            <li key={i}>
                                <img src={category.url} alt={category.name}/>
                                <div className="hover-text">
                                    <a className="cell" href={urlUtil.createRelativeUrl({ categoryId: category._id })}>{category.name}</a>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

export default DishesCategoriesView;