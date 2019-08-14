import React from 'react'
import { Link } from 'react-router-dom'
import { withFetcher } from './withFetcher';
import { FavoriteContext } from './FavoriteContext';

const NewDealsMenu = ({categories, activeCategory, onClick}) => {
  return (
    <div className="new-deals__menu">
        <ul className="new-deals__menu-items">
        <li className={`new-deals__menu-item ${activeCategory === '' ? 'new-deals__menu-item_active' : ''}`}>
            <a href="/" onClick={event => {event.preventDefault(); onClick()}}>Все</a>
          </li>
          {categories.map(el => <li  key={el.id} className={`new-deals__menu-item ${el.id === activeCategory ? 'new-deals__menu-item_active' : ''}`}>
            <a href="/" onClick={event => {event.preventDefault(); onClick(el.id)}}>{el.title}</a>
          </li>)}
        </ul>
      </div>
  )
}



const NewDealsSlider = (props) => {
  const handleFavorite = (event) => {
    event.preventDefault();
    if (event.currentTarget.className === 'new-deals__product_favorite-chosen') {
      props.removeFavorite(props.active.id);
    } else {
      props.addFavorite(props.active.id);
    }
  }
  return (
    <div className="new-deals__slider">
      <div className="new-deals__arrow new-deals__arrow_left arrow" onClick={props.previous}></div>

      <div className="new-deals__product new-deals__product_first" style={{backgroundImage: `url(${props.first.images[0]})`}}>
        <Link to={`/product-card-desktop/${props.first.id}`} ></Link>
      </div>

      <div className="new-deals__product new-deals__product_active" style={{backgroundImage: `url(${props.active.images[0]})`}}>
        <Link to={`/product-card-desktop/${props.active.id}`} ></Link>
        <div className={`new-deals__product_favorite${props.isFavorite(props.active.id) ? "-chosen" : ""}`} onClick={handleFavorite}></div>
      </div>

      <div className="new-deals__product new-deals__product_last" style={{backgroundImage: `url(${props.last.images[0]})`}}>
        <Link to={`/product-card-desktop/${props.last.id}`} ></Link>
      </div>

      <div className="new-deals__arrow new-deals__arrow_right arrow" onClick={props.next}></div>
    </div>
  )
}
const NewDealsProductInfo = ({title, brand, price, id}) => {
  return (
    <div className="new-deals__product-info">
      <Link to={`/product-card-desktop/${id}`} className="h3">{title}</Link>
      <p>Производитель:
        <span>{brand}</span>
      </p>
      <h3 className="h3">{price} ₽</h3>
    </div>
  )
}
class NewDealsContent extends React.Component{
  constructor(props) {
    super(props);
    this.state = {active: 0, category: ''}

  }
  changeCategory(id) {
    if (id) {
      this.setState({category: parseInt(id), active: 0})
    } else {
      this.setState({category: '', active: 0})
    }
  }

  get items() {
    const items = this.props.items;
    if (!items || items.length === 0 ) {
      return [];
    }
    if (this.state.category === '') {
      return items;
    } 
    return items.filter(item => item.categoryId === this.state.category);
  }
  
  get first() {
    return this.state.active === 0 ? this.items.length - 1 : this.state.active - 1;
  }
   
  get last() {
    return this.state.active === this.items.length - 1 ?  0 : this.state.active + 1;
  }

  next() {
    if (this.state.active === this.items.length - 1) {
      this.setState({active: 0});
    } else {
      this.setState({active: this.state.active + 1})
    }
  }

  previous() {
    if (this.state.active === 0) {
      this.setState({active: this.items.length - 1})
    } else {
      this.setState({active: this.state.active - 1})
    }
  }
  
  render() {
    const itemsList = this.props.items || [];
    const items = this.items;
    const { active, category} = this.state;
    const categories = this.props.categories ? this.props.categories.filter(el => itemsList.find(item => item.categoryId === el.id)) : [];
    //console.log("NEW DEALS CONTENT PROPS", this.props);
    
    return items.length > 0 && categories.length > 0 ? (
      <section className="new-deals wave-bottom">
        <h2 className="h2">Новинки</h2>
        <NewDealsMenu categories={categories} activeCategory={category} onClick={this.changeCategory.bind(this)}/>
        <FavoriteContext.Consumer>
          {context => <NewDealsSlider {...context} active={items[active]} first={items[this.first]} last={items[this.last]} next={this.next.bind(this)} previous={this.previous.bind(this)} />}
        </FavoriteContext.Consumer>
        <NewDealsProductInfo {...items[active]} />
      </section>
    ) : null;
}
}

export const NewDeals = withFetcher('featured', 'items')(NewDealsContent);