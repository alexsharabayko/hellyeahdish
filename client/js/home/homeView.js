import React from 'react';
import HomeIntroView from './homeIntroView';

class HomeView extends React.Component {
    render () {
        return (
            <div className="home-page">
                <HomeIntroView />
            </div>
        );
    }
}

export default HomeView;