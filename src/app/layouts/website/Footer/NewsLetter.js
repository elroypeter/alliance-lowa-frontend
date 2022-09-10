import React from "react";
import { ApiService } from "../../../services/ApiService";

export default function NewsLetter() {
    const saveSubscriber = async () => {
        const api = new ApiService();
        const res = await api.apiConnect("/subscriber", "post", {
            email: "elroypeter2@gmail.com",
        });
        console.warn(res);
    };

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
                    onClick={saveSubscriber}
                    className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
                >
                    SignUp
                </button>
            </div>
        </div>
    );
}
