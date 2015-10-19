import React from 'react';
import FileUploadView from '../widgets/file-upload/fileUploadView';
import PhotoCutterView from '../widgets/photo-cutter/photoCutterView';

class GeneralView extends React.Component {
    onSelectImage (files) {
        new PhotoCutterView({
            image: files[0]
        }).then(this.setBounds.bind(this));
    }

    setBounds (bounds) {
        this.refs.mainImageX.getDOMNode().value = bounds.x;
        this.refs.mainImageY.getDOMNode().value = bounds.y;
        this.refs.mainImageWidth.getDOMNode().value = bounds.width;
        this.refs.mainImageHeight.getDOMNode().value = bounds.height;
    }

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
                    <FileUploadView name="mainImage" onSelect={this.onSelectImage.bind(this)} />
                    <input type="hidden" name="mainImageX" ref="mainImageX" />
                    <input type="hidden" name="mainImageY" ref="mainImageY" />
                    <input type="hidden" name="mainImageWidth" ref="mainImageWidth" />
                    <input type="hidden" name="mainImageHeight" ref="mainImageHeight" />
                </div>
            </div>
        );
    }
}

export default GeneralView;