import React from 'react';
import DishesCatalogModel from './dishesCatalogModel';

class DishesCatalogView extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            kitchens: null,
            preferences: null
        }
    }

    getList (data) {
        return data.map((item) => {
            return (
                <li><i className="fa fa-angle-right"></i>{item.name}</li>
            );
        });
    }

    componentDidMount () {
        DishesCatalogModel.getProperties().then((data) => {
            this.setState({
                kitchens: this.getList(data.kitchens),
                preferences: this.getList(data.preferences)
            });

            this.forceUpdate();
        });
    }

    render() {
        return (
            <div className="dishes-add-props">
                <ul className="dishes-add-list">
                    <h4>Kitchens</h4>
                    {this.state.kitchens}
                </ul>

                <ul className="dishes-add-list">
                    <h4>Preferences</h4>
                    {this.state.preferences}
                </ul>
            </div>
        );
    }
}

export default DishesCatalogView;