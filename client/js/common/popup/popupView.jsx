'use strict';

let View = React.createClass({
    getInitialState: function () {
        return {
            text: 'Hi all!'
        }
    },

    render: function () {
        return (
            <div>
                <span className="text">{this.state.text}</span>
                <span className="date">{Date.now()}</span>
                <span>dsldfsdlk</span>
            </div>
        );
    }
});

class PopupView {
    constructor () {
        React.render(<View />, document.querySelector('.popup-container'));
    }
}

module.exports = PopupView;