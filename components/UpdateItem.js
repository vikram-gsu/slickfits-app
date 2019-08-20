/* eslint-disable no-shadow */
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import Router from 'next/router';

import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

class UpdateItem extends Component {
  state = {};

  handleChange = e => {
    e.preventDefault();
    const { type, name } = e.target;
    let { value } = e.target;
    if (type === 'number') value = parseFloat(value);
    this.setState(() => ({ [name]: value }));
  };

  handleSubmit = (e, updateItemMutation) => {
    e.preventDefault();
    const {id} = this.props;
    updateItemMutation({
        variables: {
            id,
            ...this.state
        }
    });
    Router.push({
        pathname: '/item',
        query: {id}
    });
  };

  render() {
      const {id} = this.props;
      return (
          <Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
        {({data, loading}) => {
          const { title, price, description} = data.item;
          if (loading) return <p>Fetching Item Details...</p>;
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
              {(updateItemMutation, { loading, error }) => {
                if (loading) return (<p>Updating Item...</p>);
                return (
                  <Form onSubmit={e => this.handleSubmit(e, updateItemMutation)}>
                    <ErrorMessage errorObj={error} />
                    <fieldset disabled={loading}>
                      <label htmlFor="title">
                        Title
                        <input
                          type="text"
                          name="title"
                          id="title"
                          defaultValue={title}
                          onChange={this.handleChange}
                        />
                      </label>
                      <label htmlFor="price">
                        Price
                        <input
                          type="number"
                          name="price"
                          id="price"
                          defaultValue={price}
                          onChange={this.handleChange}
                        />
                      </label>
                      <label htmlFor="description">
                        Description
                        <textarea
                          name="description"
                          id="description"
                          defaultValue={description}
                          onChange={this.handleChange}
                        />
                      </label>
                    </fieldset>
                    <button type="submit">Sav{loading?'ing':'e'}</button>
                  </Form>
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateItem;
export {SINGLE_ITEM_QUERY};