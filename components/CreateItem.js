import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Router from 'next/router';

import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import {cloudinaryURL} from '../config';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: 'Shoes',
    description: 'Addida Shoes',
    price: 10000,
    image: '',
    // eslint-disable-next-line react/no-unused-state
    largeImage: ''
  };

  handleChange = e => {
    e.preventDefault();
    const { type, name } = e.target;
    let { value } = e.target;
    if (type === 'number') value = parseFloat(value);
    this.setState(() => ({ [name]: value }));
  };

  uploadFile = async e => {
    const { files } = e.target;
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', 'slickfits');

    const response = await fetch(cloudinaryURL,
      { method: 'POST', body: formData }
    );
    const file = await response.json();
    this.setState({
      image: file.secure_url,
      // eslint-disable-next-line react/no-unused-state
      largeImage: file.eager[0].secure_url
    });
  };

  render() {
    const { title, price, description, image } = this.state;
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => {
          return (
            <Form
              onSubmit={async e => {
                e.preventDefault();
                const res = await createItem();
                Router.push({
                  pathname: '/item',
                  query: {id: res.data.createItem.id}
                });
              }}
            >
              <ErrorMessage errorObj={error} />
              <fieldset disabled={loading}>
                <label htmlFor="image">
                  Image
                  <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={this.uploadFile}
                  />
                  {image && <img width="200" src={image} alt="preview" />}
                </label>
                <label htmlFor="title">
                  Title
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="price">
                  Price
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={price}
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="description">
                  Description
                  <textarea
                    name="description"
                    id="description"
                    value={description}
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
  }
}

export default CreateItem;
