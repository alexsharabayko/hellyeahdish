import React from 'react';
import Addons from 'react-addons';
import DishesCatalogModel from './dishesCatalogModel';

class DishesViewOptionsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gridItems: [
                {
                    name: 'grid',
                    className: 'fa fa-th-large'
                },
                {
                    name: 'list',
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
            var className = `item ${item.name === this.props.view ? 'active' : ''}`,
                href = `?view=${item.name}`;

            return (
                <a className={className} key={i} href={href}>
                    <i className={item.className}></i>{item.name}
                </a>
            );
        });
    }
    
    renderSortingOptions () {
        return (
            <div className="dishes-sorting-options">
                <h6>Sort by:</h6>

                <div className="dishes-catalog-select">
                    <select>
                        <option value="a-z">Product name: A to Z</option>
                        <option value="z-a">Product name: Z to A</option>
                        <option value="rating">Most popular first</option>
                    </select>
                </div>
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