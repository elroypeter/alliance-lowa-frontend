import React from "react";
import WebBreadCrumb from "../../components/WebBreadCrumb/WebBreadCrumb";
import Management from "./Management";
import OurHistory from "./OurHistory";

export default function WhoWeAre() {
    return (
        <>
            <WebBreadCrumb page="Who We Are" />
            <OurHistory />
            <Management />
        </>
    );
}
