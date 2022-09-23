import React, { useState } from "react";
import { ApiService } from "../../../services/ApiService";
import BsSpinner from "../../../components/Spinner/BsSpinner";

export default function NewsLetter() {
    const [form, setState] = useState({
        email: "",
        saving: false,
    });

    const onFormChange = (evt) => {
        if (evt.target.value) {
            setState((state) => ({ ...state, email: evt.target.value }));
        }
    };

    const validate = () => {
        return form.email !== "" ? true : false;
    };

    const saveSubscriber = async () => {
        try {
            setState((state) => ({ ...state, saving: true }));
            const api = new ApiService();
            const res = await api.apiConnect("/subscriber", "post", {
                email: form.email,
            });

            if (res) {
                setState({ email: "", saving: false });
            }
        } catch (error) {
            console.error(error);
        }
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
                    onChange={onFormChange}
                />
                <button
                    disabled={!validate()}
                    type="button"
                    value={form.email}
                    onClick={saveSubscriber}
                    className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
                >
                    {form.saving ? <BsSpinner /> : "SignUp"}
                </button>
            </div>
        </div>
    );
}
