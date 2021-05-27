module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    name: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.DOUBLE
    },
    qty: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.STRING
    },
    manufacturer: {
      type: Sequelize.STRING
    },
    
    // createdAt: {
    //   type: Sequelize.DATE,
    //   allowNull: true
    // },
    // updatedAt: {
    //   type: Sequelize.DATE,
    //   allowNull: true
    // }
  }, {
    timestamps: false
  });

  return Product;
};


