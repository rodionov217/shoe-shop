import React from 'react'
import { Fragment } from 'react'
import { withFetcher } from './withFetcher'
import { CartContext } from './CartContext';
import { Overlooked } from './Overlooked';
import { FavoriteContext } from './FavoriteContext';
import { Similar } from './Similar';


const Product = (props) => {
  console.log(props);
  let img;

  const updateOverlooked = (info) => {
    let overlooked = JSON.parse(sessionStorage.overlooked);
    if (!overlooked.find(el => el.id === info.id)) {
      overlooked.push(info);
    }
    sessionStorage.overlooked = JSON.stringify(overlooked);
  }

  if (props.info) {
    const {title, images} = props.info;
    
    const handleClick = (event) => {
      event.preventDefault();
      img.src = props.info.images[event.currentTarget.dataset.i]
    }
  
    updateOverlooked(props.info);
    return (
      <Fragment>
      <main className="product-card">
        <section className="product-card-content">
          <h2 className="section-name">{title}</h2>

          <section className="product-card-content__main-screen">
            {/* <!-- Слайдер выбранного товара --> */}
            <section className="main-screen__favourite-product-slider">
              <div className="favourite-product-slider">
                {images.length > 3 ?
                  <div className="favourite-product-slider__arrow favourite-product-slider__arrow_up arrow-up"></div> :
                  null
                }

                {images.map((el, i) => (
                  <div key={i} className={`favourite-product-slider__item favourite-product-slider__item-${i+1}`} style={{background: `url(${el})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "contain"}}>
                    <a href='/' data-i={i} onClick={handleClick}></a>
                  </div>))}
                
                {images.length > 3 ?
                <div className="favourite-product-slider__arrow favourite-product-slider__arrow_down arrow-down"></div> :
                null
                }
              </div>
            </section>

            {/* <!-- Изображение выбранного товара --> */}									
            <div className="main-screen__favourite-product-pic">
              <img ref={el => img = el} src={images[0]} alt=""/>
            </div>
          
          {/* <!-- Блок информации о товаре --> */}
          <CartContext.Consumer>
            {context => <ProductInfo {...props.info} {...context}/>}
          </CartContext.Consumer>

          </section>
        </section>
      </main>
      <Overlooked />
{/*       <Similar info={props.info} /> */}
      </Fragment>
    )
  } else {
    return null;
  }
}

export const ProductPage = withFetcher('products/', 'info')(Product);



class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {amount: 1, size: null}
  }
  updateAmount(update) {
    switch (update) {
      case "+":
        this.setState({amount: this.state.amount + 1});
      break;

      case "-": 
        if (this.state.amount === 1) { 
          return;
        }
        this.setState({amount: this.state.amount - 1});
    }
  }
  updateSize(event) {
    event.preventDefault();
    this.setState({size: parseInt(event.currentTarget.textContent)})
  }
  render() {
  const {id, title, color, brand, sku, season, reason, material, sizes, price, images} = this.props;
  return (
    
    <div className="main-screen__product-info">
      <div className="product-info-title">
        <h2>{title}</h2>
        <div className="in-stock">{sizes.length > 0 ? 'В наличии' : ''}</div>
      </div>

      <div className="product-features">
        <table className="features-table"> 
          <tbody>
            <tr>
              <td className="left-col">Артикул:</td>
              <td className="right-col">{sku}</td>
            </tr>
            <tr>
              <td className="left-col">Производитель:</td>
              <td className="right-col"><span className="producer">{brand}</span></td>
            </tr>
            <tr>
              <td className="left-col">Цвет:</td>
              <td className="right-col">{color}</td>
            </tr>
            <tr>
              <td className="left-col">Материалы:</td>
              <td className="right-col">{material}</td>
            </tr>
            <tr>
              <td className="left-col">Сезон:</td>
              <td className="right-col">{season}</td>
            </tr>
            <tr>
              <td className="left-col">Повод:</td>
              <td className="right-col">{reason}</td>
            </tr>
           </tbody>
        </table>
       </div>

      <p className="size">Размер</p>
      <ul className="sizes">
      {sizes.map((el, i) => el.available ? <li key={i}  className={el.size == this.state.size ? "active" : ''}><a href="/" onClick={this.updateSize.bind(this)}>{el.size}</a></li> : null)}
      </ul>
      {/* <div className="size-wrapper">
          <a href="/"><span className="size-rule"></span><p className="size-table">Таблица размеров</p></a>
      </div> */}
      <FavoriteContext.Consumer >{context => <FavoriteButton id={id} {...context} />}</FavoriteContext.Consumer>
      
      <div className="basket-item__quantity">
        <div className="basket-item__quantity-change basket-item-list__quantity-change_minus" onClick={() => this.updateAmount("-")}>-</div>{this.state.amount}
        <div className="basket-item__quantity-change basket-item-list__quantity-change_plus" onClick={() => this.updateAmount("+")}>+</div>
      </div>
      <div className="price">{price} ₽</div>
      <button 
        className={`in-basket in-basket-click ${this.state.size === null ? 'in-basket_disabled' : ''}`}
        onClick={() => {
          if (!this.state.size) {
            return
          }
        const order = {id: id, size: this.state.size, amount: this.state.amount};
        const info = {title: title, images: images, price: price, brand: brand, color: color}
        this.props.updateCart(order, info);
      }}>В корзину</button>
    </div>
 
  )
    }
}

const FavoriteButton = (props) => {
  const {id, isFavorite, addFavorite, removeFavorite} = props;
  const handleClick = (event) => {
    event.preventDefault();
    if (isFavorite(id)) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  }
  return (
        <a href="/" className="in-favourites-wrapper" onClick={handleClick}>
          <div className={`favourite${isFavorite(id) ? '-chosen' : ''}`}></div>
          <p className="in-favourites">{isFavorite(id) ? 'В избранном' : 'В избранное'}</p>
        </a>
      
  )
}
