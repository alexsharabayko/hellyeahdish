'use strict';

let View = React.createClass({displayName: "View",
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
            React.createElement("div", null, 
                React.createElement("span", {className: "text"}, this.state.text), 
                React.createElement("span", {className: "date"}, this.log())
            )
        );
    }
});

class PopupView {
    constructor () {
        React.render(React.createElement(View, null), document.querySelector('.popup-container'));
    }
}

module.exports = PopupView;