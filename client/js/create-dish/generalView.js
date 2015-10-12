import React from 'react';
import FileUploadView from '../widgets/file-upload/fileUploadView';

class GeneralView extends React.Component {
    render () {
        return (
            <div className="create-dish-general">
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