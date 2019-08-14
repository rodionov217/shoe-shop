import React from 'react';
import {withFetcher} from './withFetcher';
import {Link} from 'react-router-dom';


class  MainMenuView extends React.Component {
  constructor(props) {
    super(props);
  }
componentWillReceiveProps(newProps) {
  if (this.props.categories !== newProps.categories && newProps.categories !== undefined && this.props.categories === undefined) {
    this.props.saveCategories(newProps.categories)
  }
}
shouldComponentUpdate(newProps) {
  if (newProps.active !== this.props.active) {
    return false;
  } 
    return true;
}

  render() {
    
  const {onClick, active} = this.props;
  const categories = this.props.categories || [];
  return (
    <nav className="main-menu">
        <div className="wrapper">
          <ul className="main-menu__items">
            {categories.map((el, i) => <li key={i} data-id={el.id} onClick={onClick} className={`main-menu__item ${el.id == active ? "main-menu__item_active" : ""}`}><a onClick={(event) => event.preventDefault()} href="/">{el.title}</a></li>)}
          </ul>
        </div>
      </nav>
  )
  }
}

class DroppedMenuView extends React.Component{
  constructor(props) {
    super(props);
  }
  getList(list) {
    let formattedList;
    if (list.length > 6) {
      formattedList = list.slice(0, 6);
      formattedList.push('Все');
      return formattedList;
    }
    return list;
  }
  render() {
    const {visible, activeCategory, subcategories} = this.props;

    if (subcategories !== undefined) {
      const {reason, type, season, brand} = subcategories;
      return (
        <div className={`dropped-menu ${visible ? 'dropped-menu_visible' : ''}`}>
          <div className="wrapper">
          <DroppedMenuList 
            activeCategory={activeCategory}
            list={this.getList(reason)}
            title="Повод"
            filterName="reason"/>
          <DroppedMenuList
            activeCategory={activeCategory} 
            list={this.getList(type)} 
            title="Катeгории" 
            filterName="type"/>
          <DroppedMenuList
            activeCategory={activeCategory} 
            list={this.getList(season)} 
            title="Сезон" 
            filterName="season"/>
          <DroppedMenuList
            activeCategory={activeCategory} 
            list={this.getList(brand)} 
            title="Бренды" 
            filterName="brand"/>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}

const DroppedMenuList = (props) => {
  const {title, list, activeCategory, filterName} = props;

  return (
    <div className={`dropped-menu__lists`}>
      <h3 className="dropped-menu__list-title">{title}</h3>
      <ul className="dropped-menu__list">
      {list.map((el, i) => (
          <li onClick={() => window.scrollTo({top: 555})} key={i} className="dropped-menu__item">
            {el === "Все" ? 
            <Link  to={ {pathname: "/catalogue", state: {category: activeCategory}} }>{el}</Link> :
            <Link to={{pathname: "/catalogue", state: {category: activeCategory, filterName: filterName, filterValue: el}}} >{el}</Link>}
           </li>))}
      </ul>
    </div>
  )
}

const TopMenu = () => {
  return (
    <div className="top-menu">
        <div className="wrapper">
          <ul className="top-menu__items">
            <li className="top-menu__item">
              <a href="/">Возврат</a>
            </li>
            <li className="top-menu__item">
              <a href="/">Доставка и оплата</a>
            </li>
            <li className="top-menu__item">
              <a href="/">О магазине</a>
            </li>
            <li className="top-menu__item">
              <a href="/">Контакты</a>
            </li>
            <li className="top-menu__item">
              <a href="/">Новости</a>
            </li>
          </ul>
        </div>
      </div>
  )
}


const MainMenu = withFetcher('categories', 'categories')(MainMenuView);
const DroppedMenu = withFetcher('filters', 'subcategories')(DroppedMenuView);

export {MainMenu, TopMenu, DroppedMenu};