import React, { Component, Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb";
import Modal from "react-responsive-modal";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router-dom";
// import UsersList from "../../../assets/data/usersList";
import UserDatatable from "../../common/UserDatatable";
import { getAllSellers } from "../../../apiService";
import ReactTable from "react-table";

export class Seller_list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      UsersList: [],
      users: [],
    };
  }

  componentDidMount() {
    getAllSellers()
      .then((response) => {
        if (response.status === 201) {
          const { sellers } = response.data;
          console.log("users", sellers);
          // this.dataFormated(users);
          this.setState({ users: sellers });
        } else {
          this.setState({ UsersList: [] });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onChange(e) {
    console.log("hasbhjas", e.name);
    if (e.name === "byname") {
      const { users } = this.state;
      const inputValue = e.value.trim().toLowerCase();
      console.log("inputValue", inputValue);

      const inputLength = inputValue.length;
      const fitertUser =
        inputLength === 0
          ? users
          : users.filter(
              (user) =>
                user.firstName.toLowerCase().slice(0, inputLength) ===
                inputValue
            );
      console.log(fitertUser.length);
      this.dataFormated(fitertUser);
    } else {
      const { users } = this.state;
      const inputValue = e.value.trim().toLowerCase();
      const inputLength = inputValue.length;
      const fitertUser =
        inputLength === 0
          ? users
          : users.filter(
              (user) =>
                user.email.toLowerCase().slice(0, inputLength) === inputValue
            );
      this.dataFormated(fitertUser);
    }
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const token = localStorage.getItem("token");
    if (!token) {
      return <Redirect to="/" />;
    }

    const { open, UsersList } = this.state;
    console.log("ashdajshdj", UsersList);
    return (
      <Fragment>
        <Breadcrumb title="Users List" parent="Physical" />
        {/* <!-- Container-fluid starts--> */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Sellers List</h5>
                </div>
                <div className="card-body">
                  <div className="clearfix"></div>
                  <div id="basicScenario" className="product-physical">
                    {this.state.users.length > 0 && (
                      <ReactTable
                        data={this.state.users}
                        columns={[
                          {
                            Header: <b>email</b>,
                            accessor: "email",
                            Cell: "editable",
                            style: {
                              textAlign: "center",
                            },
                          },
                          {
                            Header: <b>Shop Name</b>,
                            accessor: "shopName",
                            Cell: "editable",
                            style: {
                              textAlign: "center",
                            },
                          },
                          {
                            Header: <b>name</b>,
                            accessor: "name",
                            Cell: "editable",
                            style: {
                              textAlign: "center",
                            },
                          },
                          {
                            Header: <b>rating</b>,
                            accessor: "rating",
                            Cell: "editable",
                            style: {
                              textAlign: "center",
                            },
                          },
                          {
                            Header: <b>First Name</b>,
                            accessor: "firstName",
                            Cell: "editable",
                            style: {
                              textAlign: "center",
                            },
                          },
                          {
                            Header: <b>Last Name</b>,
                            accessor: "lastName",
                            Cell: "editable",
                            style: {
                              textAlign: "center",
                            },
                          },
                          {
                            Header: <b>country</b>,
                            accessor: "country",
                            Cell: "editable",
                            style: {
                              textAlign: "center",
                            },
                          },
                          {
                            Header: <b>city</b>,
                            accessor: "city",
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
                                    this.props.history.push(`${process.env.PUBLIC_URL}/seller-details`, {seller: this.state.users[row.index]});
                                  }}
                                >
                                  <i
                                    className="fa fa-eye"
                                    style={{
                                      width: 35,
                                      fontSize: 20,
                                      padding: 11,
                                      color: "rgb(40, 167, 69)",
                                    }}
                                  ></i>
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

export default Seller_list;
