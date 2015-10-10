import React from 'react';
import FileUploadView from '../common/file-upload/fileUploadView';
import uid from 'uid';

class StepsItemView extends React.Component {
    render () {
        return (
            <li>
                <h4>Step {this.props.i + 1}:</h4>

                <a className="create-dish-remove-item" href="javascript:void(0)" onClick={this.props.onRemove}>
                    <i className="fa fa-remove"></i>
                </a>

                <div className="create-dish-field">
                    <label className="create-dish-label">Description:</label>
                    <textarea className="create-dish-textarea" name="stepsDescriptions" requred></textarea>
                </div>

                <div className="create-dish-field left-column">
                    <label className="create-dish-label">Start time (in minutes):</label>
                    <input className="create-dish-text" type="number" name="stepsStartTimes" required />
                </div>

                <div className="create-dish-field right-column">
                    <label className="create-dish-label">Image:</label>
                    <FileUploadView name="stepsImages" />
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
                    image: null,
                    id: uid(10)
                }
            ]
        };
    }

    renderItems () {
        return this.state.steps.map((step, i) => {
            return <StepsItemView step={step} key={i} onChange={this.handleItemChange.bind(this, i)} />;
        });
    }

    pushElement () {
        this.setState({
            steps: React.addons.update(this.state.steps, { $push: [{
                description: null,
                startTime: null,
                image: null,
                id: uid(10)
            }] })
        });
    }

    removeElement (i) {
        this.setState({
            steps: React.addons.update(this.state.steps, {$splice: [[i, 1]]})
        })
    }

    render () {
        return (
            <ul className="create-dish-steps">
                <h3>Steps <button type="button" onClick={this.pushElement.bind(this)}>Add new</button></h3>

                {this.state.steps.map((step, i) => {
                    return <StepsItemView
                        onRemove={this.removeElement.bind(this, i)}
                        ingredient={step}
                        key={step.id}
                        i={i} />;
                })}
            </ul>
        );
    }
}

export default StepsListView;