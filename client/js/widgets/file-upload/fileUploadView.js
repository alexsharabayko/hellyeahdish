import React from 'react';

class FileUploadView extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            fileName: 'Upload'
        };
    }

    handleFilesUpload (event) {
        this.setState({
            fileName: event.target.files[0].name
        });

        this.forceUpdate();

        this.props.onSelect && this.props.onSelect(event.target.files);
    }

    render () {
        var name = this.props.name || null;

        return (
            <div className="file-upload">
                <span>{this.state.fileName}</span>
                <input type="file" name={name}
                       onChange={this.handleFilesUpload.bind(this)}/>
            </div>
        );
    }
}

export default FileUploadView;