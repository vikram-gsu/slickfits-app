/* eslint-disable react/forbid-prop-types */
import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';

const ErrorStyles = styled.div`
  padding: 2rem;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin: 2rem 0;
  border-left: 5px solid red;
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`;

const ErrorMessage = ({ errorObj }) => {
  if (!errorObj || !errorObj.message) return null;
  if (
    errorObj.networkError &&
    errorObj.networkError.result &&
    errorObj.networkError.result.errors.length
  ) {
    return errorObj.networkError.result.errors.map(({ error, i }) => (
      <ErrorStyles key={i}>
        <p data-test="graphql-error">
          <strong>Network Error</strong>
          {error.message.replace('GraphQL error: ', '')}
        </p>
      </ErrorStyles>
    ));
  }
  return (
    <ErrorStyles>
      <p data-test="graphql-error">
        <strong>Network Error</strong>
        {errorObj.message.replace('GraphQL error: ', '')}
      </p>
    </ErrorStyles>
  );
};

ErrorMessage.defaultProps = {
    errorObj: {}
}

ErrorMessage.propTypes = {
    errorObj: PropTypes.object,
}

export default ErrorMessage;
