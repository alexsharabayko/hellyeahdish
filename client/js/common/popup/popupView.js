import React from 'react';

class PopupElement extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            text: 'Hi all'
        }
    }

    static getBounds (boundsArray) {
        return {
            left: boundsArray[0] ? typeof boundsArray[0] === 'number' ? boundsArray[0] + 'px' : boundsArray[0] : 0,
            top: boundsArray[0] ? typeof boundsArray[0] === 'number' ? boundsArray[0] + 'px' : boundsArray[0] : 0,
            width: boundsArray[2] ? typeof boundsArray[2] === 'number' ? boundsArray[2] + 'px' : boundsArray[2] : 'auto',
            height: boundsArray[3] ? typeof boundsArray[3] === 'number' ? boundsArray[3] + 'px' : boundsArray[3] : 'auto'
        };
    }

    componentDidMount () {
        var el = React.findDOMNode(this);
    }

    render () {
        var titleElement = this.props.data.title ? <h3 className="popup-title">{this.props.data.title}</h3> : null,
            contentElement = this.props.data.content ? <div className="popup-content">{this.props.data.content}</div> : null,
            bounds = PopupElement.getBounds(this.props.boundsArray);

        return (
            <div className="popup" style={bounds}>
                <div className="popup-data">
                    {titleElement}
                    {contentElement}
                </div>
            </div>
        );
    }
}

class PopupView {
    constructor (boundsArray, data) {
        React.render(<PopupElement boundsArray={boundsArray} data={data} />, document.querySelector('.popup-container'));
    }
}

export default PopupView;