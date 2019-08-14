import React from 'react';

export function withFetcher(endPoint, propName) {
  return  Component => class extends React.Component {
    constructor(...args) {
      super(...args);
      this.state = {} 
    }
    static get displayName() {
      const name = Component.displayName || Component.name || 'Component';
      return `WithFetcher(${name})`
    }
    getEndPoint(props) {
      //console.log("<<<<<<WithFetcher!!!!>>>>>ComponentProps", this.props);
      //console.log("Props", props);
      const filters = props.filters && props.filters.length > 0 ? 
                      props.filters.map(filter => filter.name ? filter.name + '=' + filter.value : '').join('&') :
                      '';
      const sortBy = props.sortBy ? `sortBy=${props.sortBy}` : '';
      const page = props.page || 1;
      
      if (endPoint === 'products' ) {
        //console.log(props.category);
        const category = props.category !== undefined ? `categoryId=${props.category}` : '';
        const query = `products?${category}&${filters}&${sortBy}&page=${page}`; 
        return query;
      } else if (endPoint === 'products/') {
        const query = `products/${props.match.params.id}`;
        return query;
      } else if (endPoint === 'favorite') {
        const from = 12 * page - 12, to = 12 * page;
        const favorites = JSON.parse(localStorage.bosaNogaFavorites).slice(from, to);
        const query = `products?${favorites.map(el => 'id[]=' + el).join('&')}&${sortBy}`;
        return query;
      } else if (endPoint === 'similar') {
        const category = props.category !== undefined ? `categoryId=${props.category}` : '';
        console.log('PROPS in FETCHER', props);
        const similar = `color=${props.info.color}&type=${props.info.type}`
        const query = `products?${category}&${similar}`;
        return query;
      }
      return endPoint;
    }
    fetchData(props) {
      fetch(`https://api-neto.herokuapp.com/bosa-noga/${this.getEndPoint(props)}`)
        .then(result => result.json())
        .then(data => this.setState({
          [propName]: data.data,
          pages: data.pages,
          goods: data.goods
        }))
    }
    componentDidMount() {
      if (this.props.products) {
        //console.log(this.props.products);
        this.fetchData(this.props);
        return;
      }
      this.fetchData(this.props);
    } 
    componentWillReceiveProps(newProps) {
      this.fetchData(newProps);
    }
    
    render() {
      const props = {
        [propName]: this.state[propName],
        pages: this.state.pages,
        goods: this.state.goods
      }
      //console.log("WithFetcher Props", props);
      return <Component {...this.props} {...props} />
    }
  }
}