import React, { Component } from "react";
import axios from "axios";

export default class Add extends Component {
    constructor() {
        super();
        this.state = {
            category_name: ""
        };
        this.onchangeCategoryName = this.onchangeCategoryName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
            .post("http://localhost:8000/category/store", category)
            .then(res => {
                this.setState({
                    category_name: ""
                });
            });
    }

    render() {
        return (
            <div>
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
