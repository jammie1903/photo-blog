import React from "react";
import Img from 'gatsby-image';
import Helmet from 'react-helmet';
import Subheader from "../components/subheader";
import ImageModal from "../components/imageModal";
import { RSA_PKCS1_OAEP_PADDING } from "constants";

export const pageQuery = graphql`
query AlbumById($albumId: String!){
    contentfulPhotoCollection(id: { eq: $albumId }) {
        id,
        name,
        photos {
            id,
            title,
            description,
            sizes {
                base64
                tracedSVG
                aspectRatio
                src
                srcSet
                srcWebp
                srcSetWebp
                sizes
            }
        }
    }
}`

export default class Album extends React.Component {

    constructor(props) {
        super(props);
        this.state = { openImage: null, openImageIndex: null };
        this.closeModal = this.closeModal.bind(this);
        this.nextImage = this.nextImage.bind(this);
        this.previousImage = this.previousImage.bind(this);
    }

    openModal(photo, index) {
        this.setState({ openImage: photo, openImageIndex: index });
    }

    closeModal() {
        this.setState({ openImage: null });
    }

    nextImage() {
        const newIndex = this.state.openImageIndex + 1;
        const photo = this.album.photos[newIndex];
        this.setState({ openImage: photo, openImageIndex: newIndex });
    }

    previousImage() {
        const newIndex = this.state.openImageIndex - 1;
        const photo = this.album.photos[newIndex];
        this.setState({ openImage: photo, openImageIndex: newIndex });
    }

    get album() {
        if (this.props.data.contentfulPhotoCollection && this.props.data.contentfulPhotoCollection.photos) {
            this.props.data.contentfulPhotoCollection.photos.sort((p1, p2) => {
                if (p1.title < p2.title) return -1;
                if (p1.title > p2.title) return 1;
                return 0;
            });
        }
        return this.props.data.contentfulPhotoCollection;
    }

    render() {
        const album = this.album;
        const hasPrevious = this.state.openImageIndex > 0;
        const hasNext = this.album.photos && (this.state.openImageIndex < (this.album.photos.length - 1));
        return <div className="Album">
            <Helmet>
                <title>{album.name} - Photo Gallery</title>
            </Helmet>
            <Subheader text={album.name} />
            <div className="image-collection">
                {album.photos && album.photos.map((photo, index) => (
                    <div className="photo image-container" key={photo.id} onClick={() => this.openModal(photo, index)} data-photo-id={photo.id}>
                        <Img sizes={photo.sizes} alt={photo.title} />
                    </div>
                ))}
            </div>
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