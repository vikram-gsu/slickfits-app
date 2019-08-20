import React from 'react';
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
  @media (max-width: 1300px) {
    grid-template-columns: 1fr;
  }
`;
const Items = () => {
  return (
    <Center>
      <Query query={ALL_ITEMS_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <div>Fetching Items...</div>;
          if (error) return <div>{error.message}</div>;
          if (data.items.length === 0) return <div>There are no items listed currently</div>;
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
export {ALL_ITEMS_QUERY};