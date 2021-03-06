import React, { Component } from "react";
import axios from "axios";
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category_name: "",
            alert_message: ""
        };
        this.onchangeCategoryName = this.onchangeCategoryName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios
            .get(
                "http://localhost:8000/api/category/edit/" +
                    this.props.match.params.id
            )
            .then(response => {
                this.setState({ category_name: response.data.name });
            });
    }

    onchangeCategoryName(e) {
        this.setState({
            category_name: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const category = {
            category_name: this.state.category_name
        };

        axios
            .put(
                "http://localhost:8000/api/category/update/" +
                    this.props.match.params.id,
                category
            )
            .then(res => {
                this.setState({
                    category_name: "",
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
                    <SuccessAlert message={"Category updated successfully!"} />
                ) : null}
                {this.state.alert_message == "error" ? (
                    <ErrorAlert message={"Category updated failed!"} />
                ) : null}
                <form method="POST" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="editCategory">Category Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="editCategory"
                            placeholder="Enter category for Edit"
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
