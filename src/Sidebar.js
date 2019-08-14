import React from 'react';
import { withFetcher } from './withFetcher';

const SidebarView = (props) => {
  const filters = props.availableFilters;
  return !filters ? null : (
    <section className="sidebar">
      <SidebarTypeFilter list={filters.type} onChange={props.onChange}/> 
      <div className="separator-150 separator-150-1"></div>
      <SidebarPriceFilter onChange={props.onChange}/>
      <div className="separator-150 separator-150-2"></div>
      <SidebarColorFilter list={filters.color} onChange={props.onChange}/>
      <div className="separator-150 separator-150-3"></div>         
      <SidebarSizeFilter list={filters.sizes} onChange={props.onChange} />
      <div className="separator-150 separator-150-4"></div>   
      <SidebarHeelSizeFilter list={filters.heelSize} onChange={props.onChange}/> 
      <div className="separator-150 separator-150-5"></div>            
      <SidebarReasonFilter list={filters.reason} onChange={props.onChange}/>
      <div className="separator-150 separator-150-6"></div>   
      <SidebarSeasonFilter list={filters.season} onChange={props.onChange}/>  
      <div className="separator-150 separator-150-7"></div>            

      <SidebarDiscountFilter onChange={props.onChange}/>

      <SidebarResetFilters onClick={props.onChange} />
      </section>
  )
}

class SidebarCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {checked: false}
  }
  setChecked() {
    //this.props.onSizeChange({name: this.props.filter, value: this.props.size});
    this.setState({checked: !this.state.checked})
  }
  componentDidUpdate() {
    this.props.onChange({name: this.props.filter, value: this.props.size})
  }
  shouldComponentUpdate(newProps, newState) {
    if ( newState.checked === this.state.checked) {
      return false;
    } else {
      return true;
    }
  }
  render() {
    console.log("CHECKBOX RENDER");
    return(
      <li>
        <label>
          <input checked={this.state.checked} onChange={this.setChecked.bind(this)} type="checkbox" className="checkbox" name={this.props.size}/>
          <span className="checkbox-custom"></span> 
          <span className="label">{this.props.size}</span>
        </label>
      </li>
    )
  }
}

const SidebarCheckboxList = (props) => {
  const {list} = props;
  const items1 = list.filter((size, i) => i % 2 === 0);
  const items2 = list.filter((size, i) => i % 2 !== 0);
  return(
    <ul >
      <div className="list-1">
        {items1.map((size, i) => <SidebarCheckbox filter={props.filter} onChange={props.onChange} key={i} size={size}/>)}
        </div>
        <div className="list-2">
          {items2.map((size, i) => <SidebarCheckbox filter={props.filter} onChange={props.onChange} key={i} size={size}/>)}
      </div>
    </ul>
  )
}

const SidebarColorList = ({list, onChange}) => {
  const colors = {
    "Черный": "black",
    "Бежевый": "beige",
    "Серый": "gray",
    "Бардо": "#b00000",
    "Белый": "white",
    "Прозрачный": "transparent",
    "Синий": "blue",
    "Красный": "red",
    "Темно-салатовый": "#33ff33",
    "Фиолетовый": "violet",
    "Беж": "beige",
    "Оранжевый": "orange",
    "Металлик": "lightsteelblue",
    "Разноцветные": "linear-gradient(to right, red, green, blue)",
    "Коричневый": "brown",
    "Серебряный": "silver",
    "Черно-белый": "linear-gradient(to right, black 50%, white 50%)",
    "Розовый": "pink"
  }
 const handleClick = (event) => {
   event.preventDefault();
   onChange({name: 'color', value: event.target.textContent})
 }
  return (
    <ul onClick={handleClick}>
      {list.map((item, i) => (
          <li key={i}>
            <a href="/">
              <div className="color" style={{"background": colors[item]}}></div>
              <span className="color-name">{item}</span>
            </a>
          </li>))}
    </ul>
  )
}

const SidebarLinkList = ({list, onChange, filter}) => {
  const handleClick = (event) => {
    event.preventDefault();
    onChange({name: filter, value: event.target.textContent});
  }
  return (
    <ul>
      {list.map((item, index) => <li key={index} onClick={handleClick}><a href="/" >{item}</a></li>)}
    </ul>
  )
}

const SidebarResetFilters = ({onClick}) => {
  const handleClick = (event) => {
    event.preventDefault();
    onClick();
  }
  return (
    <section className="sidebar__division">
      <div className="drop-down" onClick={handleClick}>
        <a href="/" ><span className="drop-down-icon"></span>Сбросить</a>
      </div>
    </section>
  )
}

const SidebarTypeFilter = ({list, onChange}) => (
        <section className="sidebar__division">
          <div className="sidebar__catalogue-list">
            <div className="sidebar__division-title">
              <h3>Каталог</h3>
              <div className="opener-down"></div>
            </div>
            <SidebarLinkList list={list} onChange={onChange} filter='type'/>
          </div>
        </section>
)

const SidebarPriceFilter = ({onChange}) => {
  return (
    <section className="sidebar__division">
            <div className="sidebar__price">
              <div className="sidebar__division-title">
                <h3>Цена</h3><div className="opener-down"></div>
              </div>
              <div className="price-slider">
                <div className="circle-container">
                  <div className="circle-1"></div>
                  <div className="line-white"></div>
                  <div className="line-colored"></div>
                  <div className="circle-2"></div>
                </div>
                <div className="counter">
                  <input type="text" className="input-1" defaultValue="1000"/>
                  <div className="input-separator"></div>
                  <input type="text" className="input-2" defaultValue="30 000"/>
                </div>
              </div>
            </div>
        </section>
  )
}

const SidebarColorFilter = (props) => (
        <section className="sidebar__division">
          <div className="sidebar__color">
            <div className="sidebar__division-title">
              <h3>Цвет</h3><div className="opener-down"></div>
            </div>
            <SidebarColorList list={props.list} onChange={props.onChange}/>
          </div>
        </section>
)

const SidebarSizeFilter = (props) => (
        <section className="sidebar__division">
          <div className="sidebar__size">
            <div className="sidebar__division-title">
              <h3>Размер</h3><div className="opener-down"></div>
            </div>
            <SidebarCheckboxList filter='size' onChange={props.onChange} list={props.list} />
          </div>
        </section>
)

const SidebarHeelSizeFilter = (props) => (
  <section className="sidebar__division">    
          <div className="sidebar__size">
            <div className="sidebar__division-title">
              <h3>Размер каблука</h3><div className="opener-up"></div>
            </div>
            <SidebarCheckboxList filter='heelSize' onChange={props.onChange} list={props.list} />
          </div>
        </section>
)

const SidebarReasonFilter = (props) => (
  <section className="sidebar__division">  
          <div className="sidebar__occasion">
            <div className="sidebar__division-title">
              <h3>Повод</h3><div className="opener-down"></div>
            </div>
            <SidebarLinkList list={props.list} onChange={props.onChange} filter='reason'/>
          </div>
        </section>
)

const SidebarSeasonFilter = (props) => (
  <section className="sidebar__division">  
          <div className="sidebar__season">
            <div className="sidebar__division-title">
              <h3>Повод</h3><div className="opener-down"></div>
            </div>
            <SidebarLinkList list={props.list} onChange={props.onChange} filter='season'/>
          </div>
        </section>
)

const SidebarBrandFilter = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onChange({name: 'brand', value: event.currentTarget[0].value});
  }
  return (
  <section className="sidebar__division">
            <div className="sidebar__brand">
              <h3>Бренд</h3>
              <form className="brand-search" onSubmit={handleSubmit}>
                <input type="search" className="brand-search" id="brand-search" placeholder="Поиск" list="brands"/>
                <datalist id="brands" >
                  {props.list.map((el, i) => <option key={i} value={el}/>)}
                </datalist>
                <input type="submit" name="" value="" className="submit"/>
              </form>
            </div>
            {props.children}
          <div className="separator-240"></div>
        </section>
)}

const SidebarDiscountFilter = (props) => {
  const handleChange = (event) => {
    //console.log(event.currentTarget.checked);
    props.onChange({name: 'discounted', value: event.currentTarget.checked});
  }
  return(
  <label>
    <input onChange={handleChange} type="checkbox" className="checkbox" name="checkbox-disc"/>
    <span className="checkbox-discount"></span> 
    <span className="text-discount">Со скидкой</span>
  </label>
)
}


export const Sidebar = withFetcher('filters', 'availableFilters')(SidebarView);


