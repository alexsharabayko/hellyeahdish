import React from 'react';
import DishesCatalogModel from './dishesCatalogModel';
import DishesListView from './dishesListView';
import DishesAddPropsView from './dishesAddPropsView';
import DishesCategoriesView from './dishesCategoriesView';
import DishesViewOptionsView from './dishesViewOptionsView';
import DishesNavView from './dishesNavView';

class DishesCatalogView extends React.Component {
    render () {
        var params = {
            view: this.props.urlParams.view || 'grid',
            sort: this.props.urlParams.sort || 'name',
            preferenceId: this.props.urlParams.preferenceId,
            kitchenId: this.props.urlParams.kitchenId,
            categoryId: this.props.urlParams.categoryId
        };

        return (
            <div className="dishes-catalog">
                <DishesNavView />
                <DishesCategoriesView categoryId={params.categoryId} />

                <div className="dishes-catalog-area">
                    <DishesAddPropsView preferenceId={params.preferenceId} kitchenId={params.kitchenId} />

                    <div className="dishes-list-wrapper">
                        <DishesViewOptionsView view={params.view} sort={params.sort} />
                        <DishesListView params={params} />
                    </div>
                </div>
            </div>
        );
    }
}

export default DishesCatalogView;