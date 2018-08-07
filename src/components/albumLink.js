import React from "react";
import Img from 'gatsby-image';
import Link from 'gatsby-link';

export default class AlbumLink extends React.Component {
    render() {
        return <Link className="album-link image-container" to={this.props.path}>
            {this.props.album.photos ? (
                <Img sizes={this.props.album.photos[0].sizes} alt={this.props.album.photos[0].title} />
            ) : ""}
            <div className="album-name">{this.props.album.name}</div>
        </Link>
    }
}