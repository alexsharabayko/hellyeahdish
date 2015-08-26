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
        var popupStyle = {
            left: this.props.left + 'px',
            top: this.props.top + 'px'
        };

        return (
            <div className="popup" style={popupStyle}>
                <span className="text">{this.state.text}</span>
                <span className="date">{this.log()}</span>
            </div>
        );
    }
});

class PopupView {
    constructor () {
        React.render(<View left="20" top="30" />, document.querySelector('.popup-container'));
    }
}

module.exports = PopupView;