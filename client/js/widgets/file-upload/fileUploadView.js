import React from 'react';

class FileUploadView extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            files: []
        };
    }

    handleFilesUpload (event) {
        var files = event.target.files;

        this.setState((prevState) => {
            prevState.files = files;

            return prevState;
        });

        typeof this.props.onChange === 'function' && this.props.onChange(files);
    }

    render () {
        var name = this.props.name || null;

        return (
            <div className="file-upload">
                <span>Upload</span>
                <input type="file" onChange={this.handleFilesUpload.bind(this)} name={name}/>
            </div>
        );
    }
}

export default FileUploadView;