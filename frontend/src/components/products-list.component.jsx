import React, { Component } from "react";
import ProductDataService from "../services/product.service";
import ProductInfo from "../components/product-info.component";
import { Switch, Route, Link } from "react-router-dom";

class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.retrieveProducts = this.retrieveProducts.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    // this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    // this.refreshList = this.refreshList.bind(this);
    // this.setActiveTutorial = this.setActiveTutorial.bind(this);

    // this.searchTitle = this.searchTitle.bind(this);
  }
  state = {
    products: [],
    // currentTutorial: null,
    // currentIndex: -1,
    // searchTitle: ""
  };
  componentDidMount() {
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
      <React.Fragment>
        <p>Showing products in the database</p>
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
      </React.Fragment>
    );
  }
}

export default ProductsList;
