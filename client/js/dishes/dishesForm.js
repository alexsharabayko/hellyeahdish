import React from 'react';
import DishesModel from './dishesModel';

class DishesForm extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            categories: null,
            kitchens: null,
            preferences: null
        }
    }

    initOptions (items) {
        var data = [];

        items.forEach((item) => {
            data.push(<option value={item._id}>{item.name}</option>);
        });

        return data;
    }

    componentDidMount () {
        var categories = [],
            kitchens = [],
            preferences = [];

        DishesModel.getCategories().then((data) => {
            this.setState({
                categories: this.initOptions(data.categories),
                kitchens: this.initOptions(data.kitchens),
                preferences: this.initOptions(data.preferences)
            });

            this.forceUpdate();
        });
    }

    selectChangeHandler (event) {
        debugger;
    }

    render () {
        return (
            <form className="dishes-form">

                <span className="dishes-form-label">Filter:</span>

                <div className="dishes-form-select">
                    <select data-filter="category" onChange={this.selectChangeHandler}>{this.state.categories}</select>
                </div>

                <div className="dishes-form-select">
                    <select data-filter="kitchen" onChange={this.selectChangeHandler}>{this.state.kitchens}</select>
                </div>

                <div className="dishes-form-select">
                    <select data-filter="preference" onChange={this.selectChangeHandler}>{this.state.preferences}</select>
                </div>

                <span className="dishes-form-label">Order:</span>

                <div className="dishes-form-select">
                    <select>
                        <option value="1">Date</option>
                        <option value="2">Rating</option>
                    </select>
                </div>
            </form>
        );
    }
}

export default DishesForm;