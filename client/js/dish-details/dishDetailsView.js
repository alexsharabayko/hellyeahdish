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
            console.log(dish);
            this.setState({ dish });
        });
    }

    renderStars (raiting, count) {
        var stars = [];

        for (let i = 0; i < count; i++) {
            let className = 'fa ',
                min = i * count,
                max = min + count;

            if (min < raiting && max <= raiting) {
                className += 'fa-star';
            }
            else if (min >= raiting && max > raiting) {
                className += 'fa-star-o';
            }
            else {
                className += 'fa-star-half-o';
            }

            stars.push(<i className={className} key={i}></i>)
        }

        return stars;
    }

    render () {
        var dish = this.state.dish,
            fullName = null;

        if (dish.author) {
            fullName = `${dish.author.firstName} ${dish.author.lastName} (${dish.author.username})`;
        }

        return (
            <div className="dish-details">
                <div className="dish-details-page">
                    <div className="dish-details-header">
                        <img className="dish-details-main-image" src={dish.mainImage && dish.mainImage.url} alt={dish.name}/>

                        <div className="dish-details-header-text vertical-center">
                            <div className="content">
                                <h1>{dish.name}</h1>
                            </div>
                        </div>

                        <ul className="dish-details-quantity">Quality: {this.renderStars(50 + Math.random() * 50, 10)}</ul>

                        <div className="dish-details-author">Author: {fullName}</div>
                    </div>

                    <div className="dish-details-ing-wrapper">
                        <ul className="dish-details-ingredients">
                            <h2>Ingredients:</h2>

                            {
                                dish.ingredients &&  dish.ingredients.map((ingredient, i) => {
                                    return (
                                        <li key={i}>
                                            <span className="name">{ingredient.name}</span>
                                            <span className="quantity">{ingredient.quantity}</span>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>

                    <ul className="dish-details-steps">
                        <h2>How to cook:</h2>

                        {
                            dish.steps &&  dish.steps.map((step, i) => {
                                return (
                                    <li key={i}>
                                        <div className="content">
                                            {
                                                step.image && <img className="img" src={step.image.url} alt="step"/>
                                            }

                                            {step.description}
                                        </div>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default DishDetailsView;