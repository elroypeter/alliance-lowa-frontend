import React from "react";
import { Link } from "react-router-dom";

export default function QuickLinks() {
    return (
        <div className="col-lg-4 col-md-6">
            <h4 className="text-light mb-4">Quick Links</h4>
            <Link className="btn btn-link" to={"/who-we-are"}>
                About Us
            </Link>
            <Link className="btn btn-link" to={"/contact-us"}>
                Contact Us
            </Link>
            <Link className="btn btn-link" to={"/what-we-do"}>
                Projects
            </Link>
            <Link className="btn btn-link" to={"/new-and-careers"}>
                {"News & Careers"}
            </Link>
        </div>
    );
}
