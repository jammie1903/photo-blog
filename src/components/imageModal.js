import React from "react";
import Img from 'gatsby-image';

import "./imageModal.css";

export default class ImageModal extends React.Component {

    constructor(props) {
        super(props);
        this.id = "modal-" + (Math.random() * 1e16).toFixed(0);
        this.onClose = this.onClose.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onPrevious = this.onPrevious.bind(this);
    }
    
    onClose() {
        this.props.onClose && this.props.onClose();
    }

    onNext() {
        this.props.onNext && this.props.onNext();
    }

    onPrevious() {
        this.props.onPrevious && this.props.onPrevious();
    }

    render() {
        return (
            <div id={this.id} className={"modal" + (this.props.visible ? " visible" : "")}>
                <span className="close" onClick={this.onClose}>&times;</span>
                <div className="modal-center">
                    <a className={"prev" + (this.props.hasPrevious ? "" : " disabled")} onClick={this.onPrevious}>&#10094;</a>
                    <div className="modal-content">
                        {this.props.image ? (
                            <Img sizes={this.props.image.sizes} alt={this.props.image.title} />
                        ) : ""}
                    </div>
                    <a className={"next" + (this.props.hasNext ? "" : " disabled")} onClick={this.onNext}>&#10095;</a>
                </div>
                <div className="caption">{this.props.image ? this.props.image.title : "No Image Selected"}</div>
            </div>
        )
    }
}