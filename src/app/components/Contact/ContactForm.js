import React from "react";

export default function ContactForm() {
    return (
        <form>
            <div className="row g-3">
                <div className="col-12 col-sm-6">
                    <input
                        type="text"
                        className="form-control border-0"
                        placeholder="Your Name"
                        style={{ height: "55px" }}
                    />
                </div>
                <div className="col-12 col-sm-6">
                    <input
                        type="email"
                        className="form-control border-0"
                        placeholder="Your Email"
                        style={{ height: "55px" }}
                    />
                </div>
                <div className="col-12 col-sm-12">
                    <input
                        type="text"
                        className="form-control border-0"
                        placeholder="Your Mobile"
                        style={{ height: "55px" }}
                    />
                </div>
                <div className="col-12">
                    <textarea
                        className="form-control border-0"
                        placeholder="Message"
                    ></textarea>
                </div>
                <div className="col-12">
                    <button
                        className="btn btn-primary w-100 py-3"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
}
