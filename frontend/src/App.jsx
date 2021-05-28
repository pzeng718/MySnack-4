import React, { Component } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import ProductInfo from "./components/product-info.component";
import ProductsList from "./components/products-list.component.jsx";
import AddProduct from "./components/add-product.component.jsx";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink
                activeStyle={{
                  backgroundColor: "orange",
                  color: "white",
                }}
                exact
                to={"/"}
                className="nav-link"
              >
                All Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeStyle={{
                  backgroundColor: "orange",
                  color: "white",
                }}
                exact
                to={"/add"}
                className="nav-link"
              >
                Add Product
              </NavLink>
            </li>

            {/* <li className="nav-item">
              <NavLink
                activeStyle={{
                  backgroundColor: "orange",
                  color: "white",
                }}
                exact
                to={"/products/1"}
                className="nav-link"
              >
                First product
              </NavLink>
            </li> */}
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route path="/" exact component={ProductsList} />
            <Route exact path="/add" component={AddProduct} />
            <Route path="/products/:id" component={ProductInfo} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
