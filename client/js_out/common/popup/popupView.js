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
        var popupStyle = {
            left: this.props.left + 'px',
            top: this.props.top + 'px'
        };

        return (
            React.createElement("div", {className: "popup", style: popupStyle}, 
                React.createElement("span", {className: "text"}, this.state.text), 
                React.createElement("span", {className: "date"}, this.log())
            )
        );
    }
});

class PopupView {
    constructor () {
        React.render(React.createElement(View, {left: "20", top: "30"}), document.querySelector('.popup-container'));
    }
}

module.exports = PopupView;