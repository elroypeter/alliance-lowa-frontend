import React from "react";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export const NavContext = React.createContext({
    name: "Home",
    link: "/admin",
    icon: faHome,
});
