import React, { Component } from "react";
import axios from "axios";
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";

export default class Add extends Component {
    constructor() {
        super();
        this.state = {
            category_name: "",
            alert_message: ""
        };
        this.onchangeCategoryName = this.onchangeCategoryName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onchangeCategoryName(e) {
        this.setState({
            category_name: e.target.value,
            alert_message: ""
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const category = {
            category_name: this.state.category_name
        };

        axios
            .post("http://localhost:8000/api/category/store", category)
            .then(res => {
                this.setState({
                    alert_message: "success",
                    category_name: ""
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
                    <SuccessAlert message={"Category added successfully!"} />
                ) : null}
                {this.state.alert_message == "error" ? (
                    <ErrorAlert message={"Category added failed!"} />
                ) : null}
                <form method="POST" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="addCategory">Category Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="addCategory"
                            placeholder="Enter category"
                            value={this.state.category_name}
                            onChange={this.onchangeCategoryName}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}
