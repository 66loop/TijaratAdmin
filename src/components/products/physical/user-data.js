import React, { Component, Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb";
import Modal from "react-responsive-modal";
import { Redirect } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css";
import data from "../../../assets/data/category";
import Datatable from "../../common/datatable";
import { getAllProducts, getAllUserProducts } from "../../../apiService"

export class User_data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.location.userId ? props.location.userId : "",
      open: false,
      userProducts: [],
      products: []

    };
  }
  componentDidMount() {
    const { userId } = this.state
    let allProducts = []
    if (userId !== "") {
      try {
        getAllUserProducts(userId).then(response => {
          if (response.status === 201) {
            console.log("response.data", response.data)
            const { products } = response.data
            if (products.length < 1) {
              window.confirm("There are no products for this user")
            } else {
              this.dateFormated(products)
            }
          }
        })
      } catch (error) {
        console.log("error", error.message)
      }
    } else {
      try {
        getAllProducts().then(response => {
          if (response.status === 201) {
            console.log("response", response.data)
            const { products } = response.data
            if (products.length < 1) {
              window.confirm("There are no products for this user")
            } else {
              this.dateFormated(products)
            }
          }
        })
      } catch (error) {
        console.log("error", error.message)
      }
    }

  }

  dateFormated = (products) => {
    const userProducts = products.map(product => {
      return {
        db_id: product._id,
        image: <img style={{ width: "70px", height: "130px" }} src={product.pictures[0]} alt="ppi" ></img>,
        product: product.name,
        status: product.status,
        category: product.category.name,
        sub_category: product.subCategory.name,
        price: product.price,
        description: product.description
      }
    })
    this.setState({ userProducts, products })
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const token = localStorage.getItem("token")
    if (!token) {
      return (
        <Redirect to="/" />
      )
    }

    const { open, userProducts } = this.state;
    return (
      <Fragment>
        <Breadcrumb title="User products" parent="Physical" />
        {/* <!-- Container-fluid starts--> */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>User Products</h5>
                </div>
                <div className="card-body">
                  <div className="btn-popup pull-right">
                    {/* <button type="button" className="btn btn-primary" onClick={this.onOpenModal} data-toggle="modal" data-original-title="test" data-target="#exampleModal">Add Category</button> */}
                    <Modal open={open} onClose={this.onCloseModal}>
                      <div className="modal-header">
                        <h5
                          className="modal-title f-w-600"
                          id="exampleModalLabel2"
                        >
                          Add Physical Product
                        </h5>
                      </div>
                      <div className="modal-body">
                        <form>
                          <div className="form-group">
                            <label
                              htmlFor="recipient-name"
                              className="col-form-label"
                            >
                              Category Name :
                            </label>
                            <input type="text" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label
                              htmlFor="message-text"
                              className="col-form-label"
                            >
                              Category Image :
                            </label>
                            <input
                              className="form-control"
                              id="validationCustom02"
                              type="file"
                            />
                          </div>
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => this.onCloseModal("VaryingMdo")}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => this.onCloseModal("VaryingMdo")}
                        >
                          Close
                        </button>
                      </div>
                    </Modal>
                  </div>
                  <div className="clearfix"></div>
                  <div id="basicScenario" className="product-physical">
                    {userProducts.length > 0 &&
                      <Datatable
                        multiSelectOption={false}
                        myData={userProducts}
                        pageSize={10}
                        pagination={true}
                        class="-striped -highlight"
                        user={true}
                      />
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Container-fluid Ends--> */}
      </Fragment>
    );
  }
}

export default User_data;
