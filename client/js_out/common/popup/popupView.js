'use strict';

let View = React.createClass({displayName: "View",
    getInitialState: function () {
        return {
            text: 'Hi all!'
        }
    },

    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("span", {className: "text"}, this.state.text), 
                React.createElement("span", {className: "date"}, Date.now()), 
                React.createElement("span", null, "dsldfsdlk")
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