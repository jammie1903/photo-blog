import React from "react";
import get from 'lodash/get';
import AlbumLink from "../components/albumLink";
import Helmet from 'react-helmet';

import "./index.css";
import Subheader from "../components/subheader";

export const pageQuery = graphql`
query AlbumsQuery {
    allContentfulPhotoCollection {
        edges {
            node {
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
        }
    }
    allSitePage(filter: { path: {regex: "^\/album\/"} }) {
        edges {
            node {
               path     
               context {albumId}
            }
        }
    }
}
`;


class RootIndex extends React.Component {
    render() {
        const albums = get(this, "props.data.allContentfulPhotoCollection.edges");
        const albumPages = get(this, "props.data.allSitePage.edges").reduce((acc, page) => {
            acc[page.node.context.albumId] = page.node.path;
            return acc;
        }, {});
        return <div className="Index">
            <Helmet>
                <title>Photo Gallery</title>
            </Helmet>
            <Subheader text="My Albums" />
            <div className="image-collection">
                {albums.map(album => (
                    <AlbumLink key={album.node.id} album={album.node} path={albumPages[album.node.id]} />
                ))}
            </div>
        </div>

    }
}

export default RootIndex;
