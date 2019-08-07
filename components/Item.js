import React from 'react';
import Link from 'next/link';

import ItemStyle from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';

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
            pathname: 'update',
            query: { id }
          }}
        >
          <a>Edit</a>
        </Link>
        <a>Add To Cart</a>
        <a>Delete This Item</a>
      </div>
    </ItemStyle>
  );
};

export default Item;
