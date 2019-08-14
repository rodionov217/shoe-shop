import React from 'react'
import {Link} from 'react-router-dom'

export const OrderDone = (props) => {
  console.log(props);
  const {name, phone, address, paymentType, cart, total, email} = props.location.state;
  return (
    <div className="wrapper order-wrapper">
      <section className="order-done">
          <h2 className="order-done__title order-process__title">Заказ принят, спасибо!</h2>
          <div className="order-done__information order-info">
            <div className="order-info__item order-info__item_summ"> 
              <h3>Сумма заказа:</h3>
              <p>{total}<i className="fa fa-rub" aria-hidden="true"></i></p>
            </div>
            <div className="order-info__item order-info__item_pay-form"> 
              <h3>Способ оплаты:</h3>
              <p>{paymentType}</p>
            </div>
            <div className="order-info__item order-info__item_customer-name"> 
              <h3>Имя клиента:</h3>
              <p>{name}</p>
            </div>
            <div className="order-info__item order-info__item_adress">
              <h3>Адрес доставки:</h3>
              <p>{address}</p>
            </div>
            <div className="order-info__item order-info__item_phone">
              <h3>Телефон:</h3>
              <p>{phone}</p>
            </div>
          </div>
          <p className="order-done__notice">Данные о заказе отправлены на адрес <span>{email}  </span></p>
          <Link to='/'><button className="order-done__continue">продолжить покупки</button></Link>
        </section>
    </div>
  )
}