import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

export default function Header() {
    const { t } = useTranslation();
    const [isSticky, setIsSticky] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);
    const headerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            // Set sticky when scrolled past 50px (or adjust as needed)
            setIsSticky(scrollTop > 50);
        };

        // Measure header height
        const measureHeader = () => {
            if (headerRef.current) {
                setHeaderHeight(headerRef.current.offsetHeight);
            }
        };

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Measure header on mount and resize
        measureHeader();
        window.addEventListener('resize', measureHeader, { passive: true });

        // Check initial scroll position
        handleScroll();

        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', measureHeader);
        };
    }, []);

    const hrefLinks = [
        {
            name: t('header_home'),
            address: '/',
        },
        {
            name: t('header_who_we_are'),
            address: '/who-we-are',
        },
        {
            name: t('header_what_we_do'),
            address: '/what-we-do',
        },
        {
            name: t('header_news_careers'),
            address: '/new-and-careers',
        },
        {
            name: t('header_contact_us'),
            address: '/contact-us',
        },
    ];
    return (
        <>
            <nav
                ref={headerRef}
                className={`navbar navbar-expand-lg bg-white navbar-light p-0 ${isSticky ? 'sticky-active' : ''}`}
                style={{
                    position: isSticky ? 'fixed' : 'relative',
                    top: isSticky ? 0 : 'auto',
                    left: 0,
                    right: 0,
                    width: '100%',
                    zIndex: isSticky ? 1020 : 'auto',
                    backgroundColor: isSticky ? 'rgba(255, 255, 255, 0.98)' : '#ffffff',
                    backdropFilter: isSticky ? 'blur(10px)' : 'none',
                    boxShadow: isSticky ? '0 2px 20px rgba(0, 0, 0, 0.1)' : '0 2px 10px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.3s ease',
                }}
            >
                <div className="navbar-brand d-flex align-items-center px-4 px-lg-5">
                    <h2 className="m-0 text-primary">
                        <Link to="/">
                            <img src="/assets/images/logo/normal.webp" alt="" />
                        </Link>
                    </h2>
                </div>
                <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto p-4 p-lg-0">
                        {hrefLinks.map((link, index) => (
                            <NavLink key={index} className="nav-item nav-link" to={link.address} end>
                                {link.name}
                            </NavLink>
                        ))}
                    </div>
                    <Link to="/" className="btn btn-primary d-none d-lg-block" style={{ padding: '8px 16px', fontSize: '13px' }}>
                        {t('header_make_donation')}
                        <FontAwesomeIcon icon={faArrowRight} className="ms-2" style={{ fontSize: '11px' }} />
                    </Link>
                </div>
            </nav>
            {/* Spacer to prevent content jump when header becomes fixed */}
            {isSticky && <div style={{ height: `${headerHeight}px` }} />}
        </>
    );
}
