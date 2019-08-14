import React from 'react';

export function withSlider(max, items){
  return Component => class extends React.Component {
    constructor(...args) {
      super(...args);
      this.state = {
        first: 0, 
        last: this.state.first + max < items.length ? this.state.first + max : items.length - 1
      }
    }

    isFewerThanMax() {
      return items.length <= max
    }

    next() {
      if (this.state.first === items.length - 1) {
        this.setState({
          first: 0,
          last: max < items.length ? max : items.length - 1
        })
      } else {
        this.setState({
          first: this.state.first + 1,
          last: this.state.first + max < items.length ? this.state.first + max : items.length - 1
        })
      }
    }
    
    previous() {
      if (this.state.first === 0) {
        this.setState({
          first: items.length - 1,
          last: items.length - 1 - max
        })
      }
    }

    render() {
      return <Component {...this.props} />
    }
  }
  
}