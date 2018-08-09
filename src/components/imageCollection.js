import React from "react";
import Img from 'gatsby-image';
import ImageModal from "./imageModal";

export default class ImageCollection extends React.Component {

    constructor(props) {
        super(props);
        this.state = { openImage: null, openImageIndex: null };
        this.closeModal = this.closeModal.bind(this);
        this.nextImage = this.nextImage.bind(this);
        this.previousImage = this.previousImage.bind(this);
    }

    openModal(image, index) {
        this.setState({ openImage: image, openImageIndex: index });
    }

    closeModal() {
        this.setState({ openImage: null });
    }

    nextImage() {
        const newIndex = this.state.openImageIndex + 1;
        const image = this.props.images[newIndex];
        this.setState({ openImage: image, openImageIndex: newIndex });
    }

    previousImage() {
        const newIndex = this.state.openImageIndex - 1;
        const image = this.props.images[newIndex];
        this.setState({ openImage: image, openImageIndex: newIndex });
    }

    render() {
        const hasPrevious = this.state.openImageIndex > 0;
        const hasNext = this.props.images && (this.state.openImageIndex < (this.props.images.length - 1));
        return <div className="image-collection">
            {this.props.images && this.props.images.map((image, index) => (
                <div className="image-container" key={image.id} onClick={() => this.openModal(image, index)} data-image-id={image.id}>
                    <Img sizes={image.sizes} alt={image.title} />
                </div>
            ))}
            <ImageModal visible={!!this.state.openImage}
                image={this.state.openImage}
                onClose={this.closeModal}
                onNext={this.nextImage}
                onPrevious={this.previousImage}
                hasPrevious={hasPrevious}
                hasNext={hasNext} />
        </div>
    }
}
