import React from 'react';

class PopupElement extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            text: 'Hi all'
        }
    }

    render () {
        //var popupStyle = {
        //    left: this.props.left + 'px',
        //    top: this.props.top + 'px'
        //};

        debugger;

        return (
            <div className="popup" style={popupStyle}>
                <span className="text">{this.state.text}</span>
            </div>
        );
    }
}

class PopupView {
    constructor (options) {
        React.render(<PopupElement />, document.querySelector('.popup-container'));
    }
}

export default PopupView;