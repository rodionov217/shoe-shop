import React from 'react';
import { ProductListCard } from './ProductListCard';

export const ProductList = (props) => {
  const list = props.list || [];
  return list.map((item, i) => <ProductListCard {...item} isFavorite={props.isFavorite} key={i}/>)
}