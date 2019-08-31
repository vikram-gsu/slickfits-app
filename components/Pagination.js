/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Link from 'next/link';
import Head from 'next/head';
import PaginationStyles from './styles/PaginationStyles';
import { perPage } from '../config';

const ITEMS_COUNT_QUERY = gql`
  query ITEMS_COUNT_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;
const Pagination = ({ page }) => {
  return (
    <Query query={ITEMS_COUNT_QUERY}>
      {({ data, loading }) => {
        if (loading) return 'Loading...';
        const { count } = data.itemsConnection.aggregate;
        const totalCount = Math.ceil(count / perPage);
        return (
          <PaginationStyles>
            <Head>
              <title>
                Slickfits | Page {page} of {totalCount}
              </title>
            </Head>
            <Link
              prefetch
              href={{
                pathname: '/items',
                query: {
                  page: page - 1
                }
              }}
            >
              <a aria-disabled={page <= 1}> Prev </a>
            </Link>
            <p>
              Page {page} of {totalCount}
            </p>
            <p>{count} total items</p>
            <Link
              prefetch
              href={{
                pathname: '/items',
                query: {
                  page: page + 1
                }
              }}
            >
              <a aria-disabled={page >= totalCount}> Next </a>
            </Link>
          </PaginationStyles>
        );
      }}
    </Query>
  );
};

export default Pagination;
