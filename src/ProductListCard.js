import React from 'react';
import {Link} from 'react-router-dom';

export const ProductListCard = ({brand, categoryId, id, images, price, title, isFavorite, addFavorite, removeFavorite}) => {
  const style = {
    "backgroundImage": `url(${images[0]})`, 
    "backgroundRepeat": "no-repeat", 
    "backgroundPosition": "center center", 
    "backgroundSize": "contain"
  }
  const handleFavorite = (event) => {
    event.preventDefault();
    if (event.currentTarget.className === 'product-catalogue__product_favorite-chosen') {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  }
  
  return (
     brand ? (
    <Link className="item-list__item-card item" to={`/product-card-desktop/${id}`}>
      <div className="item-pic" style={style} >
        <div style={{zIndex: 100}} className={`product-catalogue__product_favorite${isFavorite(id) ? "-chosen" : ""}`} onClick={handleFavorite}>
          <p></p>
        </div>
      </div>
      <div className="item-desc">
        <h4 className="item-name">{title}</h4>
        <p className="item-producer">Производитель: <span className="producer">{brand}</span></p>
        <p className="item-price">{price}</p>
      </div>
     </Link>
  ) : <div>undefined</div>
  )
}