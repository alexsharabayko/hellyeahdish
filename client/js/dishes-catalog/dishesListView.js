import React from 'react';
import DishesCatalogModel from './dishesCatalogModel';

class DishesGridItemView extends React.Component {
    render () {
        var dish = this.props.dish;

        return (
            <li className="dishes-list-item">
                <img src={dish.mainImage.url} alt={dish.name}/>

                <div className="dl-image-hover">
                    <div className="inline-block">
                        <span className="dish-icon-name">{dish.name}</span>

                        <button className="smart-border-button">View dish</button>
                    </div>
                </div>

                <span className="level-label">83%</span>
            </li>
        )
    }
}

class DishesListItemView extends React.Component {
    renderStars (raiting, count) {
        var stars = [];

        for (let i = 0; i < count; i++) {
            let className = 'fa ',
                min = i * count,
                max = min + count;

            if (min < raiting && max <= raiting) {
                className += 'fa-star';
            }
            else if (min >= raiting && max > raiting) {
                className += 'fa-star-o';
            }
            else {
                className += 'fa-star-half-o';
            }

            stars.push(<i className={className}></i>)
        }

        return stars;
    }

    getPropertyById (propertyName, id) {
        return this.props.dishProps[propertyName].filter(prop => prop._id === id)[0].name;
    }

    render () {
        var dish = this.props.dish;

        return (
            <li className="dishes-list-li">
                <img src={dish.mainImage.url} alt={dish.name}/>

                <div className="dishes-list-linfo">
                    <h6>{dish.name}</h6>

                    <div className="stars">{this.renderStars(50 + Math.random() * 50, 10)}</div>

                    <p className="description">{dish.description}</p>

                    <div className="labels">
                        <a href="javascript:void(0)">{this.getPropertyById('kitchens', dish.kitchenId)}</a>
                        <a href="javascript:void(0)">{this.getPropertyById('preferences', dish.preferenceId)}</a>
                        <a href="javascript:void(0)">{this.getPropertyById('categories', dish.categoryId)}</a>
                    </div>

                    <a className="goto" href="#">View</a>
                </div>
            </li>
        )
    }
}

class DishesListView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dishProps: null,
            items: []
        };
    }

    componentDidMount() {
        DishesCatalogModel.getProperties().then((props) => {
            DishesCatalogModel.getDishes().then((data) => {
                this.setState({
                    dishProps: props,
                    items: React.addons.update(this.state.items, { $push: data })
                });
            });
        });
    }

    render() {
        return (
            <ul className="dishes-list">
                {
                    this.props.params.view === 'grid' ?
                        this.state.items.map((item, i) => {
                            return <DishesGridItemView dish={item} key={i}/>
                        }) :
                        this.state.items.map((item, i) => {
                            return <DishesListItemView dish={item} dishProps={this.state.dishProps} key={i} />
                        })
                }
            </ul>
        );
    }
}

export default DishesListView;