import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";

export default class Listing extends Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            activePage: 1,
            itemsCountPerPage: 2,
            totalItemsCount: 6,
            alert_message: ""
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8000/api/category").then(response => {
            this.setState({
                categories: response.data.data,
                itemsCountPerPage: response.data.per_page,
                totalItemsCount: response.data.total,
                activePage: response.data.current_page
            });
        });
    }

    // https://www.npmjs.com/package/react-js-pagination 참조
    handlePageChange(pageNumber) {
        axios
            .get("http://localhost:8000/api/category?page=" + pageNumber)
            .then(response => {
                this.setState({
                    categories: response.data.data,
                    itemsCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,
                    activePage: response.data.current_page
                });
            });
    }

    onDelete(category_id) {
        axios
            .delete("http://localhost:8000/api/category/delete/" + category_id)
            .then(response => {
                const categories = this.state.categories;
                for (let i = 0; i < categories.length; i++) {
                    if (categories[i].id == category_id) {
                        categories.splice(i, 1);
                        this.setState({
                            categories: categories
                        });
                    }
                }
                this.setState({
                    alert_message: "success"
                });
            })
            .catch(error => {
                this.setState({
                    alert_message: "error"
                });
            });
    }
    render() {
        return (
            <div>
                <hr />
                {this.state.alert_message == "success" ? (
                    <SuccessAlert />
                ) : null}
                {this.state.alert_message == "error" ? <ErrorAlert /> : null}
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Category Name</th>
                            <th scope="col">Status</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Updated At</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.categories.map((category, i) => {
                            return (
                                <tr key={i}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{category.name}</td>
                                    <td>
                                        {category.active == 1
                                            ? "Active"
                                            : "Inactive"}
                                    </td>
                                    <td>{category.created_at}</td>
                                    <td>{category.updated_at}</td>
                                    <td>
                                        <Link
                                            to={"/category/edit/" + category.id}
                                        >
                                            Edit |{" "}
                                        </Link>
                                        <a
                                            href="#"
                                            onClick={this.onDelete.bind(
                                                this,
                                                category.id
                                            )}
                                        >
                                            Delete
                                        </a>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="d-flex justify-content-center">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={this.state.totalItemsCount}
                        pageRangeDisplayed={this.state.pageRangeDisplayed}
                        onChange={this.handlePageChange.bind(this)}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </div>
            </div>
        );
    }
}
