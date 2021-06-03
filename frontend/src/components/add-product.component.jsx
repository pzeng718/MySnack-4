import React, { Component } from "react";
import ProductDataService from "../services/product.service";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.addProduct = this.addProduct.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeQty = this.onChangeQty.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeManufacturer = this.onChangeManufacturer.bind(this);

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
  addProduct() {
    var data = {
      name: this.state.currentProduct.name,
      price: this.state.currentProduct.price,
      qty: this.state.currentProduct.qty,
      description: this.state.currentProduct.description,
      manufacturer: this.state.currentProduct.manufacturer,
    };
    ProductDataService.create(data)
      .then((response) => {
        alert("Product added successfully.");
        console.log("product added");
        window.location.href = "/";
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function (prevState) {
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
      return {
        currentProduct: {
          ...prevState.currentProduct,
          manufacturer: manufacturer,
        },
      };
    });
  }

  render() {
    const { currentProduct } = this.state;
    return (
      <div>
        <h3>This is the page for you to add a product.</h3>
        <div class="form-group">
          <label htmlFor="product-name">Product Name</label>
          <input
            style={{ width: 400 }}
            type="text"
            name="product-name"
            id="product-name"
            className="form-control"
            value={currentProduct.name}
            onChange={this.onChangeName}
            required
          />
        </div>

        <div class="form-group">
          <label htmlFor="product-price">Product Price</label>
          <input
            style={{ width: 400 }}
            type="number"
            name="product-price"
            id="product-price"
            className="form-control"
            value={currentProduct.price}
            onChange={this.onChangePrice}
          />
        </div>

        <div class="form-group">
          <label htmlFor="product-qty">Product Quantity</label>
          <input
            style={{ width: 400 }}
            type="number"
            name="product-qty"
            id="product-qty"
            className="form-control"
            value={currentProduct.qty}
            onChange={this.onChangeQty}
          />
        </div>

        <div class="form-group">
          <label htmlFor="product-description">Product Description</label>
          <input
            style={{ width: 600 }}
            type="text"
            name="product-description"
            id="product-description"
            className="form-control"
            value={currentProduct.description}
            onChange={this.onChangeDescription}
          />
        </div>

        <div class="form-group">
          <label htmlFor="product-manufacturer">Product Manufacturer</label>
          <input
            style={{ width: 400 }}
            type="text"
            name="product-manufacturer"
            id="product-manufacturer"
            className="form-control"
            value={currentProduct.manufacturer}
            onChange={this.onChangeManufacturer}
          />
        </div>

        <button class="btn btn-primary" onClick={this.addProduct}>
          Add
        </button>
      </div>
    );
  }
}

export default AddProduct;
