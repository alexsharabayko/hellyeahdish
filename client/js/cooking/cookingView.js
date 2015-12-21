import React from 'react';
import CookingModel from './cookingModel';
import urlUtil from '../common/url-util/urlUtil';

class CookingView extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            dish: {},
            aside: {
                isNav: false,
                isIngredients: false
            },
            currentTime: 0,
            currentStep: 0,
            timeToNextStep: 0,
            colors: ['#C63D0F', '#7E8F7C', '#005A31', '#DE1B1B', '#7D1935', '#4A96AD', '#118C4E', '#DF3D82', '#6DBDD6', '#CBE32D']
        };
    }

    componentDidMount () {
        CookingModel.getDish(this.props.urlPaths.id).then((dish) => {
            var state = this.state;

            dish.steps.forEach((step, i) => {
                step.index = i;
                step.startTime = i * 3;
                step.style = { backgroundColor: this.state.colors[parseInt(Math.random() * this.state.colors.length)] };
            });

            state.dish = dish;

            this.initTimerData(state);

            this.setState(state);
        });
    }

    initTimerData (nextState) {
        var currentStep = nextState.dish.steps.reduce((step1, step2) => {
            return step2.startTime <= nextState.currentTime ? step2 : step1;
        }, this);

        var nextStep = nextState.dish.steps[currentStep.index + 1];

        if (nextStep) {
            nextState.timeToNextStep = nextStep.startTime - nextState.currentTime;
        }

        nextState.currentStep = currentStep;
    }

    toggleAside (event) {
        var state = this.state,
            target = event.currentTarget;

        if (target === this.refs.steps) {
            state.aside = {
                isNav: false,
                isIngredients: false
            }
        }
        else {
            state.aside[target.dataset.aside] = true;
        }

        this.setState(state);
    }

    render () {
        var state = this.state,
            aside = state.aside,
            dish = state.dish,
            ingredientsClassName = `cooking-ingredients ${aside.isIngredients ? 'active' : ''}`,
            navClassName = `cooking-nav ${aside.isNav ? 'active' : ''}`,
            stepsClassName = `cooking-steps ${(aside.isNav || aside.isIngredients) ? 'aside-opened' : ''}`,
            buttonsClassName = `cooking-buttons-aside ${(aside.isNav || aside.isIngredients) ? 'hidden' : ''}`;

        return (
            <div className="cooking">
                <div className="cooking-logo">
                    <img src="/img/cook-hat.png" alt="logo"/>
                    <span>{dish.name}</span>
                </div>

                <ul className={buttonsClassName} ref="aside">
                    <li onClick={this.toggleAside.bind(this)} data-aside="isIngredients" className="cooking-ing-button">
                        <i className="fa fa-cutlery"></i>
                    </li>
                    <li onClick={this.toggleAside.bind(this)} data-aside="isNav" className="cooking-hamburger">
                        <i className="fa fa-bars"></i>
                    </li>
                </ul>

                <div className={ingredientsClassName} ref="ingredients">
                    <ul className="cell">
                        <h2>Ingredients:</h2>

                        {
                            dish.ingredients && dish.ingredients.map((ingredient, i) => {
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

                <ul className={navClassName} ref="nav">
                    <li>Hello</li>
                    <li>Hello</li>
                    <li>Hello</li>
                    <li>Hello</li>
                </ul>

                <ul className={stepsClassName} ref="steps" onClick={this.toggleAside.bind(this)}>
                    {
                        dish.steps &&  dish.steps.map((step, i) => {
                            var button = step.startTime === state.currentTime ? <button>Start next step</button> : null,
                                className = step === state.currentStep ? 'active' : '';

                            return (
                                <li className={className} key={i} style={step.style}>
                                    <div className="cell">
                                        <p className="description">
                                            {step.description}
                                        </p>
                                        {button}
                                    </div>
                                </li>
                            );
                        })
                    }

                    <div className="cooking-timer">
                        <span className="text">Next step need to be started from: </span>
                        <span className="clock">{state && state.timeToNextStep} </span>
                        <span className="text">min</span>
                    </div>
                </ul>
            </div>
        );
    }
}

export default CookingView;