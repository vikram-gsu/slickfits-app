import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';


const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      description
      price
      image
      largeImage
    }
  }
`;
const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(where: { id: $id }) {
      id
    }
  }
`;

const DeleteItem = ({ id, children }) => {
  const handleDelete = (e, deleteItem) => {
    e.preventDefault();
    deleteItem({
      variables: {
        id
      }
    });
  };
  const update = (cache, payload) => {
    // manually update the cache on the client, so it matches the server
    // 1. fetch all the items in the cache
    const cacheItems = cache.readQuery({ query: ALL_ITEMS_QUERY });
    // 2. remove the deletedItem from this array
    cacheItems.items = cacheItems.items.filter(
      item => item.id !== payload.data.deleteItem.id
    );
    // 3. write the array back to the cache
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data: cacheItems });
  };
  return (
    <Mutation
      mutation={DELETE_ITEM_MUTATION}
      variables={{ id }}
      update={update}
    >
      {(deleteItem, { error }) => {
        if (error) return 'Failed to delete';
        return (
          <button type="button" onClick={e => handleDelete(e, deleteItem)}>
            {children}
          </button>
        );
      }}
    </Mutation>
  );
};

export default DeleteItem;
