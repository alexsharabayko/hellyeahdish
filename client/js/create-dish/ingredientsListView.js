import React from 'react';

class IngredientsItemView extends React.Component {
    handleChange () {
        var ingredient = {
            name: this.refs.name.getDOMNode().value,
            quantity: this.refs.quantity.getDOMNode().value
        };

        this.props.onChange(ingredient);
    }

    render () {
        return (
            <li onChange={this.handleChange.bind(this)}>
                <div className="create-dish-field left-column">
                    <label className="create-dish-label">Ingredient name:</label>
                    <input className="create-dish-text" type="text" ref="name" name="ingredientsNames" />
                </div>

                <div className="create-dish-field right-column">
                    <label className="create-dish-label">Ingredient quantity:</label>
                    <input className="create-dish-text" type="text" ref="quantity" name="ingredientsQuantities" />
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
                    quantity: null
                }
            ]
        };
    }

    renderItems () {
        return this.state.ingredients.map((ingredient, i) => {
            return <IngredientsItemView onChange={this.handleItemChange.bind(this, i)} ingredient={ingredient} key={i} />;
        });
    }

    handleItemChange (i, ingredient) {
        this.setState((prevState) => {
            var ingredients = prevState.ingredients;

            ingredients[i] = ingredient;

            if (ingredients.every(ingredient => ingredient.name && ingredient.quantity)) {
                ingredients.push({ name: null, quantity: null });
            }
            else if (ingredients.some(ingredient => ingredient.name === '' || ingredient.quantity === '')) {
                ingredients = ingredients.filter(ingredient => ingredient.name || ingredient.quantity);
            }

            prevState.ingredients = ingredients;

            return prevState;
        });
    }

    getIngredients () {
        return this.state.ingredients.filter((ingredient) => {
            return ingredient.name;
        });
    }

    render () {
        return (
            <ul className="create-dish-ingredients">
                <h3>Ingredients</h3>

                {this.renderItems()}
            </ul>
        );
    }
}

export default IngredientsListView;