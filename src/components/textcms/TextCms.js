import React, { Component, Fragment } from "react";
import { addTextCms, editTextCms } from "../../apiService";
import Breadcrumb from "../common/breadcrumb";

export class TextCMS extends Component {
  constructor(props) {
    super(props);

    this.state = {
      section: "",
      key: "",
      value: "",
      error: "",
      _id: "",
    };
  }

  componentDidMount() {
    console.log(this.props, "these are props");
    if (this.props.location && this.props.location.state) {
      this.setState({
        section: this.props.location.state.detail.section,
        key: this.props.location.state.detail.key,
        value: this.props.location.state.detail.value,
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
        <Breadcrumb title="Customize Text Cms" parent="Physical" />
        {/* <!-- Container-fluid starts--> */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="modal-header">
                    <h5 className="modal-title f-w-600" id="exampleModalLabel2">
                      Customize Text Cms
                    </h5>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="form-group">
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                          Section :
                        </label>
                        <input
                          name="section"
                          value={this.state.section}
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
                          key :
                        </label>
                        <input
                          name="key"
                          value={this.state.key}
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
                          value :
                        </label>
                        <input
                          className="form-control"
                          id="validationCustom02"
                          type="text"
                          name="value"
                          value={this.state.value}
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
                              this.state.section &&
                              this.state.key &&
                              this.state.value
                            ) {
                              const body = {
                                section: this.state.section,
                                key: this.state.key,
                                value: this.state.value,
                              };

                              if (this.state._id) {
                                editTextCms(this.state._id, body)
                                  .then((response) => {
                                    if (response.status === 201) {
                                      this.props.history.push(
                                        "/products/physical/customize/footer_list"
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
                                addTextCms(body)
                                  .then((response) => {
                                    if (response.status === 201) {
                                      this.props.history.push(
                                        "/products/physical/customize/footer_list"
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

export default TextCMS;
