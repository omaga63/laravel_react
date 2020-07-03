import React, { Component } from "react";
import axios from "axios";

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category_name: ""
        };
        this.onchangeCategoryName = this.onchangeCategoryName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios
            .get(
                "http://localhost:8000/category/edit/" +
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
                "http://localhost:8000/category/update/" +
                    this.props.match.params.id,
                category
            )
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
