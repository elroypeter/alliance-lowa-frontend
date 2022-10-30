import React, { Component } from 'react';
import ImageSliderList from './ImageSlider/ImageSliderList';

export default class Dashboard extends Component {
    render() {
        return (
            <div className="container-xxl">
                <ImageSliderList />
            </div>
        );
    }
}
