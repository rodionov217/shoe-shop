import React, { Fragment} from 'react';
import {FavoriteHeader} from './FavoriteHeader';
import {SortBy} from './SortBy';
import {Pagination} from './Pagination';
import {withFetcher} from './withFetcher';
import { FavoriteContext } from './FavoriteContext';
import { ProductListCard } from './ProductListCard';

export class Favorite extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'popularity',
      currentPage: 1
    }
  }

  setSortBy(value) {
    this.setState({sortBy: value});
  }

  setPage(value) {
    this.setState({currentPage: value})
  }

  render() {
    const favorites = JSON.parse(localStorage.bosaNogaFavorites);
    const {currentPage, sortBy} = this.state;
    const pages = favorites.length === 0 ? 1 : Math.ceil(favorites.length / 12);

    const height = document.documentElement.clientHeight - 246 - 334 + 'px';
    return (
      <FavoriteContext.Consumer>
        {context => <div className="wrapper wrapper_favorite" >
        {/* <BreadCrumbs path={[{title: 'Избранное'}]}/> */}
        <main className="product-catalogue product-catalogue_favorite" style={{minHeight: height}}>
          <section className="product-catalogue__head product-catalogue__head_favorite">
              <FavoriteHeader count={context.favorites.length}/>
              <SortBy onChange={this.setSortBy.bind(this)} count={context.favorites.length}/>
          </section>
          {context.favorites.length === 0 ? 
            null :
            <FavoriteContent {...context} sortBy={sortBy} page={currentPage}> 
              <Pagination currentPage={currentPage}
                          pages={pages}
                          setPage={this.setPage.bind(this)}/>
            </FavoriteContent>}
        </main>
      </div>}
      </FavoriteContext.Consumer>
    )
  }
}

const FavoriteContentView = (props) => {
  const {list, children, isFavorite, addFavorite, removeFavorite} = props;
  if (!list || list.length === 0) {
    return null;
  }
  return (
    <Fragment>
      <section className="product-catalogue__item-list product-catalogue__item-list_favorite">
      
        {list.map((item, i) =>  <ProductListCard isFavorite={isFavorite} addFavorite={addFavorite} removeFavorite={removeFavorite} {...item} key={i}/>)}
       
      </section>
      {children}
    </Fragment>
  )
}

const FavoriteContent = withFetcher('favorite', 'list')(FavoriteContentView);
