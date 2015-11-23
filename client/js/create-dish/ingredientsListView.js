import React from 'react';
import Addons from 'react-addons';
import uid from 'uid';

import CreateDishModel from './createDishModel';
import InputPromptView from '../widgets/input-prompt/inputPromptView';

class IngredientsItemView extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            categoriesElement: null
        }
    }

    componentDidMount () {
        CreateDishModel.getProducts().then((products) => {
            var names = products.map((product) => {
                return product.name;
            });

            this.setState({
                categoriesElement: <InputPromptView name="ingredientsNames" className="create-dish-text"
                    data={names} />
            });
        });
    }

    render () {
        return (
            <li>
                <h4>Ingredient {this.props.i + 1}:</h4>

                <a className="create-dish-remove-item" href="javascript:void(0)" onClick={this.props.onRemove}>
                    <i className="fa fa-remove"></i>
                </a>

                <div className="create-dish-field left-column">
                    <label className="create-dish-label">Name:</label>
                    {this.state.categoriesElement}
                </div>

                <div className="create-dish-field right-column">
                    <label className="create-dish-label">Quantity:</label>
                    <input className="create-dish-text" type="text" name="ingredientsQuantities" required />
                </div>
            </li>
        )
    }
}

class IngredientsListView extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            ingredients: [
                {
                    name: null,
                    quantity: null,
                    id: uid(10)
                }
            ]
        };
    }

    pushElement () {
        this.setState((prevState) => {
            prevState.ingredients = Addons.update(this.state.ingredients, { $push: [{
                name: null,
                quantity: null,
                id: uid(10)
            }] });

            return prevState;
        });
    }

    removeElement (i) {
        this.setState((prevState) => {
            prevState.ingredients = Addons.update(this.state.ingredients, {$splice: [[i, 1]]});

            return prevState;
        });
    }

    render () {
        return (
            <ul className="create-dish-ingredients">
                <h3>Ingredients <button type="button" onClick={this.pushElement.bind(this)}>Add new</button></h3>

                {this.state.ingredients.map((ingredient, i) => {
                    return <IngredientsItemView
                        onRemove={this.removeElement.bind(this, i)}
                        ingredient={ingredient}
                        key={ingredient.id}
                        i={i}/>;
                })}
            </ul>
        );
    }
}

export default IngredientsListView;