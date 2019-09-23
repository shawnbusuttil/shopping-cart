import React from "react";

import "./Image.scss";

const Image = (props) => {
    const imageDimensions = {
        width: props.width,
        height: props.height
    }

    return <div style={imageDimensions} className="product-image">
        <img src={props.src} alt={props.alt} />
        {props.children}
    </div>;
};

export default Image;