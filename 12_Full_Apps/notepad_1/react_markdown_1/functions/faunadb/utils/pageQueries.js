// CRUD
const CREATE_PAGE = `
    mutation($title: String!, $markdown: String!, $createdAt: Long!, $updatedAt: Long!, $parentId: ID!) {
        createPage(data: { title: $title, markdown: $markdown, createdAt: $createdAt, updatedAt: $updatedAt, parentId: $parentId }) {
            _id
        }
    }
`;
const READ_PAGE = `
    query($id: ID!) {
        findPageByID(id: $id) {
            _id
            title
            markdown
            createdAt
            updatedAt
            parentId
        }
    }
`;
const UPDATE_PAGE = `
    mutation($_id: ID!, $title: String!, $markdown: String!, $createdAt: Long!, $updatedAt: Long!, $parentId: ID!) {
        updatePage( id: $_id, data: { title: $title, markdown: $markdown, createdAt: $createdAt, updatedAt: $updatedAt, parentId: $parentId }) {
            _id
        }
    }
`;
const DELETE_PAGE = `
    mutation($id: ID!) {
        deletePage( id: $id) {
            _id
        }
    }
`;
// OTHERS
const GET_ALL_PAGES = `
    query {
        allPages(_size: 200) {
            data {
                _id
                title
                parentId
            }
        }
    }
`;
const GET_CHILD_PAGES = `
    query($parentId: ID!) {
        childPages(parentId: $parentId) {
            data {
                _id
                title
            }
        }
    }
`;
const GET_RECENT_PAGES = `
    query($size: Int!) {
        recentPages(_size: $size) {
            data {
                _id
                title
            }
        }
    }
`;
const GET_FAVORITE_PAGES = `
    query($isFavorite: Boolean!) {
        favoritePages(isFavorite: $isFavorite) {
            data {
                _id
                title
                parentId
            }
        }
    }
`;
const GET_FILTERED_PAGES = `
    query {
        filteredPages(str: String!) {
            data {
                _id
                title
                parentId
            }
        }
    }
`;
// EXPORT
module.exports = {
  CREATE_PAGE,
  READ_PAGE,
  UPDATE_PAGE,
  DELETE_PAGE,

  GET_ALL_PAGES,
  GET_CHILD_PAGES,
  GET_RECENT_PAGES,
  GET_FAVORITE_PAGES,
  GET_FILTERED_PAGES,
};
