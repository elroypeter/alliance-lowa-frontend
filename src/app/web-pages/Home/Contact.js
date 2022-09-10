import React from "react";
import ContactForm from "../../components/Contact/ContactForm";

export default function Contact() {
    return (
        <div className="container-fluid bg-light overflow-hidden my-5 px-lg-0">
            <div className="container quote px-lg-0">
                <div className="row g-0 mx-lg-0">
                    <div
                        className="col-lg-6 ps-lg-0"
                        style={{ minHeight: "400px" }}
                    >
                        <div className="position-relative h-100">
                            <img
                                className="position-absolute img-fluid w-100 h-100"
                                src="assets/images/development/school.jpeg"
                                style={{ objectFit: "cover" }}
                                alt=""
                            />
                        </div>
                    </div>
                    <div
                        className="col-lg-6 quote-text py-5 wow fadeIn"
                        data-wow-delay="0.5s"
                    >
                        <div className="p-lg-5 pe-lg-0">
                            <div className="section-title text-start">
                                <h1 className="display-5 mb-4">Contact Us</h1>
                            </div>
                            <p className="mb-4 pb-2">
                                To contact us, write to us at the following
                                address
                                <a href="mailto:info@alliancelowa.org">
                                    {" "}
                                    info@alliancelowa.org
                                </a>
                                , or leave us a message below:
                            </p>
                            <ContactForm></ContactForm>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
