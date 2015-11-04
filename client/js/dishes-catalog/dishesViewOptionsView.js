import React from 'react';
import DishesCatalogModel from './dishesCatalogModel';
import urlUtil from '../common/url-util/urlUtil';
import router from '../common/router/router';

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

            sortItems: [
                {
                    name: 'Product name: A to Z',
                    value: 'name'
                },
                {
                    name: 'Product name: Z to A',
                    value: '-name'
                },
                {
                    name: 'Total time:  ascending',
                    value: 'totalTime'
                },
                {
                    name: 'Total time: descending',
                    value: '-totalTime'
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
            var className = `item ${item.name === this.props.view ? 'active' : ''}`;

            return (
                <a className={className} key={i} href={urlUtil.createRelativeUrl({ view: item.name })}>
                    <i className={item.className}></i>{item.name}
                </a>
            );
        });
    }

    handleSorting (event) {
        router.navigate(urlUtil.createRelativeUrl(event.target.value));
    }
    
    renderSortingOptions () {
        return (
            <div className="dishes-sorting-options">
                <h6>Sort by:</h6>

                <div className="dishes-catalog-select" onChange={this.handleSorting.bind(this)}>
                    <select>
                        {
                            this.state.sortItems.map((item, i) => {
                                var val = `?sort=${item.value}`;

                                return <option value={val} key={i} selected={item.value === this.props.sort}>
                                    {item.name}</option>
                            })
                        }
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