import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import Item from './Item';

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
const Center = styled.div`
  text-align: center;
`;
const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;
const Items = () => {
  return (
    <Center>
      <Query query={ALL_ITEMS_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>{error.message}</div>;
          return (
            <ItemsList>
              {data.items.map(item => (
                <Item key={item.id} {...item} />
              ))}
            </ItemsList>
          );
        }}
      </Query>
    </Center>
  );
};

export default Items;
