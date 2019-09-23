import React, { Fragment } from "react";

import "./Product.scss";

import Image from "./../image/Image";

const Product = (props) => {
    let variantView = props.info.variants.length > 1 ? <select className="product-variants" onChange={props.variantChange}>
        {props.info.variants.map(variant => <option value={variant.pricePerUnit}>
            {variant.measurement.displayName}
        </option>)}
    </select> : <p className="product-measurement">{props.info.measurement.displayName}</p>;

    let price = props.info.salePrice ? <div className="product-price-info">
        {props.info.saleText ? <p className="product-price-discount">{props.info.saleText}</p> : null}
        <p className="product-price-old">&#163;{(props.info.price.pence / 100).toFixed(2)}</p>
        <p className="product-price-new">&#163;{(props.info.salePrice.pence / 100).toFixed(2)}</p>
    </div>: <p className="product-price-info">&#163;{(props.info.price.pence / 100).toFixed(2)}</p>;

    let pricingView = <Fragment>
        {price}
        {props.info.pricePerUnit ? <p className="product-price-unit">{props.info.pricePerUnit}</p> : null}
    </Fragment>;

    let controlsView = props.quantity > 0 ? <div>
        <button className="product-controls-box product-controls-decrement" onClick={props.removeItem}>-</button>
        <span className="product-controls-counter">{props.quantity}</span>
        <button className="product-controls-box product-controls-increment" onClick={props.addItem}>+</button>
    </div> : <button className="product-controls-add" onClick={props.addItem}>Add</button>

    return <div className="product">
        <Image src={props.info.media[0].url} alt={props.info.name} width="100%" height="40%">
            {props.info.tag ? <span className="product-tag">{props.info.tag}</span> : null}
            {props.quantity > 0 ? <div className="overlay">{`${props.quantity} in basket`}</div> : null}
        </Image>
        <div className="product-info">
            <div className="product-details">
                <h3 className="product-name">{props.info.name}</h3>
                <p className="product-producer">{props.info.producer.name}</p>
                {variantView}
            </div>
            <div className="product-price">
                {pricingView}
            </div>
        </div>
        <div className="product-controls">
            <span className="product-controls-box"></span>
            {controlsView}
        </div>
    </div>
};

export default Product;