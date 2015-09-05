import React from 'react';
import MainNavView from '../mainNav/mainNavView'

class HomeIntroView extends React.Component {
    render () {
        return (
            <div className="home-page-intro home-section">
                <div className="cell">
                    <div className="cook-hat">
                        <img src="img/cook-hat.png" alt="cook-hat"/>
                    </div>

                    <h1>Hell yeah dish!
                        <small>You smell what he is cooking?</small>
                    </h1>
                </div>

                <MainNavView />
            </div>
        )
    }
}

export default HomeIntroView;