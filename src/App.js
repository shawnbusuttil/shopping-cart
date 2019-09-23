import React, { Fragment } from 'react';
import { connect } from "react-redux";

import ProductList from "./containers/product-list/ProductList";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Counter from "./components/counter/Counter";

import icon from "./icons/basket.svg";

const App = (props) => {
  return <Fragment>
    <Header logo="logo.svg" />
    <Navbar>
      <Counter count={props.numOfItems} image={icon} />
    </Navbar>
    <ProductList />
  </Fragment>
}

const mapStateToProps = (state) => {
  return {
      numOfItems: state.cart.size
  };
}

export default connect(mapStateToProps)(App);
