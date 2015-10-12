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

    centerPopup () {
        var wrapperElement = this.refs.wrapper.getDOMNode(),
            popupElement = this.refs.popup.getDOMNode();

        popupElement.style.left = (wrapperElement.clientWidth / 2 - popupElement.clientWidth / 2) + 'px';
        popupElement.style.top = (wrapperElement.clientHeight / 2 - popupElement.clientHeight / 2) + 'px';
    }

    componentDidMount() {
        this.props.bounds.center && this.centerPopup();
    }

    closePopup (event) {
        React.unmountComponentAtNode(document.querySelector('.popup-container'));

        typeof this.props.onClose === 'function' && this.props.onClose();

        event.stopPropagation();
    }

    static stopPopupPropagation (event) {
        event.stopPropagation();
    }

    render() {
        var titleElement = this.props.data.title ? <h3 className="popup-title">{this.props.data.title}</h3> : null,
            contentElement = PopupElement.getContent(this.props.data.content),
            bounds = PopupElement.getBounds(this.props.bounds);

        return (
            <div className="popup-wrapper" ref="wrapper">
                <div className="popup" style={bounds} ref="popup">
                    <div className="popup-data">
                        {titleElement}
                        {contentElement}

                        <div className="popup-buttons">
                            <a href="#/dishes-catalog">View dishes list</a>
                        </div>
                    </div>

                    <button className="close-popup-button" type="button" onClick={this.closePopup.bind(this)}>
                        <i className="fa fa-remove"></i>
                    </button>
                </div>
            </div>
        );
    }
}

class PopupView {
    constructor(options) {
        React.render(<PopupElement
            onClose={options.onClose}
            bounds={options.bounds}
            data={options.data}/>, document.querySelector('.popup-container'));
    }
}

export default PopupView;