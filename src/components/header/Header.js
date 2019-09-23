import React from "react";

import "./Header.scss";

const Header = (props) => (
    <header>
        <img src={props.logo} alt="logo" />
    </header>
);

export default Header;