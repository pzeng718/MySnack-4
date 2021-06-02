import React, { Component } from "react";
import ProductDataService from "../services/product.service";
import ProductInfo from "../components/product-info.component";
import { Switch, Route, Link } from "react-router-dom";

class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.retrieveProducts = this.retrieveProducts.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    // this.onChangeSearch Title = this.onChangeSearchTitle.bind(this);
    // this.refreshList = this.refreshList.bind(this);
    // this.setActiveTutorial = this.setActiveTutorial.bind(this);

    this.searchTitle = this.searchTitle.bind(this);
    this.filterPrice = this.filterPrice.bind(this);
  }
  state = {
    products: [],
    min: "", max: ""
    // currentTutorial: null,
    // currentIndex: -1,
    // searchTitle: ""
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

    filterPrice(min, max) {
      //console.log("Min: " + min + " Max: " + max);
    ProductDataService.filterByPrice(min, max)
        .then((response) => {
            this.setState({
                products: response.data.filter((data) => {
                    if (data.price >= min && data.price <= max)
                        return data
                }),
            });
        })
        .catch((e) => {
            console.log(e);
        });
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
          <form method="get"> Price
              <input id="low-price" type="text" placeholder="Min" name="low-price"
                     onChange={event => {this.setState({min: event.target.value }); }} />
              <input id="high-price" type="text" placeholder="Max" name="high-price"
                     onChange={event => {this.setState({max: event.target.value }); }} />
              <button onClick={this.filterPrice(this.state.min, this.state.max)} >Go</button>
          </form>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>Manufacturer</th>
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
