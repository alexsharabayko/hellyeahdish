import React from 'react/addons';

let popupContainer = document.querySelector('.popup-container'),
    component = null;

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
        var keys = Object.keys(bounds),
            defBounds = {
                left: null,
                top: null,
                right: null,
                bottom: null,
                width: null,
                height: null
            };

        if (keys.length) {
            defBounds.position = 'absolute';
            keys.forEach((key) => {
                defBounds[key] = bounds[key];
            });
        }

        return defBounds;
    }


    getBounds () {
        var bounds = this.props.bounds;

        if (bounds) {
            return bounds.bindElement ? PopupElement.getBoundsFromElement(bounds) : PopupElement.getBoundsFromOptions(bounds);
        }
        else {
            return null;
        }
    }

    getContent () {
        var content = this.props.data ? this.props.data.content : null;

        if (!content) {
            return null;
        }
        else if (typeof content === 'string') {
            return <div className="popup-content" ref="content">{content}</div>
        }
        else if (React.isValidElement(content)) {
            return React.addons.cloneWithProps(content, { ref: 'content' });
        }
        else {
            return React.createFactory(content)({ ref: 'content' });
        }
    }

    getButtons () {
        var buttons = this.props.buttons;

        if (Array.isArray(buttons)) {
            return (
                <div className="popup-buttons">
                    {buttons.map((button, i) => {
                        if (button.href) {
                            return <a href={button.href} className={button.className || null} key={i}
                                      onClick={button.onClick}>{button.text}</a>
                        }
                        else {
                            return <button className={button.className || null} key={i}
                                           onClick={button.onClick.bind(this)}>{button.text}</button>
                        }
                    })}
                </div>
            );
        }
        else {
            return null;
        }
    }

    closePopup (event) {
        React.unmountComponentAtNode(document.querySelector('.popup-container'));

        typeof this.props.onClose === 'function' && this.props.onClose();

        event && event.stopPropagation();
    }

    static stopPopupPropagation (event) {
        event.stopPropagation();
    }

    render() {
        return (
            <div className="popup-wrapper" ref="wrapper">
                <div className={'popup ' + (this.props.customClass || '')} style={this.getButtons()} ref="popup">
                    <div className="popup-data">
                        {this.props.data.title ? <h3 className="popup-title">{this.props.data.title}</h3> : null}
                        {this.getContent()}
                        {this.getButtons()}
                    </div>

                    <button className="popup-button-close" type="button" onClick={this.closePopup.bind(this)}>
                        <i className="fa fa-remove"></i>
                    </button>
                </div>
            </div>
        );
    }
}

class PopupView {
    constructor(options) {
        component = React.render(<PopupElement
            customClass={options.customClass}
            onClose={options.onClose}
            buttons={options.buttons}
            bounds={options.bounds}
            data={options.data}/>, document.querySelector('.popup-container'));
    }

    close () {
        component.closePopup();
        component = null;
    }
}

export default PopupView;