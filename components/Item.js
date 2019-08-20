/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';

import ItemStyle from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteItem from './DeleteItem';

const Item = ({ id, title, description, price, image }) => {
  return (
    <ItemStyle>
      {image && <img src={image} alt={title} />}
      <Title>
        <Link
          href={{
            pathname: '/item',
            query: { id }
          }}
        >
          <a>{title}</a>
        </Link>
      </Title>
      <PriceTag>{formatMoney(price)}</PriceTag>
      <p>{description}</p>
      <div className="buttonList">
        <Link
          href={{
            pathname: '/update',
            query: { id }
          }}
        >
          <a>Edit</a>
        </Link>
        <a>Add To Cart</a>
        <DeleteItem id={id}>Delete This Item</DeleteItem>
      </div>
    </ItemStyle>
  );
};

export default Item;
