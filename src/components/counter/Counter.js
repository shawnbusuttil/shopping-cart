import React from "react";

import "./Counter.scss";

const Counter = (props) => (
    <a href="#" className="counter">
        <img src={props.image} />
        <span>{props.count}</span>
    </a>
);

export default Counter;