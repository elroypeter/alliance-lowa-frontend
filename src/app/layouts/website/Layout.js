import React from 'react';
import { Outlet } from 'react-router-dom';
import Banner from './Banner';
import Footer from './Footer/Footer';
import Header from './Header';

export function Layout() {
    return (
        <div className="website-layout">
            <Banner></Banner>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
}
