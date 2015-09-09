import React from 'react';

class DishesForm extends React.Component {
    render () {
        return (
            <form className="dishes-form">

                <div className="dishes-form-select">
                    <select>
                        <option value="1">Select 1</option>
                        <option value="2">Select 2</option>
                        <option value="3">Select 3</option>
                        <option value="4">Select 4</option>
                        <option value="5">Select 5</option>
                        <option value="6">Select 6</option>
                    </select>
                </div>

                <div className="dishes-form-select">
                    <select>
                        <option value="1">Select 1</option>
                        <option value="2">Select 2</option>
                        <option value="3">Select 3</option>
                        <option value="4">Select 4</option>
                        <option value="5">Select 5</option>
                        <option value="6">Select 6</option>
                    </select>
                </div>
                
                <div>
                    <input type="radio" name="sex" value="1"/>One
                    <input type="radio" name="sex" value="2"/>Two
                </div>
            </form>
        );
    }
}

export default DishesForm;