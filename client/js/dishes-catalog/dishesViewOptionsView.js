import React from 'react';
import Addons from 'react-addons';
import DishesCatalogModel from './dishesCatalogModel';

class DishesViewOptionsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gridItems: [
                {
                    text: 'Grid',
                    className: 'fa fa-th-large'
                },
                {
                    text: 'List',
                    className: 'fa fa-th-list'
                }
            ],

            activeGridItem: 0
        }
    }

    renderGridOptions () {
        return (
            <div className="dishes-grid-options">
                <h6>View: </h6>

                {this.renderGridsItems()}
            </div>
        );
    }

    renderGridsItems() {
        return this.state.gridItems.map((item, i) => {
            var classes = Addons.classSet({
                    'item': true,
                    'active': i === this.state.activeGridItem
                });

            return (
                <span className={classes} onClick={this.changeGrid.bind(this, i)} key={i}>
                    <i className={item.className}></i>{item.text}
                </span>
            );
        });
    }

    changeGrid(i, event) {
        this.setState((prevState) => {
            prevState.activeGridItem = i;

            return prevState;
        });
    }
    
    renderSortingOptions () {
        return (
            <div className="dishes-sorting-options">
                <h6>Sort by:</h6>

                <select>
                    <option value="a-z">Product name: A to Z</option>
                    <option value="z-a">Product name: Z to A</option>
                    <option value="rating">Most popular first</option>
                </select>
            </div>
        );
    }

    render() {
        return (
            <div className="dishes-view-options">
                {this.renderGridOptions()}

                {this.renderSortingOptions()}
            </div>
        );
    }
}

export default DishesViewOptionsView;