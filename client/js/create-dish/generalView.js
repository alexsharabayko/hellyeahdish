import React from 'react';
import FileUploadView from '../common/file-upload/fileUploadView';

class GeneralView extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            name: null,
            description: null,
            totalTime: null,
            mainImage: null
        };
    }

    handleChange () {
        this.setState((prevState) => {
            prevState.name = this.refs.name.getDOMNode().value;
            prevState.description = this.refs.description.getDOMNode().value;
            prevState.totalTime = this.refs.totalTime.getDOMNode().value;

            return prevState;
        });
    }

    handleImageUpload (images) {
        this.setState((prevState) => {
            prevState.mainImage = images.item(0);

            return prevState;
        });
    }

    render () {
        return (
            <div onChange={this.handleChange.bind(this)} className="create-dish-general">
                <h3>General</h3>

                <div className="create-dish-field">
                    <label className="create-dish-label">Enter name of the dish:</label>
                    <input name="name" className="create-dish-text" type="text" required/>
                </div>

                <div className="create-dish-field">
                    <label className="create-dish-label">Enter short description of the dish:</label>
                    <textarea name="description" className="create-dish-textarea" required></textarea>
                </div>

                <div className="create-dish-field left-column">
                    <label className="create-dish-label">Total time (in minutes):</label>
                    <input name="totalTime" className="create-dish-text" type="number" required/>
                </div>

                <div className="create-dish-field right-column">
                    <label className="create-dish-label">Main dish image:</label>
                    <FileUploadView name="mainImage" />
                </div>
            </div>
        );
    }
}

export default GeneralView;