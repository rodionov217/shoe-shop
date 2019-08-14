import React from 'react'
import {Link} from 'react-router-dom'

export const Overlooked = () => {
  const overlooked = JSON.parse(sessionStorage.overlooked) ;
  if (!overlooked) {
    return null;
  }
  return (
    <section className="product-card__overlooked-slider">
      <h3>Вы смотрели:</h3>
      <div className="overlooked-slider">
        <div className="overlooked-slider__arrow overlooked-slider__arrow_left arrow"></div>
        {Array.isArray(overlooked) ? 
            overlooked.map((item, i) => <div key={i} className="overlooked-slider__item" style={{backgroundImage: `url(${item.images[0]})`}}><Link replace={true} to={`/product-card-desktop/${item.id}`}></Link></div>) :
            <div className="overlooked-slider__item" style={{backgroundImage: `url(${overlooked.images[0]})`}}><Link to={`/product-card-desktop/${overlooked.id}`}></Link></div>}
        <div className="overlooked-slider__arrow overlooked-slider__arrow_right arrow"></div>
      </div>
    </section>
  )
}