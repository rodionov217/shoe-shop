import React from 'react'

export const FavoriteContext = React.createContext();

export class FavoriteContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favorites: []}
  }
  isFavorite(id) {
    return JSON.parse(localStorage.bosaNogaFavorites).includes(id);
  }
  
  
  addFavorite(id) {
    const fav = JSON.parse(localStorage.bosaNogaFavorites);
    fav.push(id);
    localStorage.bosaNogaFavorites = JSON.stringify(fav);
    this.setState({favorites: fav})
  }
  removeFavorite(id) {
    const fav = JSON.parse(localStorage.bosaNogaFavorites);
    const i = fav.indexOf(id);
    fav.splice(i, 1);
    localStorage.bosaNogaFavorites = JSON.stringify(fav);
    this.setState({favorites: fav})
  }
  render() {
    return (
    <FavoriteContext.Provider 
      value={{
        favorites: this.state.favorites,
        addFavorite: this.addFavorite.bind(this),
        removeFavorite: this.removeFavorite.bind(this),
        isFavorite: this.isFavorite.bind(this)
    }}>
      {this.props.children}
    </FavoriteContext.Provider>
    )
  }
}