import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

const CURRENT_USER_QUERY = gql`
    query CURRENT_USER_QUERY {
        me {
            name
            email
            permissions
        }
    }
`;

const User = props => (
    <Query query={CURRENT_USER_QUERY}>
        {payload => props.children(payload)}
    </Query>
)

export default User;