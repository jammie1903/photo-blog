const path = require('path')
const pathGenerator = require("./path-generator");

let getAllCollectionsPromise;

function getAllCollections(graphql) {
    if (!getAllCollectionsPromise) {
        getAllCollectionsPromise = graphql(
        `{
            allContentfulPhotoCollection {
                edges {
                    node {
                        id,
                        name
                    }
                }
            }
        }`
        ).then(result => {
            if (result.errors) {
                throw result.errors
            }
            return result.data.allContentfulPhotoCollection.edges;
        });
    }
    return getAllCollectionsPromise;
}


// exports.sourceNodes = ({ graphql, boundActionCreators }) => {
//     const { createNode } = boundActionCreators;

//     return getAllCollections(graphql).then(collections => {

//         const path = pathGenerator(album.node.id, "album", album.node.name)
//         collections.forEach(album => createNode({
//             id: "PAGE-" + path,
//             parent: album.node.id,
//             internal: {
//                 type: "Page",
//                 content: {
//                     path
//                 }
//             }
//         }));

//     });
// };

exports.createPages = ({ graphql, boundActionCreators }) => {
    const { createPage } = boundActionCreators

    return getAllCollections(graphql).then(collections => {
        const albumTemplate = path.resolve('./src/templates/album.js')

        collections.forEach((album) => {
            createPage({
                path: pathGenerator(album.node.id, "album", album.node.name),
                parent: album.node.id,
                component: albumTemplate,
                context: {
                    albumId: album.node.id
                },
            })
        })
    });
};

