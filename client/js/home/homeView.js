'use strict';

let HomeIntroView = React.createClass({
    render: function () {
        return (
            <div className="home-page-intro">
                <div className="cell">
                    <div className="cook-hat">
                        <img src="img/cook-hat.png" alt="cook-hat"/>
                    </div>

                    <h1>Hell yeah dish! <small>You smell what he is cooking?</small></h1>
                </div>

                <ul className="home-menu">
                    <li className="active"><a href="javascript:void(0)">Home</a></li>
                    <li><a href="javascript:void(0)">Second Place</a></li>
                    <li><a href="javascript:void(0)">Contacts</a></li>
                    <li><a href="javascript:void(0)">Popular</a></li>
                    <li><a href="javascript:void(0)">About</a></li>
                    <li><a href="javascript:void(0)">Some words</a></li>
                </ul>
            </div>
        )
    }
});

let HomeView = React.createClass({
    render: function () {
        return (
            <div className="home-page">
                <HomeIntroView />
            </div>
        );
    }
});

module.exports = function () {
    React.render(<HomeView />, document.querySelector('.application-root'));
};