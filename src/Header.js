import React from 'react';
import {Link} from 'react-router-dom';
import {MainMenu, DroppedMenu, TopMenu} from './Menu';
import { Cart} from './Cart';
import { CartContext } from './CartContext';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {dropOpen: false, activeMenuItem: ''}
    this.handleMainMenuClick = this.handleMainMenuClick.bind(this);
  }
  handleMainMenuClick(event) {
    const item = event.currentTarget;
    
    if (item.classList.contains('main-menu__item_active')) {
      item.classList.remove('main-menu__item_active');
      this.setState({
        dropOpen: false,
        activeMenuItem: item.dataset.id
      })
    } else {
    this.setState({
        dropOpen: true, 
        activeMenuItem: item.dataset.id});
    }
  }
  saveCategories(data) {
    this.props.saveCategories(data);
  }
  
  render() {
  return (
    <header className="header">
      <TopMenu />
      <HeaderMain>
       {/*  <Profile /> */}
        {/* <HiddenPanel > */}
          {/* links */}
          {/* <Basket /> */}
        {/* </HiddenPanel> */}
      </HeaderMain>
      <MainMenu saveCategories={this.saveCategories.bind(this)} onClick={this.handleMainMenuClick} active={this.state.activeMenuItem}/>
      <DroppedMenu visible={this.state.dropOpen} activeCategory={this.state.activeMenuItem}/>
    </header>
  )
  }
}

class HeaderMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {visible: '', searchHidden: true}
  }

  setVisible(block) {
    this.setState({visible: this.state.visible === block ? "" : block})
  }
  handleSearchClick() {
    this.setState({searchHidden: !this.state.searchHidden})
  }
  render() {
    return (
    <div className="header-main">
        <div className="header-main__wrapper wrapper">
          <div className="header-main__phone">
            <a href="tel:+7-495-790-35-03">+7 495 79 03 5 03</a>
            <p>Ежедневно: с 09-00 до 21-00</p>
          </div>
          <div className="header-main__logo">
            <Link to="/">
              <h1>
                 <img src="https://i.ibb.co/80BZcHB/header-logo.png" alt="header-logo" />
              </h1>
            </Link>
            <p>Обувь и аксессуары для всей семьи</p>
          </div>
          <div className="header-main__profile">
            <div className="header-main__pics">
              <div className={`header-main__pic header-main__pic_search ${!this.state.searchHidden ? "header-main__pic_search_is-hidden" : ""}`} onClick={() => this.handleSearchClick()}></div>
              <div className="header-main__pic_border"></div>
              <div className="header-main__pic header-main__pic_profile" onClick={() => this.setVisible('profile')}>
                <div className="header-main__pic_profile_menu"></div>
              </div>
              <div className="header-main__pic_border"></div>
              <div className="header-main__pic header-main__pic_basket" onClick={() => this.setVisible('basket')}>
              <CartContext.Consumer>
                {context => <div className="header-main__pic_basket_full" style={context.cartItems.length > 0 ? {display: "block"} : {display: "none"}}>{context.cartItems.length}</div>}
              </CartContext.Consumer>
                <div className="header-main__pic_basket_menu"></div>
              </div>
            </div>
{/*             <form  className={`header-main__search ${this.state.searchHidden ? "" : "header-main__search_active"}`} >
              <input placeholder="Поиск"/>
              <i className="fa fa-search" aria-hidden="true"></i>
            </form> */}
          </div>
        </div>
    <div className={`header-main__hidden-panel hidden-panel ${this.state.visible ? "header-main__hidden-panel_visible" : ''}` } >
    <div className="wrapper">
      <div className={`hidden-panel__profile ${this.state.visible === 'profile' ? "hidden-panel__profile_visible" : ""}`}>
        <Link to="/">Личный кабинет</Link>
        <Link to="/favorite">
          <i className="fa fa-heart-o" aria-hidden="true"></i>Избранное</Link>
        <Link to="/">Выйти</Link> 
      </div>
      <CartContext.Consumer>
        {context => <Cart visible={this.state.visible} setVisible={() => this.setState({visible: ''})} {...context}/>}
      </CartContext.Consumer>
      
    </div>
  </div>  
</div>
  )
}
}



