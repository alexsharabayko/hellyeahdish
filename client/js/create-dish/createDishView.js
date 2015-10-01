import React from 'react';
import GeneralView from './generalView';
import IngredientsListView from './ingredientsListView';
import StepsListView from './stepsListView';
import CreateDishModel from './createDishModel';

class CreateDishView extends React.Component {
    handleSubmitForm (event) {
        event.preventDefault();

        var data = this.refs.general.state;

        data.ingredients = this.refs.ingredientsList.getIngredients();
        data.steps = this.refs.stepsList.getSteps();

        CreateDishModel.createDish(data);
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