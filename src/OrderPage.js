import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { CartContext } from './CartContext'

export const OrderPage = (props) => {
  return (
    <div className="wrapper order-wrapper"> 
      <section className="order-process">
        <h2 className="order-process__title">Оформление заказа</h2>
        <CartContext.Consumer>
        {context => <Order {...context} {...props}/>}
        </CartContext.Consumer>
      </section>
    </div>
  )
}

const Order = (props) => {
  const {cartItems} = props;
  const total = cartItems.reduce((sum, next) => {
    return sum + next.price * next.amount
  }, 0);

  return (
    <div className="order-process__basket order-basket">
      <div className="order-basket__title">в вашей корзине:</div>
      <div className="order-basket__item-list">
        {cartItems.map((item, i) => <OrderListCard key={i} {...item} updateAmount={props.updateCart}/>)}
        <div className="order-basket__summ">
          {"Итого: "}
          <span>{total + " "}<i className="fa fa-rub" aria-hidden="true"></i>
          </span>
        </div>
      </div>
      <div className="order-process__confirmed">
        <OrderForm id={props.cartId} createOrder={props.createOrder} history={props.history}/>
      </div>
    </div>
  )
}

const OrderListCard = (props) => {
  const {size, title, images, price, brand, color, id, amount, updateAmount} = props;
  let amountContainer;
  const changeAmount = (event) => {
    let newAmount;
    switch(event.currentTarget.textContent) {
      case "+":
      newAmount = amount + 1;
      break;
      case "-":
      newAmount = amount - 1;
      break;
    }
    const order = {
      id: id,
      size: size,
      amount: newAmount
    }
    const info = {title: title, images: images, price: price, brand: brand, color: color}
    amountContainer.textContent = newAmount;
   // console.log(amountContainer.nextSibling);
    updateAmount(order, info)
  }
  return (
    <div className="basket-item">
      <div className="basket-item__pic"><img src={images[0]} alt="product_1"/></div>
      <div className="basket-item__product">
        <div className="basket-item__product-name"><Link to={`/product-card-desktop/${id}`}>{title}</Link></div>
        <div className="basket-item__product-features">
          <div className="basket-item__size">Размер: <span>{size}</span></div>
          <div className="basket-item__producer">Производитель: <span>{brand}</span></div>
          <div className="basket-item__color">Цвет: <span>{color}</span></div>
        </div>
      </div>
      <div className="basket-item__quantity">
        <div className="basket-item__quantity-change basket-item-list__quantity-change_minus" onClick={changeAmount}>-</div>
        <span ref={el => amountContainer = el}>{amount}</span>
        <div className="basket-item__quantity-change basket-item-list__quantity-change_plus" onClick={changeAmount}>+</div>
      </div>
      <div className="basket-item__price">{price * amount} <i className="fa fa-rub" aria-hidden="true"></i></div>
    </div>
  )
}

const OrderForm = (props) => {

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');

  const isComplete = name && phone && address && email;

  const handleSubmit = (event) => {
    event.preventDefault();
    const paymentType = document.querySelector('.order-process__paid-form');
    const order = {
      name: name,
      phone: phone,
      address: address,
      email: email,
      paymentType: paymentType.querySelector('input:checked').value,
      cart: props.id
    };
    props.createOrder(order, email)
  }
  
  return (
    <form onSubmit={handleSubmit}>
              <div className="order-process__delivery">
                <h3 className="h3">кому и куда доставить?</h3>
                <div className="order-process__delivery-form">
                  <label className="order-process__delivery-label">
                    <div className="order-process__delivery-text">Имя</div>
                    <input value={name} onChange={event => setName(event.currentTarget.value)} className="order-process__delivery-input" type="text" name="delivery" placeholder="Представьтесь, пожалуйста"/>
                  </label>
                  <label className="order-process__delivery-label">
                    <div className="order-process__delivery-text">Телефон</div>
                    <input value={phone} onChange={event => setPhone(event.currentTarget.value)} className="order-process__delivery-input" type="tel" name="delivery" placeholder="Номер в любом формате"/>
                  </label>
                  <label className="order-process__delivery-label">
                    <div className="order-process__delivery-text">E-mail</div>
                    <input value={email} onChange={event => setEmail(event.currentTarget.value)} className="order-process__delivery-input" type="email" name="delivery" placeholder="Укажите E-mail"/>
                  </label>
                  <label className="order-process__delivery-label order-process__delivery-label_adress">
                    <div className="order-process__delivery-text">Адрес</div>
                    <input value={address} onChange={event => setAddress(event.currentTarget.value)} className="order-process__delivery-input order-process__delivery-input_adress" type="text" name="delivery" placeholder="Ваша покупка будет доставлена по этому адресу"/>
                  </label>
                </div>
                <p>Все поля обязательны для заполнения. Наш оператор свяжется с вами для уточнения деталей заказа.</p>
              </div>
              <div className="order-process__paid">
                <h3 className="h3">хотите оплатить онлайн или курьеру при получении?</h3>
                <div className="order-process__paid-form">
                  <label className="order-process__paid-label">
                    <input className="order-process__paid-radio" type="radio" name="paid" value="onlineCard"/><span className="order-process__paid-text">Картой онлайн</span>
                  </label>
                  <label className="order-process__paid-label">
                    <input className="order-process__paid-radio" type="radio" name="paid" value="offlineCard" defaultChecked /><span className="order-process__paid-text">Картой курьеру</span>
                  </label>
                  <label className="order-process__paid-label">
                    <input className="order-process__paid-radio" type="radio" name="paid" value="offlineCash"/><span className="order-process__paid-text">Наличными курьеру</span>
                  </label>
                </div>
              </div>
              <button disabled={!isComplete} className={`order-process__form-submit order-process__form-submit_click ${isComplete ? '' : 'order-process__form-submit_disabled '}`} >Подтвердить заказ</button>
            </form>
  )
}