import React from 'react';
import FileUploadView from '../common/file-upload/fileUploadView';

class StepsItemView extends React.Component {
    constructor (props) {
        super(props);

        this.state = props.step;
    }

    handleChange () {
        this.setState((prevState) => {
            prevState.description = this.refs.description.getDOMNode().value;
            prevState.startTime = this.refs.startTime.getDOMNode().value;

            this.props.onChange(prevState);

            return prevState;
        });
    }

    handleImagesUpload (files) {
        this.setState((prevState) => {
            prevState.image = event.target.files[0];

            this.props.onChange(prevState);

            return prevState;
        });
    }

    render () {
        return (
            <li onChange={this.handleChange.bind(this)}>
                <div className="create-dish-field">
                    <label className="create-dish-label">Step description:</label>
                    <textarea ref="description" className="create-dish-textarea"></textarea>
                </div>

                <div className="create-dish-field left-column">
                    <label className="create-dish-label">Step start time (in minutes):</label>
                    <input ref="startTime" className="create-dish-text" type="number" />
                </div>

                <div className="create-dish-field right-column">
                    <label className="create-dish-label">Step image:</label>
                    <FileUploadView onChange={this.handleImagesUpload.bind(this)} />
                </div>
            </li>
        );
    }
}

class StepsListView extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            steps: [
                {
                    description: null,
                    startTime: null,
                    image: null
                }
            ]
        };
    }

    renderItems () {
        return this.state.steps.map((step, i) => {
            return <StepsItemView step={step} key={i} onChange={this.handleItemChange.bind(this, i)} />;
        });
    }

    handleItemChange (i, step) {
        this.setState((prevState) => {
            var steps = prevState.steps;

            steps[i] = step;

            if (steps.every(step => step.description && step.startTime)) {
                steps.push({ description: null, startTime: null });
            }
            else if (steps.some(step => step.description === '' || step.startTime === '')) {
                steps = steps.filter(step => step.description || step.startTime);
            }

            prevState.steps = steps;

            return prevState;
        });
    }

    getSteps () {
        return this.state.steps.filter(step => step.description);
    }

    render () {
        return (
            <ul className="create-dish-steps">
                <h3>Steps</h3>

                {this.renderItems()}
            </ul>
        );
    }
}

export default StepsListView;