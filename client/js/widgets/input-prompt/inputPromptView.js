import React from 'react';

class InputPromptView extends React.Component {
    constructor (props) {
        super(props);

        props.data.sort();

        this.state = {
            prompts: [],
            activePrompt: null
        };
    }

    showPrompts (event) {
        var criteria = event.target.value,
            prompts = criteria ? this.props.data.filter((item, i) => {
                return item.indexOf(criteria.toLowerCase()) === 0;
            }).slice(0, 5) : [];

        this.setState((prevState) => {
            prevState.prompts = prompts;

            return prevState;
        });
    }

    hidePrompts () {
        this.setState((prevState) => {
            prevState.prompts = [];

            return prevState;
        });
    }

    navigateToPrompts (event) {
        if (event.key === 'ArrowDown') {
            event.preventDefault();

            this.setState((prevState) => {
                var activePrompt = prevState.activePrompt === null ? 0 : prevState.activePrompt + 1;

                prevState.activePrompt = activePrompt;

                return prevState;
            });
        }
        if (event.key === 'ArrowUp') {
            event.preventDefault();

            this.setState((prevState) => {
                var activePrompt = prevState.activePrompt - 1;

                prevState.activePrompt = activePrompt;

                return prevState;
            });
        }
    }

    setValue (event) {
        this.refs.input.getDOMNode().value = event.target.innerText;
    }

    setActiveItem (event) {
        this.setState((prevState) => {
            prevState.activePrompt = parseInt(event.target.dataset.index, 10);

            return prevState;
        });
    }

    renderItems () {
        return this.state.prompts.map((prompt, i) => {
            var className = i === this.state.activePrompt ? 'active' : null;

            return <li key={i} className={className} data-index={i}
                       onKeyDown={this.setValue.bind(this)}
                       omMouseOver={this.setActiveItem.bind(this)}
                       onClick={this.setValue.bind(this)}>{prompt}</li>
        });
    }

    render () {
        var name = this.props.name || null,
            inputClassName = this.props.className || null,
            listClassName = this.state.prompts.length ? 'prompts-list' : 'prompts-list hidden';

        return (
            <div className="input-prompt">
                <input type="text"
                       onInput={this.showPrompts.bind(this)}
                       onFocus={this.showPrompts.bind(this)}
                       //onBlur={this.hidePrompts.bind(this)}
                       onKeyDown={this.navigateToPrompts.bind(this)}
                       className={inputClassName} name={name} ref="input" />

                <ul className={listClassName}>
                    {this.renderItems()}
                </ul>
            </div>
        );
    }
}

export default InputPromptView;