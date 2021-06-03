import React, { Component } from "react";
import ProductDataService from "../services/product.service";
import ProductInfo from "../components/product-info.component";
import { Switch, Route, Link } from "react-router-dom";

class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.retrieveProducts = this.retrieveProducts.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.handleChangeMinPrice = this.handleChangeMinPrice.bind(this);
    this.handleChangeMaxPrice = this.handleChangeMaxPrice.bind(this);
    this.handleChangeMinQty = this.handleChangeMinQty.bind(this);
    this.handleChangeMaxQty = this.handleChangeMaxQty.bind(this);
    this.filterPrice = this.filterPrice.bind(this);
    this.filterQty = this.filterQty.bind(this);
    this.resetState = this.resetState.bind(this);
  }
  state = {
    products: [],
    minPrice: "",
    maxPrice: "",
    minQty: "",
    maxQty: "",
  };
  componentDidMount() {
    this.retrieveProducts();
  }

  searchTitle(title) {
    ProductDataService.findByTitle(title)
      .then((response) => {
        this.setState({
          products: response.data.filter((data) => {
            if (data.name.toLowerCase().includes(title.toLowerCase()))
              // search term is case-sensitive
              return data;
          }),
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handleChangeMinPrice(event) {
    console.log("e", event);
    this.setState({
      ...this.state,
      minPrice: event && event.target ? event.target.value : "",
    });
  }

  handleChangeMaxPrice(event) {
    this.setState({
      ...this.state,
      maxPrice: event && event.target ? event.target.value : "",
    });
  }

  handleChangeMinQty(event) {
    this.setState({
      ...this.state,
      minQty: event && event.target ? event.target.value : "",
    });
  }

  handleChangeMaxQty(event) {
    this.setState({
      ...this.state,
      maxQty: event && event.target ? event.target.value : "",
    });
  }

  filterPrice(e) {
    e.preventDefault();
    const minPrice = this.state.minPrice;
    const maxPrice = this.state.maxPrice;
    console.log("Min Price: " + minPrice + " Max Price: " + maxPrice);
    ProductDataService.filterByPrice(minPrice, maxPrice)
      .then((response) => {
        this.setState({
          ...this.state,
          products: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  filterQty(e) {
    e.preventDefault();
    const minQty = this.state.minQty;
    const maxQty = this.state.maxQty;
    console.log("Min Qty: " + minQty + " Max Qty: " + maxQty);
    ProductDataService.filterByQty(minQty, maxQty)
      .then((response) => {
        this.setState({
          ...this.state,
          products: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  resetState() {
    this.setState({
      minPrice: "",
      maxPrice: "",
      minQty: "",
      maxQty: "",
    });
    this.retrieveProducts();
  }

  retrieveProducts() {
    ProductDataService.getAll()
      .then((response) => {
        this.setState({
          products: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteProduct(id) {
    ProductDataService.delete(id)
      .then((response) => {
        console.log(response.data);
        this.setState({
          products: this.state.products.filter((product) => product.id !== id),
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateProduct(id) {}

  render() {
    const { products } = this.state;
    return (
      <div>
        <p className="product-list-heading">Showing products in the database</p>
        <input
          className="search-box"
          type="text"
          placeholder="Type to search"
          onChange={(event) => {
            this.searchTitle(event.target.value);
          }}
        />

        <div className="filter-container">
          <form>
            <label className="filter-label">Min price</label>
            <input
              type="text"
              className="filter-box"
              name="min-value"
              //  placeholder="minimum price"
              value={this.state.minPrice}
              onChange={this.handleChangeMinPrice}
            />
            <label className="filter-label">Max price</label>
            <input
              type="text"
              className="filter-box"
              name="max-value"
              //  placeholder="maximum price"
              value={this.state.maxPrice}
              onChange={this.handleChangeMaxPrice}
            />
            <button className="filter-btn" onClick={this.filterPrice}>
              Filter
            </button>
            <button className="filter-btn" onClick={this.resetState}>
              Clear
            </button>
          </form>
        </div>

        <div className="filter-container">
          <form>
            <label className="filter-label">Min Qty</label>
            <input
              type="text"
              className="filter-box"
              name="min-qty"
              //  placeholder="minimum price"
              value={this.state.minQty}
              onChange={this.handleChangeMinQty}
            />
            <label className="filter-label">Max Qty</label>
            <input
              type="text"
              className="filter-box"
              name="max-qty"
              //  placeholder="maximum price"
              value={this.state.maxQty}
              onChange={this.handleChangeMaxQty}
            />
            <button className="filter-btn" onClick={this.filterQty}>
              Filter
            </button>
            <button className="filter-btn" onClick={this.resetState}>
              Clear
            </button>
          </form>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>Manufacturer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.qty}</td>
                <td>{product.description}</td>
                <td>{product.manufacturer}</td>
                <Link
                  to={"/products/" + product.id}
                  className="btn btn-warning"
                  style={{ height: 32, width: 60, marginRight: 10 }}
                >
                  Edit
                </Link>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => this.deleteProduct(product.id)}
                >
                  Delete
                </button>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="container mt-3">
          <Switch>
            <Route path="/products/:id" component={ProductInfo} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default ProductsList;
