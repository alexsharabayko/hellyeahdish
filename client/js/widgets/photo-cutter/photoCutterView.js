import React from 'react';
import PopupView from '../popup/popupView';

class PhotoCutterComponent extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            mainImageSrc: null,
            isMoveMode: false,
            isSizeMode: false,
            mouseCurrentPosition: null,
            areaPosition: { x: 0, y: 0 },
            areaStyle: {
                transform: 'translate(0, 0)',
                width: 200,
                height: 200
            },
            addImageStyle: {
                transform: 'translate(0, 0)'
            },
            size: null,
            naturalSize: null
        };
    }

    setAddImage () {
        var mainImage = this.refs.mainImage;

        this.refs.addImage.width = mainImage.width;

        var state = this.state;

        state.size = {
            width: mainImage.width,
            height: mainImage.height
        };

        state.naturalSize = {
            width: mainImage.naturalWidth,
            height: mainImage.naturalHeight
        };

        this.setState(state);
    }

    turnMode (value, modeName, event) {
        var x = event.clientX,
            y = event.clientY;

        if (value && !this.state.isMoveMode && !this.state.isSizeMode) {
            let state = this.state;

            state[modeName] = true;
            state.mouseCurrentPosition = {x, y};

            this.setState(state);
        }
        else if (!value) {
            let state = this.state;

            state.isMoveMode = false;
            state.isSizeMode = false;

            state.mouseCurrentPosition = null;

            this.setState(state);
        }
    }

    changeArea (event) {
        if (this.state.isSizeMode) {
            this.changeSize(event);
            return 'size';
        }
        else if (this.state.isMoveMode) {
            this.changePosition(event);
            return 'position';
        }
    }

    changePosition (event) {
        let cx = event.clientX,
            cy = event.clientY,
            state = this.state,
            x = state.areaPosition.x + cx - state.mouseCurrentPosition.x,
            y = state.areaPosition.y + cy - state.mouseCurrentPosition.y;

        x < 0 && (x = 0);
        y < 0 && (y = 0);

        if (x + state.areaStyle.width > state.size.width) {
            x = state.size.width - state.areaStyle.width;
        }

        if (y + state.areaStyle.height > state.size.height) {
            y = state.size.height - state.areaStyle.height;
        }

        state.areaPosition = {x, y};

        state.mouseCurrentPosition = {x: cx, y: cy};

        state.areaStyle.transform = `translate(${x}px, ${y}px)`;
        state.addImageStyle.transform = `translate(${-x}px, ${-y}px)`;

        this.setState(state);
    }

    changeSize (event) {
        let cx = event.clientX,
            cy = event.clientY,
            state = this.state,
            size = Math.max(state.areaStyle.width + cx - state.mouseCurrentPosition.x, state.areaStyle.height + cy - state.mouseCurrentPosition.y);

        if (state.areaPosition.x + size > state.size.width) {
            size = state.size.width - state.areaPosition.x;
        }
        if (state.areaPosition.y + size > state.size.height) {
            size = state.size.height - state.areaPosition.y;
        }

        state.areaStyle.width = size;
        state.areaStyle.height = size;

        console.log(size);

        state.mouseCurrentPosition = {x: cx, y: cy};

        this.setState(state);
    }

    componentDidMount () {
        var fr = new FileReader();

        fr.onload = function () {
            this.setState((prevSate) => {
                prevSate.mainImageSrc = fr.result;

                return prevSate;
            });

            this.forceUpdate();
        }.bind(this);
        
        fr.readAsDataURL(this.props.image);
    }

    render () {
        return (
            <div className="photo-cutter">
                <img ref="mainImage" className="photo-cutter-image" src={this.state.mainImageSrc} onLoad={this.setAddImage.bind(this)} />

                <div className="photo-cutter-overlay">
                    <div className="photo-cutter-area" style={this.state.areaStyle}
                         onMouseMove={this.changeArea.bind(this)}
                         onMouseDown={this.turnMode.bind(this, true, 'isMoveMode')}
                         onMouseLeave={this.turnMode.bind(this, false, null)}
                         onMouseUp={this.turnMode.bind(this, false, null)}>

                        <img draggable="false" ref="addImage" style={this.state.addImageStyle} src={this.state.mainImageSrc}/>

                        <span className="photo-cutter-size"
                              onMouseDown={this.turnMode.bind(this, true, 'isSizeMode')}>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

class PhotoCutterView {
    constructor (options) {
        return new Promise((resolve, reject) => {
            new PopupView({
                customClass: 'photo-cutter-popup',
                bounds: {},
                buttons: [
                    {
                        text: 'It is!',
                        onClick: function (event) {
                            var state = this.refs.content.state,
                                sw = state.size.width,
                                sh = state.size.height,
                                nw = state.naturalSize.width,
                                nh = state.naturalSize.height;

                            resolve({
                                x: parseInt(nw * state.areaPosition.x / sw, 10),
                                y: parseInt(nh * state.areaPosition.y / sh, 10),
                                width: parseInt(nw * state.areaStyle.width / sw, 10),
                                height: parseInt(nh * state.areaStyle.height / sh, 10)
                            });

                            this.closePopup();
                        }
                    }
                ],
                data: {
                    title: 'Select image bounds',
                    content: <PhotoCutterComponent image={options.image} />
                }
            });
        });
    }
}

export default PhotoCutterView;