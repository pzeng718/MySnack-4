const { isEmpty } = require("lodash");
const { sequelize } = require("../models");
const db = require("../models");
const Product = db.product;
const Op = db.Sequelize.Op;

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  console.log("request body is ", req);
  if (isEmpty(req.body)) {
    res.status(400).send({
      message: "Body Content can not be empty!"
    });
  }
  else {
    // Create a Product
    const product = {
      name: req.body.name,
      price: req.body.price,
      qty: req.body.qty,
      description: req.body.description,
      manufacturer: req.body.manufacturer
    };
    console.log("Name, price, qty, desc, manu: ");
    // Save Product in the database
    Product.create(product)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
  }
  console.log("Recently added product: ");
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  console.log("FIND ALL product: ");

  let minPrice = req.query.min_price;
  let maxPrice = req.query.max_price;
  console.log("Min: ", minPrice)
  console.log("Max ", maxPrice)

  if (minPrice && maxPrice) {
    Product.findAll({
      where: { price: { [Op.between]: [minPrice, maxPrice] } }

    })
      .then(data => {
        res.send(data);
      })
  } else {
    Product.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
  }

};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Product with id=" + id
      });
    });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Product.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Product with id=" + id
      });
    });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Product with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id
      });
    });
};

// Delete all Products from the database.
// exports.deleteAll = (req, res) => {
//   Product.destroy({
//     where: {},
//     truncate: false
//   })
//     .then(nums => {
//       // res.send({ message: `${nums} All Products were deleted successfully!` });
//       res.send({ message: `All Products were deleted successfully!` });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all products."
//       });
//     });
// };




