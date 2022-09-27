import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { useTranslation } from "react-i18next";

export default function Banner() {
    const { i18n } = useTranslation();
    const [currentLang, setState] = useState("fr");
    const lngs = {
        en: { nativeSymbol: "EN" },
        fr: { nativeSymbol: "FR" },
    };

    const onChangeLang = (evt) => {
        setState(evt.target.value);
        i18n.changeLanguage(evt.target.value);
    };

    return (
        <div className="container-fluid bg-light p-0">
            <div className="row gx-0 d-none d-lg-flex">
                <div className="col-lg-7 px-5 text-start">
                    <div className="h-100 d-inline-flex align-items-center py-3 me-4">
                        <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            className="text-primary me-2"
                        ></FontAwesomeIcon>
                        <small>
                            {
                                "Logu (ABM camp), Bisie - Walikale road, Congo DRC"
                            }
                        </small>
                    </div>
                    <div className="h-100 d-inline-flex align-items-center py-3">
                        <FontAwesomeIcon
                            icon={faClock}
                            className="text-primary me-2"
                        ></FontAwesomeIcon>
                        <small>Mon - Fri : 08.00 AM - 06.00 PM</small>
                    </div>
                </div>
                <div className="col-lg-5 px-5 text-end">
                    <div className="h-100 d-inline-flex align-items-center py-3 me-4">
                        <FontAwesomeIcon
                            icon={faPhone}
                            className="text-primary me-2"
                        ></FontAwesomeIcon>
                        <small>+243 8184 83709</small>
                    </div>
                    <div className="h-100 d-inline-flex align-items-center translate">
                        <span style={{ marginRight: "-5px" }}>
                            <img
                                width="25"
                                src="/assets/images/defaults/translate.png"
                            />
                        </span>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            name="langSwitcher"
                            value={currentLang}
                            onChange={onChangeLang}
                        >
                            {Object.keys(lngs).map((lang, index) => (
                                <option key={index} value={lang}>
                                    {lngs[lang].nativeSymbol}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
