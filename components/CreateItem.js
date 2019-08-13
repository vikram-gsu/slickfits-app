import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Form from './styles/Form';

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
    image: 'addida.jpg',
    largeImage: 'large-addida.jpg'
  };
  handleChange = e => {
    e.preventDefault();
    const { type, name, value } = e.target;
    if (type === 'number') value = parseInt(value);
    this.setState(() => ({ [name]: value }));
  };
  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => {
          return (
            <Form
              onSubmit={async e => {
                e.preventDefault();
                const res = await createItem();
                console.log(res.data.createItem.id);
              }}
            >
              <fieldset>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={this.state.price}
                  onChange={this.handleChange}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  name="image"
                  id="image"
                  value={this.state.image}
                  onChange={this.handleChange}
                />
              </fieldset>
              <button type="submit">Submit</button>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default CreateItem;
