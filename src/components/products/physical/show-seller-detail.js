import React, { Component, Fragment } from "react";
import { addAdvertisement, approveSeller, editAdvertisement } from "../../../apiService";
import Breadcrumb from "../../common/breadcrumb";
import logo from "../../../assets/images/dashboard/boy-2.png";
import ReactStars from "react-rating-stars-component";

export class Show_Seller_Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seller: {},
    };
  }

  componentDidMount() {
    console.log(this.props, "these are props");
    if (this.props.location && this.props.location.state) {
      this.setState({
        seller: this.props.location.state.seller,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Fragment>
        <Breadcrumb title="Seller Details" parent="Physical" />
        {/* <!-- Container-fluid starts--> */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 col-12">
              <div className="card">
                <div className="card-body">
                  <div className="modal-header">
                    <h5 className="modal-title f-w-600" id="exampleModalLabel2">
                      Seller Details
                    </h5>
                  </div>
                    <div className="row selle-detail-main">
                      <div style={{ display: "ïnline" }}>
                        {this.state.seller && this.state.seller.shopImageUrl && (
                          <img
                            src={this.state.seller.shopImageUrl}
                            alt="Profile"
                            style={{
                              width: "100%",
                              height: "200px",
                              objectFit: "contain",
                              padding: 10,
                            }}
                          />
                        )}
                      </div>
                      <div
                        className="seller-detail-div1"
                        style={{ padding: 20, paddingTop: 10 }}
                      >
                        <div className="seller-details-text d-inline">
                          <div className="my-2 d-inline">
                            {this.state.seller.name}
                          </div>
                          <br />
                          <br />
                          <br />
                          <br />

                          <div className="top-sec">
                            <p style={{ fontWeight: "bold" }}>
                              Current Payment methods
                            </p>
                          </div>
                          <table className="table table-responsive-sm mb-0">
                            <thead>
                              <tr className="order-tableRow">
                                <th scope="col">Payment Method</th>
                                <th scope="col">Account Title</th>
                                <th scope="col">Phone Number</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.seller &&
                                this.state.seller.paymentMethods &&
                                this.state.seller.paymentMethods.map((res) => {
                                  return (
                                    <tr>
                                      <td className="list_item">
                                        {res.method}
                                      </td>
                                      <td>{res.accountTitle}</td>
                                      <td>{res.phoneNumber}</td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  <div>
                      <div className="row">
                        <div
                          className="col-md-2 seller-reviews"
                          style={{ borderBottom: "3px solid blue" }}
                        >
                          Verfication status
                        </div>
                        <div
                          className="col-md-2 seller-details-text"
                          style={{ fontSize: "0.9rem" }}
                        ></div>
                      </div>
                      <div style={{ display: "flex" }}>
                        <div>
                          {this.state.seller && this.state.seller.cnicFI && (
                            <img
                              src={this.state.seller.cnicFI}
                              alt="Profile"
                              style={{
                                padding: 10,
                                width: 436,
                                maxHeight: 300,
                                objectFit: "contain",
                              }}
                            />
                          )}
                        </div>
                        <div>
                          {this.state.seller && this.state.seller.cnicBI && (
                            <img
                              src={this.state.seller.cnicBI}
                              alt="Profile"
                              style={{
                                padding: 10,
                                width: 436,
                                maxHeight: 300,
                                objectFit: "contain",
                              }}
                            />
                          )}
                        </div>
                      </div>
                    
                    {this.state.seller && !this.state.seller.verified && (
                      <div>
                        <p>Seller is not verified yet.</p>
                        <button className="btn form-group" onClick={() => {
                          approveSeller(this.state.seller._id, true)
                          .then(res => {
                            if (res.status === 201) {
                              this.props.history.push(`${process.env.PUBLIC_URL}/sellers`);
                            }
                          })
                          .catch(err => {
                            console.log(err, 'error while updating status')
                          })
                        }} >approve</button>
                      </div>
                    )}
                    {this.state.seller && this.state.seller.verified && (
                      <div>
                        <p>Verified Seller.</p>
                      </div>
                    )}
                  </div>
                    <div className="row">
                      <div
                        className="col-md-2 seller-reviews"
                        style={{ borderBottom: "3px solid blue" }}
                      >
                        Reviews (
                        {this.state.seller &&
                          this.state.seller.reviews &&
                          this.state.seller.reviews.length}
                        )
                      </div>
                      <div
                        className="col-md-2 seller-details-text"
                        style={{ fontSize: "0.9rem" }}
                      ></div>
                    </div>
                  <div className="py-3">
                    <div className="row seller-detail-main2">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="row">
                          {this.state.seller &&
                            this.state.seller.reviews &&
                            this.state.seller.reviews.map((item) => {
                              return (
                                <div className="col-md-11 mx-auto bg-white shadowDiv">
                                  <div className="row">
                                    <div className="col-md-7">
                                      <ReactStars
                                        count={5}
                                        size={24}
                                        value={item.rating}
                                        edit={false}
                                        activeColor="#ffd700"
                                      />
                                    </div>
                                  </div>
                                  <div className="feedback-text">
                                    <br />
                                    {item.ratingText}
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="clearfix"></div>
                  <div id="basicScenario" className="product-physical"></div>
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

export default Show_Seller_Details;
