import React, { Component, Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import "react-toastify/dist/ReactToastify.css";
import ReactTable from "react-table";
import { deleteAdvertisements, getAdvertisements } from "../../apiService";
import { Link } from "react-router-dom";

export class Advertisement_List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      codes: [],
    };
  }

  componentDidMount() {
    getAdvertisements()
      .then((response) => {
        if (response.status === 201) {
          const { codes } = response.data;

          this.dataFormated(codes);
        } else {
          this.setState({ UsersList: [] });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  dataFormated = (data) => {
    console.log(data, "data");

    let formated = data.map((item) => {
      return {
        for: item.for,
        description: item.description,
        _id: item._id,
        codeSnippet: item.codeSnippet,
      };
    });
    this.setState({ codes: formated });
  };

  render() {
    const { codes } = this.state;
    return (
      <Fragment>
        <Breadcrumb title="Advertisement List" parent="Physical" />
        {/* <!-- Container-fluid starts--> */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Advertisement</h5>
                </div>
                <div className="card-body">
                  <div className="clearfix"></div>
                  <div id="basicScenario" className="product-physical">
                    {codes.length > 0 && (
                      <ReactTable
                        data={this.state.codes}
                        columns={[
                          {
                            Header: <b>for</b>,
                            accessor: "for",
                            Cell: "editable",
                            style: {
                              textAlign: "center",
                            },
                          },
                          {
                            Header: <b>description</b>,
                            accessor: "description",
                            Cell: "editable",
                            style: {
                              textAlign: "center",
                            },
                          },
                          {
                            Header: <b>Action</b>,
                            id: "delete",
                            accessor: (str) => "delete",
                            Cell: (row) => (
                              <div>
                                <span
                                  onClick={() => {
                                    deleteAdvertisements(
                                      this.state.codes[row.index]._id
                                    )
                                      .then((response) => {
                                        if (response.status === 201) {
                                          let codes = this.state.codes;
                                          codes.splice(row.index, 1);
                                          this.setState({ codes });
                                        } else {
                                          alert("Something went wrong");
                                        }
                                      })
                                      .catch((err) => {
                                        console.log(err);
                                        alert(JSON.stringify(err));
                                      });
                                  }}
                                >
                                  {/* <Link onClick={() => this.gotoUpdateUser(myData[row.index].DB_id)}> */}
                                  <i
                                    className="fa fa-trash"
                                    style={{
                                      width: 35,
                                      fontSize: 20,
                                      padding: 11,
                                      color: "rgb(40, 167, 69)",
                                    }}
                                  ></i>
                                  {/* </Link>  */}
                                </span>

                                <span>
                                  <Link
                                    // onClick={() =>
                                    //   this.props.history.push({
                                    //     pathname:
                                    //       "/products/physical/customize/Advertisement/id=" +
                                    //       this.state.codes[row.index]._id,
                                    //     states: {
                                    //       adver: this.state.codes[row.index],
                                    //     },
                                    //   })
                                    // }

                                    to={{
                                      pathname: '/products/physical/customize/Advertisement/id=' +
                                      this.state.codes[row.index]._id,
                                      state: { detail: this.state.codes[row.index] }
                                    }}
                                  >
                                    <i
                                      className="fa fa-pencil"
                                      style={{
                                        width: 35,
                                        fontSize: 20,
                                        padding: 11,
                                        color: "rgb(40, 167, 69)",
                                      }}
                                    ></i>
                                  </Link>
                                </span>
                              </div>
                            ),
                            style: {
                              textAlign: "center",
                            },
                            sortable: false,
                          },
                        ]}
                        pagination={false}
                      />
                    )}
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

export default Advertisement_List;
