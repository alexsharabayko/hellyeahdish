import React from 'react';

class DishItem extends React.Component {
    render() {
        var img,
            time = this.props.dish.totalTime > 60 ? this.props.dish.totalTime / 60 + ' hours' : this.props.dish.totalTime + ' min';

        var pack = (
            <div className="dish-item-pack">
                <div className="cell">
                    <p className="description">{this.props.dish.description || null}</p>
                    <button>View</button>
                </div>
            </div>
        );

        if (this.props.dish.mainImageUrl) {
            img = <div className="dish-item-image"><img src={this.props.dish.mainImageUrl} alt="dish"/>{pack}</div>;
        }
        else {
            let className = `pan-icon i${Math.round(Math.random() * 9)}`;

            img = <div className="dish-item-image"><i className={className}></i>{pack}</div>;
        }

        return (
            <li className="dish-item">
                {img}
                <span className="time">{time}</span>
                <h5>{this.props.dish.name}</h5>
            </li>
        );
    }
}

export default DishItem;