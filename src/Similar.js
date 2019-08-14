import React from 'react'
import { withFetcher } from './withFetcher'
import { withRouter } from 'react-router-dom'

const SimilarView = (props) => {
  console.log(props);
  
  const list = props.list || [];
  return (

        
        
      

<section className="product-card__similar-products-slider">
<h3>Похожие товары:</h3>
<div className="similar-products-slider">
  <div className="similar-products-slider__arrow similar-products-slider__arrow_left arrow"></div>
{list.map( el => {
  if (el.id !== props.match.params.id) {
    return (
      <div className="similar-products-slider__item-list__item-card item">
      <div className="similar-products-slider__item" style={{"backgroundImage": el.images[0]}}>
        <a href="product-card-desktop.html" >
          {/* <img src={el.images[0]} className="similar-products-slider__item-pic-1" alt={el.title}/> */}
        </a>
      </div>
      <div className="similar-products-slider__item-desc">
        <h4 className="similar-products-slider__item-name">{el.title}</h4>
        <p className="similar-products-slider__item-producer">Производитель: <span className="producer">{el.brand}</span></p>
        <p className="similar-products-slider__item-price">{el.price}</p>
      </div>    
    </div>
    )
  }
}) }
    
    
  <div className="similar-products-slider__arrow similar-products-slider__arrow_right arrow"></div>
</div>
</section>
  )
};

export const Similar = withFetcher('similar', 'list')(withRouter(SimilarView));
