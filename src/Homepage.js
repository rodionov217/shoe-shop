import React from 'react';
import {PromoSlider} from './PromoSlider'
import {NewDeals} from './NewDeals'
import {SalesAndNews} from './SalesAndNews'
import {AboutUs} from './AboutUs'


export const Homepage = (props) => {
  console.log(props.allCategories);
  return (
    <div>
    {/* <Preloader />  */}

    <PromoSlider />
    <NewDeals categories={props.allCategories}/>
    <SalesAndNews />
    <AboutUs />
    
    </div>
  )
}
