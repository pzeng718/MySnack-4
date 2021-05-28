import React, { Component } from "react";
import ProductDataService from "../services/product.service";

class ProductInfo extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeQty = this.onChangeQty.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeManufacturer = this.onChangeManufacturer.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.edited = false;

    this.state = {
      currentProduct: {
        name: "",
        price: null,
        qty: null,
        description: "",
        manufacturer: "",
      },
    };
  }

  updateProduct() {
    if (this.edited) {
      console.log("updating product");
      const { currentProduct } = this.state;
      ProductDataService.update(this.props.match.params.id, currentProduct)
        .then((response) => {
          console.log(response);
          alert(`Product ${currentProduct.name} updated successfully.`);
          window.location.href = "/";
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      alert("You have to make changes first before you can update.");
    }
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function (prevState) {
      this.edited = true;
      return {
        currentProduct: {
          ...prevState.currentProduct,
          name: name,
        },
      };
    });
  }

  onChangePrice(e) {
    const price = e.target.value;

    this.setState(function (prevState) {
      this.edited = true;
      return {
        currentProduct: {
          ...prevState.currentProduct,
          price: price,
        },
      };
    });
  }

  onChangeQty(e) {
    const qty = e.target.value;

    this.setState(function (prevState) {
      this.edited = true;
      return {
        currentProduct: {
          ...prevState.currentProduct,
          qty: qty,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState(function (prevState) {
      this.edited = true;
      return {
        currentProduct: {
          ...prevState.currentProduct,
          description: description,
        },
      };
    });
  }

  onChangeManufacturer(e) {
    const manufacturer = e.target.value;

    this.setState(function (prevState) {
      this.edited = true;
      return {
        currentProduct: {
          ...prevState.currentProduct,
          manufacturer: manufacturer,
        },
      };
    });
  }

  getProduct(id) {
    ProductDataService.get(id)
      .then((response) => {
        this.setState({
          currentProduct: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  componentDidMount() {
    this.getProduct(this.props.match.params.id);
  }

  render() {
    const { currentProduct } = this.state;
    return (
      <div>
        <h3>Updating product information</h3>
        <div className="form-group">
          <label htmlFor="edit-product-name">Product Name</label>
          <input
            style={{ width: 400 }}
            type="text"
            name="edit-product-name"
            id="edit-product-name"
            className="form-control"
            value={currentProduct.name}
            onChange={this.onChangeName}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="edit-product-price">Product Price</label>
          <input
            style={{ width: 400 }}
            type="number"
            name="edit-product-price"
            id="edit-product-price"
            className="form-control"
            value={currentProduct.price}
            onChange={this.onChangePrice}
            required
          />
        </div>

        <div className="edit-form-group">
          <label htmlFor="product-qty">Product Qty</label>
          <input
            style={{ width: 400 }}
            type="number"
            name="edit-form-group"
            id="edit-form-group"
            className="form-control"
            value={currentProduct.qty}
            onChange={this.onChangeQty}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="edit-product-description">Product Description</label>
          <input
            style={{ width: 600 }}
            type="text"
            name="edit-product-description"
            id="edit-product-description"
            className="form-control"
            value={currentProduct.description}
            onChange={this.onChangeDescription}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="edit-product-manufacturer">
            Product Manufacturer
          </label>
          <input
            style={{ width: 400 }}
            type="text"
            name="edit-product-manufacturer"
            id="edit-product-manufacturer"
            className="form-control"
            value={currentProduct.manufacturer}
            onChange={this.onChangeManufacturer}
            required
          />
        </div>

        <button
          className="btn btn-primary"
          onClick={this.updateProduct}
          id="update-btn"
        >
          Update
        </button>
      </div>
    );
  }
}

export default ProductInfo;
