import React from "react";
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import "./index.css";

export default class Template extends React.Component {
    render() {
        return (
            <div className="Layout">
                <Helmet>
                    <link rel="icon" href="/favicon.png"/> 
                </Helmet>
                <header>
                    <h1>
                        <Link to={"/"}>
                        <img className="icon" src="/favicon.png" alt="icon"/>
                            Photo Gallery
                        </Link>
                    </h1>
                </header>
                <div className="content">
                    {this.props.children()}
                </div>
            </div>
        );
    }
}