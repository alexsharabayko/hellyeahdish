import React from 'react';

class InputPromptView extends React.Component {
    constructor (props) {
        super(props);

        props.data.sort();

        this.state = {
            prompts: [],
            activePrompt: -1
        };
    }

    showPrompts (event) {
        var criteria = event.target.value,
            prompts = criteria ? this.props.data.filter((item, i) => {
                return item.toLowerCase().indexOf(criteria.toLowerCase()) === 0;
            }).slice(0, 5) : [];

        this.setState((prevState) => {
            prevState.prompts = prompts;

            return prevState;
        });
    }

    hidePrompts () {
        this.setState({
            prompts: [],
            activePrompt: -1
        });
    }

    navigateToPrompts (event) {
        var key = event.key;

        if (key === 'ArrowDown' || key === 'ArrowUp') {
            this.setState((prevState) => {
                var activePrompt = prevState.activePrompt;

                if (activePrompt < this.state.prompts.length - 1 && key === 'ArrowDown') {
                    activePrompt += 1;
                }
                if (activePrompt > 0 && key === 'ArrowUp') {
                    activePrompt -= 1;
                }

                prevState.activePrompt = activePrompt;

                return prevState;
            });
        }

        if (key === 'Tab') {
            this.hidePrompts();
        }
    }

    setValue (event) {
        if (event.type === 'click' || (event.key && event.key === 'Enter')) {
            event.preventDefault();

            this.refs.input.getDOMNode().value = event.target.innerText;

            this.refs.input.getDOMNode().focus();

            this.hidePrompts();
        }
    }

    setActiveItem (event) {
        var target = event.target;

        this.setState((prevState) => {
            prevState.activePrompt = parseInt(target.dataset.index, 10);

            return prevState;
        });
    }

    itemRef (i, li) {
        if (i === this.state.activePrompt && li) {
            let el = li.getDOMNode();

            el.tabIndex = 2;
            el.focus();
        }
        else if (li) {
            li.getDOMNode().tabIndex = -1;
        }
    }

    renderItems () {
        return this.state.prompts.map((prompt, i) => {
            return <li key={i} data-index={i} ref={this.itemRef.bind(this, i)}
                       onKeyDown={this.setValue.bind(this)}
                       onMouseOver={this.setActiveItem.bind(this)}
                       onClick={this.setValue.bind(this)}>{prompt}</li>
        });
    }

    render () {
        var name = this.props.name || null,
            inputClassName = this.props.className || null,
            listClassName = this.state.prompts.length ? 'prompts-list' : 'prompts-list hidden';

        return (
            <div className="input-prompt" onKeyDown={this.navigateToPrompts.bind(this)}>
                <input type="text"
                       onInput={this.showPrompts.bind(this)}
                       onFocus={this.showPrompts.bind(this)}
                       className={inputClassName} name={name} ref="input" />

                <ul className={listClassName}>
                    {this.renderItems()}
                </ul>
            </div>
        );
    }
}

export default InputPromptView;