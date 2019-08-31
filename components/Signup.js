import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, password: $password) {
      name
    }
  }
`;

class Signup extends React.Component {
  state = {
    email: '',
    name: '',
    password: ''
  };

  saveState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { email, name, password } = this.state;
    return (
      <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
        {(signup, { error, loading }) => {
          return (
            <Form
              method="post"
              onSubmit={e => {
                e.preventDefault();
                signup();
                this.setState({ email: '', name: '', password: '' });
              }}
            >
              <ErrorMessage errorObj={error} />
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="email">
                  Email
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={this.saveState}
                  />
                </label>
                <label htmlFor="name">
                  Name
                  <input
                    type="text"
                    placeholder="User name"
                    name="name"
                    value={name}
                    onChange={this.saveState}
                  />
                </label>
                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={this.saveState}
                  />
                </label>
                <button type="submit">Signup</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Signup;
