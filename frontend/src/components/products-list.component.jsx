import React, { Component } from "react";
import ProductDataService from "../services/product.service";
// import { Link } from "react-router-dom";

//  class ProductsList extends Component {

//   onChangeSearchTitle(e) {
//     const searchTitle = e.target.value;

//     this.setState({
//       searchTitle: searchTitle
//     });
//   }

//   refreshList() {
//     this.retrieveTutorials();
//     this.setState({
//       currentTutorial: null,
//       currentIndex: -1
//     });
//   }

//   setActiveTutorial(tutorial, index) {
//     this.setState({
//       currentTutorial: tutorial,
//       currentIndex: index
//     });
//   }

//   removeAllTutorials() {
//     TutorialDataService.deleteAll()
//       .then(response => {
//         console.log(response.data);
//         this.refreshList();
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

//   searchTitle() {
//     this.setState({
//       currentTutorial: null,
//       currentIndex: -1
//     });

//     TutorialDataService.findByTitle(this.state.searchTitle)
//       .then(response => {
//         this.setState({
//           tutorials: response.data
//         });
//         console.log(response.data);
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

//   render() {
//     const { searchTitle, tutorials, currentTutorial, currentIndex } = this.state;

//     return (
//       <div className="list row">
//         <div className="col-md-8">
//           <div className="input-group mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Search by title"
//               value={searchTitle}
//               onChange={this.onChangeSearchTitle}
//             />
//             <div className="input-group-append">
//               <button
//                 className="btn btn-outline-secondary"
//                 type="button"
//                 onClick={this.searchTitle}
//               >
//                 Search
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-6">
//           <h4>Tutorials List</h4>

//           <ul className="list-group">
//             {tutorials &&
//               tutorials.map((tutorial, index) => (
//                 <li
//                   className={
//                     "list-group-item " +
//                     (index === currentIndex ? "active" : "")
//                   }
//                   onClick={() => this.setActiveTutorial(tutorial, index)}
//                   key={index}
//                 >
//                   {tutorial.title}
//                 </li>
//               ))}
//           </ul>

//           <button
//             className="m-3 btn btn-sm btn-danger"
//             onClick={this.removeAllTutorials}
//           >
//             Remove All
//           </button>
//         </div>
//         <div className="col-md-6">
//           {currentTutorial ? (
//             <div>
//               <h4>Tutorial</h4>
//               <div>
//                 <label>
//                   <strong>Title:</strong>
//                 </label>{" "}
//                 {currentTutorial.title}
//               </div>
//               <div>
//                 <label>
//                   <strong>Description:</strong>
//                 </label>{" "}
//                 {currentTutorial.description}
//               </div>
//               <div>
//                 <label>
//                   <strong>Status:</strong>
//                 </label>{" "}
//                 {currentTutorial.published ? "Published" : "Pending"}
//               </div>

//               <Link
//                 to={"/tutorials/" + currentTutorial.id}
//                 className="badge badge-warning"
//               >
//                 Edit
//               </Link>
//             </div>
//           ) : (
//             <div>
//               <br />
//               <p>Please click on a Tutorial...</p>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }
// }

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
      </React.Fragment>
    );
  }
}

export default ProductsList;
