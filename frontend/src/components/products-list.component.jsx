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
    this.handleChangeMin = this.handleChangeMin.bind(this);
    this.handleChangeMax = this.handleChangeMax.bind(this);
    this.filterPrice = this.filterPrice.bind(this);
    this.resetState = this.resetState.bind(this);
  }
  state = {
    products: [],
    min: "",
    max: ""

  };
  componentDidMount() {
    this.retrieveProducts();
  }

  searchTitle(title) {
    ProductDataService.findByTitle(title)
      .then((response) => {
        this.setState({
          products: response.data.filter((data) => {
            if (data.name.toLowerCase().includes(title.toLowerCase())) // search term is case-sensitive
              return data
          }),
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handleChangeMin(event) {
    console.log('e', event)
    this.setState({
      ...this.state,
      min: event && event.target ? event.target.value : '',
    });
  }

  handleChangeMax(event) {
    this.setState({
      ...this.state,
      max: event && event.target ? event.target.value : '',
    });
  }

  filterPrice(e) {
    e.preventDefault();
    const min = this.state.min;
    const max = this.state.max;
    console.log("Min: " + min + " Max: " + max);
    ProductDataService.filterByPrice(min, max)
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
      min: '',
      max: '',
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

  updateProduct(id) { }

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
            <input type="text"
              className="filter-box"
              name="min-value"
              //  placeholder="minimum price"  
              value={this.state.min}
              onChange={this.handleChangeMin}

            />
            <label className="filter-label">Max price</label>
            <input type="text"
              className="filter-box"
              name="max-value"
              //  placeholder="maximum price" 
              value={this.state.max}
              onChange={this.handleChangeMax}

            />
            <button className="filter-btn" 
                    onClick={this.filterPrice}>Filter</button>
            <button className="filter-btn" 
                    onClick={this.resetState}>Clear</button>
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
