import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function QuickLinks() {
    const { t } = useTranslation();

    return (
        <div className="col-lg-4 col-md-6">
            <h4 className="text-light mb-4">{t('footer_quick')}</h4>
            <Link className="btn btn-link" to={'/who-we-are'}>
                {t('footer_about_us')}
            </Link>
            <Link className="btn btn-link" to={'/contact-us'}>
                {t('header_contact_us')}
            </Link>
            <Link className="btn btn-link" to={'/what-we-do'}>
                {t('footer_project')}
            </Link>
            <Link className="btn btn-link" to={'/new-and-careers'}>
                {t('header_news_careers')}
            </Link>
        </div>
    );
}
