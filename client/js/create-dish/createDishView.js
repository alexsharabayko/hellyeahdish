import React from 'react';
import GeneralView from './generalView';
import IngredientsListView from './ingredientsListView';
import StepsListView from './stepsListView';
import CreateDishModel from './createDishModel';
import PopupView from '../common/popup/popupView';

class CreateDishView extends React.Component {
    handleSubmitForm (event) {
        event.preventDefault();

        CreateDishModel.createDish(event.target).then((response) => {
            new PopupView({
                bounds: {
                    center: true
                },
                data: {
                    title: 'Success!',
                    content: 'Congrats! You successfully created a new dish! You can continue to creating you own kitchen or see lists of dishes.'
                },
                onClose: function () {
                    this.refs.form.getDOMNode().reset();
                }.bind(this)
            });
        });
    }

    render () {
        return (
            <div className="create-dish-container">
                <form ref="form" className="create-dish-form" onSubmit={this.handleSubmitForm.bind(this)}>
                    <GeneralView ref="general" />

                    <IngredientsListView ref="ingredientsList" />

                    <StepsListView ref="stepsList" />

                    <button className="create-dish-button">Create</button>
                </form>
            </div>
        );
    }
}

export default CreateDishView;