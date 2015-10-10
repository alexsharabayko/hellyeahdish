import React from 'react/addons';
import uid from 'uid';

class IngredientsItemView extends React.Component {
    render () {
        return (
            <li>
                <h4>Ingredient {this.props.i + 1}:</h4>

                <a className="create-dish-remove-item" href="javascript:void(0)" onClick={this.props.onRemove}>
                    <i className="fa fa-remove"></i>
                </a>

                <div className="create-dish-field left-column">
                    <label className="create-dish-label">Name:</label>
                    <input className="create-dish-text" type="text" name="ingredientsNames" required />
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
        this.setState({
            ingredients: React.addons.update(this.state.ingredients, { $push: [{ name: null, quantity: null, id: uid(10) }] })
        });
    }

    removeElement (i) {
        this.setState({
            ingredients: React.addons.update(this.state.ingredients, {$splice: [[i, 1]]})
        })
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