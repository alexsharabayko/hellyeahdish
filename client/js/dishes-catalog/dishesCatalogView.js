import React from 'react';
import DishesCatalogModel from './dishesCatalogModel';
import DishesListView from './dishesListView';
import DishesAddPropsView from './dishesAddPropsView';
import DishesCategoriesView from './dishesCategoriesView';
import DishesViewOptionsView from './dishesViewOptionsView';

class DishesCatalogView extends React.Component {
    render () {
        var params = {
            view: this.props.urlParams.view || 'grid'
        };

        return (
            <div className="dishes-catalog">
                <DishesCategoriesView />

                <div className="dishes-catalog-area">
                    <DishesAddPropsView />

                    <div className="dishes-list-wrapper">
                        <DishesViewOptionsView view={params.view} />
                        <DishesListView params={params} />
                    </div>
                </div>
            </div>
        );
    }
}

export default DishesCatalogView;