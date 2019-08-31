import { shallow, mount } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import {GraphQLError} from 'apollo-boost';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';
import SingleItem, { SINGLE_ITEM_QUERY } from '../components/SingleItem';
import { fakeItem } from '../lib/testUtils';

describe('<SingleItem />', () => {
  it('renders', () => {
    shallow(<SingleItem id="123" />);
  });

  it('renders to a snapshot', async () => {
    const mocks = [
      {
        request: { query: SINGLE_ITEM_QUERY, variables: { id: '123' } },
        result: { data: { item: fakeItem() } }
      }
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <SingleItem id="123" />
      </MockedProvider>
    );
    expect(wrapper.text()).toContain('Loading...');
    // await wait(0);
    await new Promise(resolve => setTimeout(resolve, 0));
    wrapper.update();
    expect(toJSON(wrapper.find('h2'))).toMatchSnapshot();
    expect(toJSON(wrapper.find('img'))).toMatchSnapshot();
    expect(toJSON(wrapper.find('p'))).toMatchSnapshot();
  });

  it('Errors with a not found item', async () => {
    const mocks = [
      {
        request: { query: SINGLE_ITEM_QUERY, variables: { id: '123' } },
        result: {
        //   error: [{ message: 'Items Not Found!' }],
        //   data: []
        error: new Error('Item not found!')
        // errors: [new GraphQLError('Item not found!')]
        },
      },
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SingleItem id="123" />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    const item = wrapper.find('[data-test="graphql-error"]');
    // console.log(item.debug());
    expect(item.text()).toContain('Error');
    expect(toJSON(item)).toMatchSnapshot();
  });

});
