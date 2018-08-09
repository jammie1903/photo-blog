import React from "react";
import Helmet from 'react-helmet';
import Subheader from "../components/subheader";
import ImageCollection from "../components/ImageCollection";
import ImageCollection3d from "../components/ImageCollection3d";
import queryString from 'querystring'
import { Link } from "react-router-dom";

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
        const query = queryString.parse(this.props.location.search.toLowerCase().slice(1))
        const is3d = query["3d"] === "true";
        // reversing for the alternative view link
        query["3d"] = String(!is3d);
        const alternativeLink = this.props.location.pathname + "?" + queryString.stringify(query);
        const album = this.album;
        return <div className="Album">
            <Helmet>
                <title>{album.name} - Photo Gallery</title>
            </Helmet>
            <Subheader text={album.name}>
                <Link to={alternativeLink}>{is3d ? "View as gallery" : "View in 3d"}</Link>
            </Subheader>
            {is3d ?
                (
                    <ImageCollection3d images={album.photos} />
                ) : (
                    <ImageCollection images={album.photos} />
                )
            }
        </div>
    }
}