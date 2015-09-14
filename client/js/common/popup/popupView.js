import React from 'react';

let popupContainer = document.querySelector('.popup-container');

class PopupElement extends React.Component {
    constructor(props) {
        super(props);
    }

    static getBoundsFromElement(bounds) {
        var bindElementBounds = bounds.bindElement.getBoundingClientRect(),
            defBounds = {
                left: bindElementBounds.left,
                top: bindElementBounds.top + bindElementBounds.height
            };

        bounds.width && (defBounds.width = bounds.width);
        bounds.height && (defBounds.height = bounds.height);

        return PopupElement.getBoundsFromOptions(defBounds);
    }

    static getBoundsFromOptions(bounds) {
        var defBounds = {
            left: 0,
            top: 0,
            right: null,
            bottom: null,
            width: null,
            height: null
        };

        Object.keys(bounds).forEach((key) => {
            defBounds[key] = bounds[key] === 'number' ? bounds[key] + 'px' : bounds[key];
        });

        return defBounds;
    }


    static getBounds(bounds) {
        return bounds.bindElement ? PopupElement.getBoundsFromElement(bounds) : PopupElement.getBoundsFromOptions(bounds);
    }

    static getContent(content) {
        if (!content) {
            return null;
        }

        if (typeof content === 'string') {
            return <div className="popup-content">{content}</div>
        }
        else {
            let Factory = React.createFactory(content);

            return Factory();
        }
    }

    componentDidMount() {
        var el = React.findDOMNode(this);

    }

    static closePopup () {
        React.unmountComponentAtNode(popupContainer);
    }

    static stopPopupPropagation (event) {
        event.stopPropagation();
    }

    render() {
        var titleElement = this.props.data.title ? <h3 className="popup-title">{this.props.data.title}</h3> : null,
            contentElement = PopupElement.getContent(this.props.data.content),
            bounds = PopupElement.getBounds(this.props.bounds);

        return (
            <div className="popup-wrapper" onClick={PopupElement.closePopup}>
                <div className="popup" style={bounds} onClick={PopupElement.stopPopupPropagation}>
                    <div className="popup-data">
                        {titleElement}
                        {contentElement}
                    </div>
                </div>
            </div>
        );
    }
}

class PopupView {
    constructor(options) {
        React.render(<PopupElement bounds={options.bounds} data={options.data}/>, popupContainer);
    }
}

export default PopupView;