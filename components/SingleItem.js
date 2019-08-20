import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Head from 'next/head';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
      largeImage
    }
  }
`;

const StyledItem = styled.div`
  max-width: 1200px;
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin-left: 2rem;
    text-align: left;
    padding-top: 1rem;
  }
`;

const SingleItem = ({ id }) => {
  return (
    <Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
      {({ data, loading, error }) => {
        if (error) return <div>Error while fetching the item</div>;
        if (loading) return <div>Fetching Item...</div>;
        const { title, description, largeImage } = data.item;
        return (
          <StyledItem>
            <Head>
                <title>Slick Fits | {title}</title>
            </Head>
            <img src={largeImage} alt={title} />
            <div className="details">
            <h1>{title}</h1>
            <p>{description}</p>
            </div>
          </StyledItem>
        );
      }}
    </Query>
  );
};

export default SingleItem;
