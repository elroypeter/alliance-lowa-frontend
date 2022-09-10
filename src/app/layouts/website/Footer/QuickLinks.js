import React from "react";
import { Link } from "react-router-dom";

export default function QuickLinks() {
    return (
        <div className="col-lg-4 col-md-6">
            <h4 className="text-light mb-4">Quick Links</h4>
            <Link className="btn btn-link" to={""}>
                About Us
            </Link>
            <Link className="btn btn-link" to={""}>
                Contact Us
            </Link>
            <Link className="btn btn-link" to={""}>
                Make Donation
            </Link>
            <Link className="btn btn-link" to={""}>
                Projects
            </Link>
            <Link className="btn btn-link" to={""}>
                Services
            </Link>
            <Link className="btn btn-link" to={""}>
                {"News & Careers"}
            </Link>
        </div>
    );
}
