import React from "react";
import "./subheader.css";

export default class Subheader extends React.Component {

    constructor(props) {
        super(props);
        this.state = { menuOpen: false };
        this.onMenuClick = this.onMenuClick.bind(this);
    }

    onMenuClick() {
        this.setState({ menuOpen: !this.state.menuOpen });
    }

    render() {
        return <div className="Subheader">
            <h2>
                {this.props.text}
                {this.props.children ? ([
                    <a className="menu-icon" onClick={this.onMenuClick}>|||</a>,
                    <span className={"menu" + (this.state.menuOpen ? " responsive" : "")}>
                        {this.props.children}
                    </span>
                ]) : ""}
            </h2>
        </div>
    }
}