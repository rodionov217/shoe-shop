import React, { Component } from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.css'
import './style.css'
import './style-catalogue.css'
import './style-favorite.css'
import './style-order.css'
import './style-product-card.css'
import './font-awesome.min.css'
import { Header } from './Header'
import { Homepage } from './Homepage'
import { Favorite } from './Favorite'
import { Footer } from './Footer'
import { Catalogue } from './Catalogue'
import { ProductPage } from './ProductPage'
import { CartContextProvider } from './CartContext';
import { OrderPage } from './OrderPage';
import { OrderDone } from './OrderDone'
import { FavoriteContextProvider } from './FavoriteContext';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {currentCategory: '', currentFilters: [], allCategories: []}
  }
  updateCategory(category) {
    this.setState({currentCategory: category})
  }
  updateFilters(filter) {
    const {currentFilters} = this.state;
    currentFilters.push(filter);
    this.setState({currentFilters: currentFilters})
  }
  componentWillMount() {
    if (!localStorage.bosaNogaFavorites) {
      localStorage.setItem('bosaNogaFavorites', '[]');
    }
    if (!sessionStorage.overlooked) {
      sessionStorage.setItem('overlooked', '[]')
    }
  }
  saveCategories(data) {
    //console.log(data);
    this.allCategories = data;
    if (data !== this.state.allCategories) this.setState({allCategories: data});
  }
  

  render() {
    
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL+'/'}>
      <div className="container">
      <FavoriteContextProvider>
        <CartContextProvider>
          <Header saveCategories={this.saveCategories.bind(this)} updateCategory={this.updateCategory.bind(this)} updateFilters={this.updateFilters.bind(this)}/>
          <Switch>
            <Route path='/product-card-desktop/:id?' render={(props) => <ProductPage {...props} />}/>
            <Route path='/favorite' component={Favorite}/>
            <Route path='/order-done' render={(props) => <OrderDone {...props}/>}/>
            <Route path='/order' component={OrderPage}/>
            <Route path='/catalogue' render={(props) => <Catalogue {...props} allCategories={this.allCategories} updateCategory={this.updateCategory.bind(this)} updateFilters={this.updateFilters.bind(this)}/>}/>
            <Route path='/' exact render={() => <Homepage allCategories={this.allCategories}/>}/>
          </Switch>
          <Footer />
        </CartContextProvider>
      </FavoriteContextProvider>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
