import React, { Fragment } from 'react';
import { CatalogueContent } from './CatalogueContent';
import { Sidebar } from './Sidebar';
import { Overlooked } from './Overlooked';


export class Catalogue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: '', 
      category: this.props.location.state.category,
      filters: this.props.location.state.filterName ? [
        {
          name: this.props.location.state.filterName,
          value: this.props.location.state.filterValue
        }
      ] : [],
      currentPage: 1
    }
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      category: newProps.location.state.category,
      filters: [
        {
          name: newProps.location.state.filterName,
          value: newProps.location.state.filterValue
        }
      ]
    })
  }

  updateFilter(newFilter) {
    const { filters } = this.state;
    if (!newFilter) {
      this.setState({filters: []})
    } else {
    const similar = filters.findIndex(filter => filter.name === newFilter.name);
    const same = filters.findIndex(filter => filter.name === newFilter.name && filter.value === newFilter.value);

    if (same !== -1) { // если найден такой же то удаляем
      
      filters.splice(same, 1);
    } else if ( similar !== -1) { 
      //если не найдет такой же но найден похожий и это не размер
      if (newFilter.name.toLowerCase().includes('size')) {

        filters.push(newFilter);
      } else {

        filters[similar] = newFilter;
      }
    } else {
      filters.push(newFilter)
    }
    
    this.setState({filters: filters});
  }
  }

setPage(page) {
  this.setState({currentPage: page})
}
 
  render() {
    return (
      <Fragment>
        <main className="product-catalogue" style={{minHeight: "1700px"}}>
          <Sidebar 
              onChange={this.updateFilter.bind(this)} 
              currentFilters={this.state.filters}/>
          <CatalogueContent 
              allCategories={this.props.allCategories}
              filters={this.state.filters} 
              category={this.state.category} 
              page={this.state.currentPage} 
              setPage={this.setPage.bind(this)}/>
        </main>
        <Overlooked />
      </Fragment>
    )
  }
}