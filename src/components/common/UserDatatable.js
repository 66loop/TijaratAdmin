import React, { Component, Fragment } from "react";
import { Link , Redirect} from "react-router-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-responsive-modal";
import { updateUserByAdmin } from "../../apiService"

export class UserDatatable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      open: false,
      status: "",
      id: "",
      checkedValues: [],
      myData: this.props.myData,
    };
  }

  selectRow = (e, i) => {
    if (!e.target.checked) {
      this.setState({
        checkedValues: this.state.checkedValues.filter((item, j) => i !== item),
      });
    } else {
      this.state.checkedValues.push(i);
      this.setState({
        checkedValues: this.state.checkedValues,
      });
    }
  };

  handleRemoveRow = () => {
    const selectedValues = this.state.checkedValues;
    const updatedData = this.state.myData.filter(function (el) {
      return selectedValues.indexOf(el.id) < 0;
    });
    this.setState({
      myData: updatedData,
    });
    toast.success("Successfully Deleted !");
  };

  renderEditable = (cellInfo) => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          const data = [...this.state.myData];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ myData: data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.myData[cellInfo.index][cellInfo.column.id],
        }}
      />
    );
  };

  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  gotoUpdateUser(id) {

    this.setState({ id, open: true })
  }

  gotoUserProducts(id) {
    this.setState({ id, redirect: true })
  }

  onChange(value){
    this.setState({ status: value })
  }

  onCloseModal() {
    this.setState({ open: false })
  }

  saveChanges () {
    const { id , status} = this.state
    try {
      updateUserByAdmin(id, {status}).then(response=> {
        if(response.status === 201) {
          console.log("userUpdated successfully")
          this.setState({ open: false , redirect: true})
          
        }
      })
    } catch (error) {
      console.log("adhakjs", error.message)
    }
    

  }

  render() {
    const { pageSize, myClass, multiSelectOption, pagination } = this.props;
    const { myData, open, status, redirect, id } = this.state;
    if(redirect && status !== "") {
      return (
        <Redirect to="products/physical/user-list" />
      )
    }
    if(redirect) {
      return (
        <Redirect to={{
          pathname: "user-products",
          userId: id
        }} />
      )
    }
    const columns = [];
    for (var key in myData[0]) {
      let editable = this.renderEditable;
      if (key === "DB_id") {
        editable = null;
      }
      if (key === "status") {
        editable = null;
      }
      if (key === "email") {
        editable = null;
      }
      if (key === "createdAt") {
        editable = null;
      }
      if (key === "userName") {
        editable = null;
      }
      if (key === "name") {
        editable = null;
      }

      columns.push({
        Header: <b>{this.Capitalize(key.toString())}</b>,
        accessor: key,
        Cell: editable,
        style: {
          textAlign: "center",
        },
      });
    }
    if (this.props.user) {
      columns.push({
        Header: <b>Action</b>,
        id: "delete",
        accessor: (str) => "delete",
        Cell: (row) => (
          <div>
            <span>
              <Link onClick={() => this.gotoUpdateUser(myData[row.index].DB_id)}>
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
      });

    }

    return (
      <Fragment>
        <Modal open={open} onClose={()=> this.onCloseModal} >
          <div className="modal-header">
            <h5
              className="modal-title f-w-600"
              id="exampleModalLabel2"
            >
              Update User
        </h5>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label
                  htmlFor="recipient-name"
                  className="col-form-label"
                >
                  Statue :
            </label>
              <select className="w-100" name = "status" value={status} onChange={(e)=> this.onChange(e.target.value)} >
                <option value= "active" >active</option>
                <option value= "lock" >lock</option>
                <option value = "freez" >freez</option>
              </select>
              </div>
           </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.saveChanges()}
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
        <ReactTable
          data={myData}
          columns={columns}
          defaultPageSize={pageSize}
          className={myClass}
          showPagination={pagination}
        />
        <ToastContainer />
      </Fragment>
    );
  }
}

export default UserDatatable;
