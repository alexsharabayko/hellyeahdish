import React from 'react';
import PopupView from '../popup/popupView';

class CrazyRhombus extends React.Component {
    render () {
        return (<ul className="crazy-rhombus">
            <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
        </ul>);
    }
}

class FadeSquares extends React.Component {
    render () {
        return (<ul className="fade-squares">
            <li></li><li></li><li></li><li></li><li></li>
        </ul>);
    }
}

class LoaderComponent extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            loaders: [
                CrazyRhombus,
                FadeSquares
            ]
        };
    }

    render () {
        return React.createFactory(this.state.loaders[parseInt(Math.random() * this.state.loaders.length, 10)])();
    }
}

class LoaderView {
    constructor () {
        this.popup = new PopupView({
            customClass: 'loader',
            data: {
                content: LoaderComponent
            }
        });
    }

    close () {
        this.popup.close();
    }
}

export default LoaderView;