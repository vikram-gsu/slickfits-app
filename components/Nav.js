/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import User from './User';

const Nav = () => (
  <NavStyles>   
    <User>
      {(payload) => {
        console.log(payload);
        return null;
      }}
    </User>
    <Link href="/items">
      <a>Shop</a>
    </Link>
    <Link href="/sell">
      <a>Sell</a>
    </Link>
    <Link href="/signup">
      <a>Signup</a>
    </Link>
    <Link href="/orders">
      <a>Orders</a>
    </Link>
    <Link href="/me">
      <a>Account</a>
    </Link>


  </NavStyles>
);

export default Nav;
