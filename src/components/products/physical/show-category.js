import React, { Component, Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb";
import Modal from "react-responsive-modal";
import { Redirect } from "react-router-dom"
import data from "../../../assets/data/sub-category";
import Datatable from "../../common/datatable";
import CategoryDatatable from "../../common/CategoryDatatable";
import { addSubCategory } from "../../../apiService"
import Category from "./category";
import { Table } from "reactstrap"
import { getAcategoryAndSubCategories } from "../../../apiService"

export class Sub_category extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            categoryId: props.location.categoryId,
            categoryName: "",
            image: "",
            previewImage: "",
            subCategories: [],
            category: "",
            redirect: false
        };
    }
    onOpenModal = () => {
        this.setState({ open: true });
    };
    componentDidMount() {
        const { categoryId } = this.state
        console.log("categoryId", categoryId)
        getAcategoryAndSubCategories(categoryId).then(response => {
            if (response.status === 201) {
                const { category, subCategories } = response.data
                let filteretCategories = []
                console.log("category", category)
                console.log("categories", subCategories)
                if (subCategories && subCategories.length > 0) {
                    filteretCategories = subCategories.map(category => {
                        return {
                            DB_id: category._id,
                            image: <img style={{ width: 50, height: 50 }} src={category.image} alt="category"></img>,
                            name: category.name
                        }
                    })
                }

                this.setState({ category, subCategories: filteretCategories })
            }
        })

    }

    onChange(input) {
        if (input.name === "image") {
            const imageFile = input.files[0];
            if (imageFile.name.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
                this.setState({ image: input.files[0], previewImage: URL.createObjectURL(input.files[0]) });
            }
        } else {
            this.setState({ [input.name]: input.value })
        }
    }

    addCategory() {
        try {
            const { categoryName, image, categoryId } = this.state

            let formData = new FormData()
            formData.append("name", categoryName)
            formData.append("category", categoryId)
            formData.append("image", image)
            console.log("form date", ...formData)
            addSubCategory(formData).then(response => {
                if (response.status === 201) {
                    window.location.reload()
                }
            })
        } catch (error) {
            console.log("error", error.message)
        }
    }

    onCloseModal = () => {
        this.setState({ open: false });
    };

    render() {
        const { open, subCategories, category, categoryId, user } = this.state;
        const token = localStorage.getItem("token")
        if(!token) {
            return (
                <Redirect to="/" />
            )
        }

        if(!categoryId) {
           return( <Redirect to="sub-category" />)
        }
        return (
            <Fragment>
                <Breadcrumb title="Category" parent="Physical" />
                {/* <!-- Container-fluid starts--> */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Category detail page</h5>
                                </div>
                                <div className="card-body">
                                    <div className="btn-popup pull-right">
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={this.onOpenModal}
                                            data-toggle="modal"
                                            data-original-title="test"
                                            data-target="#exampleModal"
                                        >
                                            Add Sub Category
                                        </button>
                                    </div>
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
                                                        Sub Category Name :
                            </label>
                                                    <input type="text" name="categoryName" onChange={(e) => this.onChange(e.target)} className="form-control" />
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
                                                        name="image"
                                                        onChange={(e) => this.onChange(e.target)}

                                                    />
                                                </div>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() => this.addCategory()}
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

                                    <div className="clearfix"></div>
                                    <div id="basicScenario" className="product-physical">
                                        <div>
                                            <label> Category Name: </label>
                                            <b>{category.name}</b>
                                            <br></br>
                                            <label> Category Image </label>
                                            <img src={category.image} style={{ height: 150, width: 150 }} alt="category" />

                                        </div>
                                        <div>
                                            <h2> Sub categories </h2>
                                            <Table bordered>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Name</th>
                                                        <th>Image</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {subCategories && subCategories.length > 0 && subCategories.map((category, index) => {
                                                        return (
                                                            <tr>
                                                                <th scope="row">{index + 1}</th>
                                                                <td>{category.name}</td>
                                                                <td>{category.image}</td>
                                                            </tr>
                                                        )
                                                    })}

                                                </tbody>
                                            </Table>
                                        </div>
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

export default Sub_category;
