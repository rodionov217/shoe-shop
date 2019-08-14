import React from 'react'
import { withRouter } from 'react-router-dom'

export const CartContext = React.createContext();

class CartContextProviderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      //cartId: localStorage.bosaNogaCartId,
      cartItems: [],
      order: ''
    }
  }

  get cartId() {
    return localStorage.bosaNogaCartId;
  }

  setNewCart(order) {
    const params = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(order)
    };
    fetch('https://api-neto.herokuapp.com/bosa-noga/cart', params)
      .then(res => res.json())
      .then(response => {
        console.log(response);
        localStorage.bosaNogaCartId = response.data.id;
        this.getCart();
      })
  }

  setCartItems(data) {
    const {products, id} = data;
    let list = [];
    //this.state.cartItems
    products.forEach((product, i) => {
      fetch(`https://api-neto.herokuapp.com/bosa-noga/products/${product.id}`)
        .catch(e => console.log(e))
        .then(res => res.json())
        .then(response => {
          const newItem = response.data;
          newItem.amount = product.amount;
          newItem.size = product.size;
          list.push(newItem);

          if (i === products.length - 1) {
          this.setState({ cartItems: list });
        }
        })
    })
  }

  updateCart(order, info) {
    console.log("UPDATE CART", this.cartId);
    //удаление последнего товара
    if (order.amount === 0 && this.state.cartItems.length === 1) {
      localStorage.bosaNogaCartId = '';
      this.setState({cartItems: []});
      return
    }

    if (this.cartId ) {
      console.log("UpdateCART if this.cartId");
      const params = {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(order)
      };
      fetch(`https://api-neto.herokuapp.com/bosa-noga/cart/${this.cartId}`, params)
        .then(res => res.json())
        .then(response => {
          if (response.data) {
            this.setCartItems(response.data)
          } else {
            console.log(response);
          }
          })
  } else {
      this.setNewCart(order);
    }
  }

  getCart() {
    const id = this.cartId;
    if (id) {
      fetch(`https://api-neto.herokuapp.com/bosa-noga/cart/${id}`)
        .then(res => res.json())
        .then(response => this.setCartItems(response.data))
    }
  }

  createOrder(order, email) {
    const params = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(order)
    }
    fetch('https://api-neto.herokuapp.com/bosa-noga/order', params)
      .then(res => res.json())
      .then(response => {
        const {name, phone, address, paymentType, cart} = response.data.info;
        this.props.history.push({
          pathname: '/order-done',
          state: {
            name: name,
            phone: phone,
            address: address,
            paymentType: paymentType,
            cart: cart,
            email: email,
            total: this.state.cartItems.reduce((sum, next) => sum + next.price, 0)
          }
        });
        localStorage.bosaNogaCartId = '';
        this.setState({cartItems: []})
      })
  }
  render() {
    return (
    <CartContext.Provider 
      value={{
        cartId: this.cartId,
        cartItems: this.state.cartItems,
        order: this.state.order,
        getCart: this.getCart.bind(this),
        setNewCart: this.setNewCart.bind(this),
        updateCart: this.updateCart.bind(this),
        createOrder: this.createOrder.bind(this)
    }}>
      {this.props.children}
    </CartContext.Provider>
    )
  }
}

export const CartContextProvider = withRouter(CartContextProviderComponent)