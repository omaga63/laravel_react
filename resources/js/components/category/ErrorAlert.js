import React, { Component } from "react";

export default class ErrorAlert extends Component {
    render() {
        return (
            <div className="alert alert-success" role="alert">
                Failed to created/updated/delete Record.
            </div>
        );
    }
}
