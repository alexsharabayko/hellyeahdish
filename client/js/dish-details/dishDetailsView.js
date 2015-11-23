import React from 'react';
import DishDetailsModel from './dishDetailsModel';
import urlUtil from '../common/url-util/urlUtil';

class DishDetailsView extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            dish: {}
        };
    }

    componentDidMount () {
        DishDetailsModel.getDish(this.props.urlPaths.id).then((dish) => {
            this.setState({ dish });
        });
    }

    render () {
        var dish = this.state.dish;

        return (
            <div>
                <h1>{dish.name}</h1>
                <p>{dish.description}</p>

                <ul>
                    {
                        dish.ingredients &&  dish.ingredients.map((ingredient, i) => {
                            return (
                                <li>
                                    <span>{ingredient.name}</span>
                                    <span>{ingredient.quantity}</span>
                                </li>
                            );
                        })
                    }
                </ul>

                <ul>
                    {
                        dish.steps && dish.steps.map((step, i) => {
                            return (
                                <li>
                                    <span>{step.description}</span>
                                    <span>{step.startTime}</span>
                                    <img src={step.image && step.image.url} alt="ingredientImage"/>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default DishDetailsView;