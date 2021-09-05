import React, { Component, Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb";
import Modal from "react-responsive-modal";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router-dom"
// import UsersList from "../../../assets/data/usersList";
import UserDatatable from "../../common/UserDatatable";
import { getAllUsers } from "../../../apiService"
export class User_list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      UsersList: [],
      users: []
    };
  }

  componentDidMount() {
    getAllUsers().then(response => {
      if (response.status === 201) {
        const { users } = response.data
        console.log("users", users)
        this.dataFormated(users)
        this.setState({users })
      } else {
        this.setState({ UsersList: [] })
      }
    }).catch(err => {
      console.log(err)
    })
  }

  onChange(e) {
    console.log("hasbhjas", e.name)
    if (e.name === "byname") {
      const { users } = this.state
      const inputValue = e.value.trim().toLowerCase();
      console.log("inputValue", inputValue)

      const inputLength = inputValue.length;
      const fitertUser = inputLength === 0 ? users : users.filter(user =>
        user.firstName.toLowerCase().slice(0, inputLength) === inputValue
      );
      console.log(fitertUser.length)
      this.dataFormated(fitertUser)
    } else {
      const { users } = this.state
      const inputValue = e.value.trim().toLowerCase();
      const inputLength = inputValue.length;
      const fitertUser = inputLength === 0 ? users : users.filter(user =>
        user.email.toLowerCase().slice(0, inputLength) === inputValue
      );
      this.dataFormated(fitertUser)
    }
  }

  dataFormated = (data) => {

    console.log("in data format", data)
    let formatedUsers = data.map(user => {
      return {
        DB_id: user._id,
        userName: user.firstName,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        createdAt: user.createdAt ? user.createdAt.split("T")[0] : "",
        status: user.status
      }
    })
    console.log("formatedUsers", formatedUsers)
    this.setState({ UsersList: formatedUsers })
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const token = localStorage.getItem("token")
        if(!token) {
            return (
                <Redirect to="/" />
            )
        }

    const { open, UsersList } = this.state;
    console.log("ashdajshdj", UsersList)
    return (
      <Fragment>
        <Breadcrumb title="Users List" parent="Physical" />
        {/* <!-- Container-fluid starts--> */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Users List</h5>
                </div>
                <div className="card-body">
                  <div className="btn-popup pull-right">
                    <input type="search" name="byname" placeholder="search by name" onChange={(e) => this.onChange(e.target)} ></input>
                    <input type="search" name="byemail" placeholder="search by email" onChange={(e) => this.onChange(e.target)} ></input>
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
                    {UsersList.length > 0 &&
                      <UserDatatable
                        multiSelectOption={false}
                        myData={UsersList}
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

export default User_list;
