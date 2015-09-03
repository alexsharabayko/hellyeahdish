import React from 'react';

class DishItem extends React.Component {
    render () {
        var img;

        if (this.props.dish.mainImageUrl) {
           img = <div className="dish-item-image"><img src={this.props.dish.mainImageUrl} alt="dish"/></div>;
        }
        else {
            let className = `pan-icon i${Math.round(Math.random() * 9)}`;

            img = <div className="dish-item-image"><i className={className}></i></div>;
        }

        return (
            <li className="dish-item">
                {img}
                <h5>{this.props.dish.name}</h5>
            </li>
        );
    }
}

export default DishItem;