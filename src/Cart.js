import React, {Fragment} from 'react'

import {Link} from 'react-router-dom'
import { withFetcher } from './withFetcher';
import { CartContext } from './CartContext';

export class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...this.props}
  }

  componentWillReceiveProps(newProps) {
    if (newProps !== this.props) {
      this.setState(...newProps)
    }
  }

  componentDidMount() {
    this.props.getCart();
  }

  render() {
    return (
      <div className={`hidden-panel__basket basket-dropped ${this.props.visible === 'basket' ? "hidden-panel__basket_visible" : ""}`}>
          {this.props.cartItems.length === 0 ? 
            (<div className="product-list__item">
              <Link className="product-list__product" to="/">
                В вашей корзине пока ничего нет. Не знаете, с чего начать? Посмотрите наши новинки!
              </Link>
            </div>) :
            (<Fragment>
              <div className="basket-dropped__title">В вашей корзине:</div>
              <div className="basket-dropped__product-list product-list">
                {this.props.cartItems.map((item, i) => <CartItem key={i} {...item} onClick={this.props.updateCart}/>)}
              </div>
              <Link onClick={() => {
                window.scrollTo({top: 260});
                this.props.setVisible();
              }} className="basket-dropped__order-button" to="/order">Оформить заказ</Link>
             </Fragment>)}
       </div>
    )
  }
}



const CartItem = (props) => {
  const {id, title, price, images, amount, size} = props;
  const handleClick = (event) => {
    props.onClick({
      id: id,
      size: size,
      amount: 0
    })
  }
  return (
<div className="product-list__item"> 
            <a className="product-list__pic">
              <img src={images[0]} alt="product"/> </a>
            <Link to={`/product-card-desktop/${id}`} className="product-list__product">{title + " (размер " + size + ")"}</Link>
            <div className="product-list__fill"></div>
            <div className="product-list__price">{price + " (" + amount + " шт.)"}
              <i className="fa fa-rub" aria-hidden="true"></i>
            </div>
            <div className="product-list__delete" onClick={handleClick}>
              <i className="fa fa-times" aria-hidden="true"></i>
            </div>
          </div>
  )
}
