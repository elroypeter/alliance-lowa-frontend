import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage } from './store/language.slice';

export default function Banner() {
    const dispatch = useDispatch();
    const { i18n } = useTranslation();
    const { selectedLanguage, langs } = useSelector((store) => store.language);

    // Validate and fix language on mount, then sync i18n when selectedLanguage changes
    useEffect(() => {
        const validLanguages = ['en', 'fr']; // Hardcoded valid languages
        if (!validLanguages.includes(selectedLanguage)) {
            // If selectedLanguage is invalid, reset to 'fr' (default)
            dispatch(changeLanguage('fr'));
            i18n.changeLanguage('fr');
        } else {
            i18n.changeLanguage(selectedLanguage);
        }
    }, [selectedLanguage, dispatch, i18n]);

    const onChangeLang = (evt) => {
        const newLang = evt.target.value;
        const validLanguages = Object.keys(langs);
        // Only allow valid languages
        if (validLanguages.includes(newLang)) {
            dispatch(changeLanguage(newLang));
        }
    };

    return (
        <div className="container-fluid bg-light p-0" style={{ minHeight: 'auto' }}>
            <div className="row gx-0 d-none d-lg-flex" style={{ minHeight: 'auto' }}>
                <div className="col-lg-7 px-5 text-start">
                    <div className="d-inline-flex align-items-center py-2 me-4">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary me-2"></FontAwesomeIcon>
                        <small>{'Logu (ABM camp), Bisie - Walikale road, Congo DRC'}</small>
                    </div>
                    <div className="d-inline-flex align-items-center py-2">
                        <FontAwesomeIcon icon={faClock} className="text-primary me-2"></FontAwesomeIcon>
                        <small>Mon - Fri : 08.00 AM - 06.00 PM</small>
                    </div>
                </div>
                <div className="col-lg-5 px-5 text-end">
                    <div className="d-inline-flex align-items-center py-2 me-4">
                        <FontAwesomeIcon icon={faPhone} className="text-primary me-2"></FontAwesomeIcon>
                        <small>+243 8184 83709</small>
                    </div>
                    <div className="d-inline-flex align-items-center translate py-2">
                        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                            <img width="25" src="/assets/images/defaults/translate.png" alt="Language" />
                        </span>
                        <select
                            className="form-select"
                            aria-label="Language selector"
                            name="langSwitcher"
                            value={Object.keys(langs).includes(selectedLanguage) ? selectedLanguage : 'fr'}
                            onChange={onChangeLang}
                            style={{ display: 'block', visibility: 'visible', opacity: 1 }}
                        >
                            {Object.keys(langs).map((lang, index) => (
                                <option key={index} value={lang}>
                                    {langs[lang].nativeSymbol}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
