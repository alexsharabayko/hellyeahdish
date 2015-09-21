import React from 'react';
import DishesCatalogModel from './dishesCatalogModel';
import DishesListView from './dishesListView';
import DishesAddPropsView from './dishesAddPropsView';
import DishesCategoriesView from './dishesCategoriesView';

class DishesCatalogView extends React.Component {
    render () {
        return (
            <div className="dishes-catalog">
                <DishesCategoriesView />

                <div className="dishes-catalog-area">
                    <DishesAddPropsView />

                    <DishesListView />
                </div>
            </div>
        );
    }
}

export default DishesCatalogView;