import React from 'react';

export const FavoriteHeader = (props) => {
  const { count } = props;
  return (
    <div className="product-catalogue__section-title">
      {count === 0 ?
        <h2 className="section-name" >В вашем избранном пока ничего нет</h2> :
        <h2 className="section-name">В вашем избранном
          <span className="amount amount_favorite"> {count} товаров</span>
        </h2>}
    </div>
  )
}
