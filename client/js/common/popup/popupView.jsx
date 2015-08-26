'use strict';

let View = React.createClass({
    getInitialState: function () {
        return {
            text: 'Hi all!'
        }
    },

    log: function () {
        return 22;
    },

    render: function () {
        return (
            <div>
                <span className="text">{this.state.text}</span>
                <span className="date">{this.log()}</span>
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