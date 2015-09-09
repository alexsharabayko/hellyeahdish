import React from 'react';
import DishesList from './dishesList';
import MainNavView from '../mainNav/mainNavView';
import DishesForm from './dishesForm';

class DishesView extends React.Component {
    render () {
        return (
            <div className="dishes-view">
                <MainNavView />
                <DishesForm />
                <DishesList />
            </div>
        );
    }
}

export default DishesView;