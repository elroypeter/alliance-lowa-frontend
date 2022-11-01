import React from 'react';

export default function Partners() {
    const partnerList = [
        {
            name: 'Gerald Group',
            logo: 'assets/images/partners/gerald-group.jpeg',
        },
        {
            name: 'Alphamin Bisie Mining SA',
            logo: 'assets/images/partners/alphamin.png',
        },
        {
            name: 'Congo Power Project',
            logo: 'assets/images/partners/gerald-group.jpeg',
        },
        {
            name: 'Congolese Government',
            logo: 'assets/images/partners/congo.png',
        },
    ];
    return (
        <div className="container-xxl py-5">
            <div className="container">
                <div className="section-title text-center">
                    <h1 className="display-5 mb-5">Partners</h1>
                    <p>To achieve its objectives, Alliance Lowa is financially supported by the following partners</p>
                </div>
                <div className="row g-5">
                    {partnerList.map((partner, index) => (
                        <div key={index} className="col-md-6 col-lg-3 wow fadeIn text-center" data-wow-delay="0.1s">
                            <img className="img-fluid bg-light p-2 mx-auto mb-3" src={partner.logo} style={{ width: '120px' }} />
                            <h5>{partner.name}</h5>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
