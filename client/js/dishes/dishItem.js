import React from 'react';

class DishItem extends React.Component {
    render () {
        var img;

        if (this.props.dish.mainImageUrl) {
           img = <div className="dish-item-image"><img src={this.props.dish.mainImageUrl} alt="dish"/></div>;
        }
        else {
            img = <div className="dish-item-image"><img src="img/pan.svg" alt="dish"/></div>;
        }

        return (
            <li className="dish-item">
                {img}
            </li>
        );
    }
}

export default DishItem;