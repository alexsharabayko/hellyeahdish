import React from 'react';

class CreateDishView extends React.Component {
    render () {
        return (
            <div className="create-dish-container">
                <form className="create-dish-form">
                    <h3>General</h3>

                    <div className="create-dish-field">
                        <label className="create-dish-label">Enter name of the dish:</label>
                        <input className="create-dish-text" type="text"/>
                    </div>

                    <div className="create-dish-field">
                        <label className="create-dish-label">Enter short description of the dish:</label>
                        <textarea className="create-dish-textarea"></textarea>
                    </div>

                    <div className="create-dish-field">
                        <label className="create-dish-label">Total time (in minutes):</label>
                        <input className="create-dish-text" type="number" />
                    </div>

                    <ul className="create-dish-ingredients">
                        <h3>Ingredients</h3>

                        <li>
                            <div className="create-dish-field">
                                <label className="create-dish-label">Ingredient name:</label>
                                <input className="create-dish-text" type="text" />
                            </div>

                            <div className="create-dish-field">
                                <label className="create-dish-label">Ingredient quantity:</label>
                                <input className="create-dish-text" type="text" />
                            </div>
                        </li>
                        <li>
                            <div className="create-dish-field">
                                <label className="create-dish-label">Ingredient name:</label>
                                <input className="create-dish-text" type="text" />
                            </div>

                            <div className="create-dish-field">
                                <label className="create-dish-label">Ingredient quantity:</label>
                                <input className="create-dish-text" type="text" />
                            </div>
                        </li>
                        <li>
                            <div className="create-dish-field">
                                <label className="create-dish-label">Ingredient name:</label>
                                <input className="create-dish-text" type="text" />
                            </div>

                            <div className="create-dish-field">
                                <label className="create-dish-label">Ingredient quantity:</label>
                                <input className="create-dish-text" type="text" />
                            </div>
                        </li>
                    </ul>

                    <ul className="create-dish-steps">
                        <h3>Steps</h3>

                        <li>
                            <div className="create-dish-field">
                                <label className="create-dish-label">Step description:</label>
                                <textarea className="create-dish-textarea"></textarea>
                            </div>

                            <div className="create-dish-field">
                                <label className="create-dish-label">Step start time (in minutes):</label>
                                <input className="create-dish-text" type="number" />
                            </div>
                        </li>
                        <li>
                            <div className="create-dish-field">
                                <label className="create-dish-label">Step description:</label>
                                <textarea className="create-dish-textarea"></textarea>
                            </div>

                            <div className="create-dish-field">
                                <label className="create-dish-label">Step start time (in minutes):</label>
                                <input className="create-dish-text" type="number" />
                            </div>
                        </li>
                        <li>
                            <div className="create-dish-field">
                                <label className="create-dish-label">Step description:</label>
                                <textarea className="create-dish-textarea"></textarea>
                            </div>

                            <div className="create-dish-field">
                                <label className="create-dish-label">Step start time (in minutes):</label>
                                <input className="create-dish-text" type="number" />
                            </div>
                        </li>
                    </ul>
                </form>
            </div>
        );
    }
}

export default CreateDishView;