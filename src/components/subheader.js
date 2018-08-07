import React from "react";
import "./subheader.css";

export default class Subheader extends React.Component {
    render() {
        return <div className="Subheader">
            <h2>{this.props.text}</h2>
        </div>
    }
}