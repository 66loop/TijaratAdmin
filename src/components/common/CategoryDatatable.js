import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export class CategoryDatatable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
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


  gotoDetail (id) {
    console.log("id", id)
    this.setState({ id, redirect: true })
  }

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

  render() {
    const { pageSize, myClass, multiSelectOption, pagination } = this.props;
    const { myData, id, redirect } = this.state;
    if(redirect) {
      return ( 
        <Redirect to={{
          pathname :"show-category",
          categoryId: id
        }} />
      )
    }
    const columns = [];
    for (var key in myData[0]) {
      let editable = this.renderEditable;
      if (key === "image") {
        editable = null;
      }
      if (key === "status") {
        editable = null;
      }
      if (key === "avtar") {
        editable = null;
      }
      if (key === "vendor") {
        editable = null;
      }
      if (key === "order_status") {
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

    if (multiSelectOption == true) {
      columns.push({
        Header: (
          <button
            className="btn btn-danger btn-sm btn-delete mb-0 b-r-4"
            onClick={(e) => {
              if (window.confirm("Are you sure you wish to delete this item?"))
                this.handleRemoveRow();
            }}
          >
            Delete
          </button>
        ),
        id: "delete",
        accessor: (str) => "delete",
        sortable: false,
        style: {
          textAlign: "center",
        },
        Cell: (row) => (
          <div>
            <span>
              <input
                type="checkbox"
                name={row.original.id}
                defaultChecked={this.state.checkedValues.includes(
                  row.original.id
                )}
                onChange={(e) => this.selectRow(e, row.original.id)}
              />
            </span>
          </div>
        ),
        accessor: key,
        style: {
          textAlign: "center",
        },
      });
    } else {
      if (this.props.user) {
        columns.push({
          Header: <b>Action</b>,
          id: "delete",
          accessor: (str) => "delete",
          Cell: (row) => (
            <div>
              {/* <span
                onClick={() => {
                  if (
                    window.confirm("Are you sure you wish to delete this item?")
                  ) {
                    let data = myData;
                    data.splice(row.index, 1);
                    this.setState({ myData: data });
                  }
                  toast.success("Successfully Deleted !");
                }}
              >
                <i
                  className="fa fa-trash"
                  style={{
                    width: 35,
                    fontSize: 20,
                    padding: 11,
                    color: "#e4566e",
                  }}
                ></i>
              </span> */}

              <span>
                {/* <Link to="/products/physical/edit-product"> */}
                <i
                  className="fa fa-pencil"
                  style={{
                    width: 35,
                    fontSize: 20,
                    padding: 11,
                    color: "rgb(40, 167, 69)",
                  }}
                  onClick={this.props.subCate}
                  data-toggle="modal"
                  data-original-title="test"
                  data-target="#exampleModal"
                ></i>
                {/* </Link> */}
              </span>
            </div>
          ),
          style: {
            textAlign: "center",
          },
          sortable: false,
        });
        columns.push({
          Header: <b>detail</b>,
          id: "delete",
          accessor: (str) => "delete",
          Cell: (row) => (
            <div>
              
              <span onClick={()=> this.gotoDetail(myData[row.index].DB_id)}>
                {/* <Link to="/products/physical/edit-product"> */}
                <i
                  className="fa fa-eye"
                  style={{
                    width: 35,
                    fontSize: 20,
                    padding: 11,
                    color: "rgb(40, 167, 69)",
                  }}
                  onClick={this.props.subCate}
                  data-toggle="modal"
                  data-original-title="test"
                  data-target="#exampleModal"
                ></i>
                {/* </Link> */}
              </span>
            </div>
          ),
          style: {
            textAlign: "center",
          },
          sortable: false,
        });
      }
      
    }

    return (
      <Fragment>
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

export default CategoryDatatable;
