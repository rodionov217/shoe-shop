import React from 'react';
import { withFetcher } from './withFetcher';
import { ProductList } from './ProductList';
import { SortBy } from './SortBy';
import { ProductListCard } from './ProductListCard';
import { FavoriteContext } from './FavoriteContext';
import { Pagination } from './Pagination';


export class CatalogueView extends React.Component{
  constructor(props){
    super(props);
    this.state = {...props}
  }
  render() {
    this.title = this.props.allCategories ? this.props.allCategories.find(el => el.id == this.props.category).title : '';

    const count = this.props.goods || 0;
    const title = this.title;
    const list = this.props.list || [];
    const pages = this.props.pages || 0;
    return (
    <section className="product-catalogue-content">
 
        <section className="product-catalogue__head">
          <div className="product-catalogue__section-title">
            <h2 className="section-name">{title}</h2><span className="amount">{count} товаров</span>
          </div>
        </section>
        {/* SortBy */}
        <section  className="product-catalogue__item-list">
          {list.map((item, i) => <FavoriteContext.Consumer>{context => <ProductListCard {...context} {...item} key={i}/>}</FavoriteContext.Consumer>)}
        </section>
        {pages > 0 && list.length >= 12 ? <Pagination 
          pages={pages} 
          currentPage={this.props.page} 
          setPage={this.props.setPage} /> : null}
     </section>
  )
  }
}



export const CatalogueContent = withFetcher('products', 'list')(CatalogueView);