import React from 'react';
import CookingModel from './cookingModel';
import urlUtil from '../common/url-util/urlUtil';

class CookingView extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            dish: {}
        };
    }

    componentDidMount () {
        CookingModel.getDish(this.props.urlPaths.id).then((dish) => {
            this.setState({ dish });
        });
    }

    render () {
        var dish = this.state.dish;

        return (
            <div className="cooking">
                <div className="cooking-page">{dish._id}</div>
            </div>
        );
    }
}

export default CookingView;