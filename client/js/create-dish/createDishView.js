import React from 'react';
import GeneralView from './generalView';
import IngredientsListView from './ingredientsListView';
import StepsListView from './stepsListView';
import CreateDishModel from './createDishModel';

class CreateDishView extends React.Component {
    handleSubmitForm (event) {
        event.preventDefault();

        CreateDishModel.createDish(event.target);
    }

    render () {
        return (
            <div className="create-dish-container">
                <form className="create-dish-form" onSubmit={this.handleSubmitForm.bind(this)}>
                    <GeneralView ref="general" />

                    <IngredientsListView ref="ingredientsList" />

                    <StepsListView ref="stepsList" />

                    <button>Create</button>
                </form>
            </div>
        );
    }
}

export default CreateDishView;