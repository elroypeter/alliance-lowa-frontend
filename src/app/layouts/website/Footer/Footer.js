import React from 'react';
import Address from './Address';
import BackTop from './BackTop';
import NewsLetter from './NewsLetter';
import QuickLinks from './QuickLinks';

export default function Footer() {
    return (
        <>
            <div className="container-fluid bg-dark text-light footer mt-5 pt-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container py-5">
                    <div className="row g-5">
                        <Address></Address>
                        <QuickLinks></QuickLinks>
                        <NewsLetter></NewsLetter>
                    </div>
                </div>
                <div className="container">
                    <div className="copyright">
                        <div className="row">
                            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">&copy;Alliance Lowa, All Right Reserved.</div>
                            <div className="col-md-6 text-center text-md-end">2022</div>
                        </div>
                    </div>
                </div>
            </div>

            <BackTop></BackTop>
        </>
    );
}
