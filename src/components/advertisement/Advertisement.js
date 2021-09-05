import React, { Component, Fragment } from "react";
import { addAdvertisement, editAdvertisement } from "../../apiService";
import Breadcrumb from "../common/breadcrumb";

export class Advertisement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      for: "",
      description: "",
      codeSnippet: "",
      error: "",
      _id: "",
    };
  }

  componentDidMount() {
    console.log(this.props, "these are props");
    if (this.props.location && this.props.location.state) {
      this.setState({
        codeSnippet: this.props.location.state.detail.codeSnippet,
        description: this.props.location.state.detail.description,
        for: this.props.location.state.detail.for,
        _id: this.props.location.state.detail._id,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Fragment>
        <Breadcrumb title="Customize Advertisement" parent="Physical" />
        {/* <!-- Container-fluid starts--> */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="modal-header">
                    <h5 className="modal-title f-w-600" id="exampleModalLabel2">
                      Customize Advertisement
                    </h5>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="form-group">
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                          For :
                        </label>
                        <input
                          name="for"
                          value={this.state.for}
                          onChange={(e) => this.onChange(e)}
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                          Description :
                        </label>
                        <input
                          name="description"
                          value={this.state.description}
                          onChange={(e) => this.onChange(e)}
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="message-text"
                          className="col-form-label"
                        >
                          Code snippet :
                        </label>
                        <textarea
                          className="form-control"
                          id="validationCustom02"
                          type="text"
                          name="codeSnippet"
                          value={this.state.codeSnippet}
                          onChange={(e) => this.onChange(e)}
                        />
                      </div>

                      <div className="form-group">{this.state.error}</div>
                      <div className="form-group text-center">
                        <input
                          className="btn"
                          style={{ backgroundColor: "#01E49F" }}
                          value="Submit"
                          onClick={() => {
                            this.setState({ error: "" });
                            if (
                              this.state.for &&
                              this.state.description &&
                              this.state.codeSnippet
                            ) {
                              const body = {
                                for: this.state.for,
                                description: this.state.description,
                                codeSnippet: this.state.codeSnippet,
                              };

                              if (this.state._id) {
                                editAdvertisement(this.state._id, body)
                                  .then((response) => {
                                    if (response.status === 201) {
                                      this.props.history.push(
                                        "/products/physical/customize/Advertisement_list"
                                      );
                                    } else {
                                      this.setState({
                                        error: "something went wrong",
                                      });
                                    }
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                    this.state({ error: JSON.stringify(err) });
                                  });
                              
                              } else {
                                addAdvertisement(body)
                                  .then((response) => {
                                    if (response.status === 201) {
                                      this.props.history.push(
                                        "/products/physical/customize/Advertisement_list"
                                      );
                                    } else {
                                      this.setState({
                                        error: "something went wrong",
                                      });
                                    }
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                    this.state({ error: JSON.stringify(err) });
                                  });
                              }
                            } else {
                              this.setState({
                                error: "Please fill in all fields.",
                              });
                            }
                          }}
                        />
                      </div>
                    </form>
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

export default Advertisement;
