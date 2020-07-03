import React, { Component } from "react";

export default class Add extends Component {
    render() {
        return (
            <div>
                <form>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Category Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="addCategory"
                            placeholder="Enter category"
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
