import React from "react";

export default function NewsLetter() {
    return (
        <div className="col-lg-4 col-md-6">
            <h4 className="text-light mb-4">Newsletter</h4>
            <p>Stay in touch with us and get all updates seamlessly</p>
            <div
                className="position-relative mx-auto"
                style={{ maxWidth: "400px" }}
            >
                <input
                    className="form-control border-0 w-100 py-3 ps-4 pe-5"
                    type="text"
                    placeholder="Your email"
                />
                <button
                    type="button"
                    className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
                >
                    SignUp
                </button>
            </div>
        </div>
    );
}
