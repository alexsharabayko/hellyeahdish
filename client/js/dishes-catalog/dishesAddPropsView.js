import React from 'react';
import DishesCatalogModel from './dishesCatalogModel';
import urlUtil from '../common/url-util/urlUtil';
import user from '../common/user/userModel';

class DishesCatalogView extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            kitchens: [],
            preferences: []
        }
    }

    componentDidMount () {
        DishesCatalogModel.getProperties().then((data) => {
            this.setState({
                kitchens: React.addons.update(this.state.kitchens, { $push: data.kitchens }),
                preferences: React.addons.update(this.state.preferences, { $push: data.preferences })
            });
        });
    }

    renderUserLinks () {
        if (user.data.isLogin) {
            let href = `?authorId=${user.data.id}`;

            return <div className="user-links">
                <a className="create-dish-link" href={urlUtil.routes.createDish}>Create dish</a>

                <a className="my-dishes" href={href}>My dishes</a>
            </div>;
        }
        else {
            return null;
        }
    }

    render() {
        return (
            <div className="dishes-add-props">
                {this.renderUserLinks()}

                <ul className="dishes-add-list">
                    <h4>
                        <a href={urlUtil.createRelativeUrl({ kitchenId: null })}>Kitchens</a>
                    </h4>
                    {this.state.kitchens.map((item, i) => {
                        var className = item._id === this.props.kitchenId ? 'active' : null;

                        return (
                            <li key={i} className={className}>
                                <i className="fa fa-angle-right"></i>
                                <a href={urlUtil.createRelativeUrl({ kitchenId: item._id })}>{item.name}</a>
                            </li>
                        );
                    })}
                </ul>

                <ul className="dishes-add-list">
                    <h4><a href={urlUtil.createRelativeUrl({ preferenceId: null })}>Preferences</a></h4>
                    {this.state.preferences.map((item, i) => {
                        var className = item._id === this.props.preferenceId ? 'active' : null;

                        return (
                            <li key={i} className={className}>
                                <i className="fa fa-angle-right"></i>
                                <a href={urlUtil.createRelativeUrl({ preferenceId: item._id })}>{item.name}</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default DishesCatalogView;