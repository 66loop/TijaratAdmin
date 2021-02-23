import React, { Component, Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";

export class CustomizeFooter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <Fragment>
        <Breadcrumb title="Customize Footer" parent="Physical" />
        {/* <!-- Container-fluid starts--> */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="modal-header">
                    <h5 className="modal-title f-w-600" id="exampleModalLabel2">
                      Customize Footer
                    </h5>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="form-group">
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                          Title :
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                          Text :
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="message-text"
                          className="col-form-label"
                        >
                          Color :
                        </label>
                        <input
                          className="form-control"
                          id="validationCustom02"
                          type="text"
                        />
                      </div>
                      <div className="form-group text-center">
                        <input
                          type="submit"
                          className="btn"
                          style={{ backgroundColor: "#01E49F" }}
                          value="Update"
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

export default CustomizeFooter;
