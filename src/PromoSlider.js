import React, {Component} from 'react';

import sliderJpg from './img/slider.jpg'
import slider180degJpg from './img/slider180deg.jpeg'

class PromoSlider extends Component {
  constructor(props) {
    super(props);

    this._frameId = null;
    this.slider = null;
    this.sliderImages = [];
    this.sliderArrows = [];
    this.sliderButtons = [];

    this.setSliderRef = element => this.slider = element;
    this.setSliderImagesRefs = element => this.sliderImages.push(element);
    this.setSliderArrowsRefs = element => this.sliderArrows.push(element);
    this.setSliderButtonsRefs = element => this.sliderButtons.push(element);

    window.requestAnimationFrame = (function () {
      return window.requestAnimationFrame ||
        function (callback) {
          return window.setTimeout(callback, 1000 / 60);
        };
    })();
  }

  componentDidMount() {
    this.sliderLoop(this.slider, this.sliderImages, this.sliderButtons, '4000', '1000', this.sliderArrows)
  }

  componentDidUpdate() {
    window.cancelAnimationFrame(this._frameId);
    clearTimeout(this._frameId);
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this._frameId);
    clearTimeout(this._frameId);
  }

  /* eslint-disable */
  render() {
    return (
      <div className="wrapper">
        <div ref={this.setSliderRef} className="slider__pictures">
          <a ref={this.setSliderImagesRefs} className="slider__image" href="#">
            <img src={sliderJpg} alt="slide picture"/>
          </a>
          <a ref={this.setSliderImagesRefs} className="slider__image" href="#">
            <img src={slider180degJpg} alt="slide picture"/>
          </a>
          <a ref={this.setSliderImagesRefs} className="slider__image" href="#">
            <img src={sliderJpg} alt="slide picture"/>
          </a>
          <a ref={this.setSliderImagesRefs} className="slider__image" href="#">
            <img src={slider180degJpg} alt="slide picture"/>
          </a>
          <div ref={this.setSliderArrowsRefs} className="arrow slider__arrow slider__arrow_left"/>
          <div ref={this.setSliderArrowsRefs} className="arrow slider__arrow slider__arrow_right"/>
          <div className="slider__circles">
            <button ref={this.setSliderButtonsRefs} className="slider__circle" value="0"/>
            <button ref={this.setSliderButtonsRefs} className="slider__circle" value="1"/>
            <button ref={this.setSliderButtonsRefs} className="slider__circle" value="2"/>
            <button ref={this.setSliderButtonsRefs} className="slider__circle" value="3"/>
          </div>
          <h2 className="h2">К весне готовы!</h2>
        </div>
      </div>
    );
  }

  sliderLoop(f, img, button, V, Vo, arrows) {
    let iii = 0,
      start = null,
      clear = 0;

    img[0].style.zIndex = "2";

    const step = time => {
      if (start === null) start = time;
      let progress = time - start;
      if (progress > V) {
        start = null;
        for (let i = 0; i < img.length; i++) {
          img[i].style.zIndex = "0";
          button[i].style.opacity = "0.5";
        }
        img[iii].style.zIndex = "1";
        iii = ((iii != (img.length - 1)) ? (iii + 1) : 0);
        img[iii].style.zIndex = "2";
        img[iii].style.opacity = "0";
        button[iii].style.opacity = "1";
      } else if (img[iii].style.opacity != "") {
        img[iii].style.opacity = ((progress / Vo < 1) ? (progress / Vo) : 1);
      }
      if (clear != "0" && progress > Vo) {
      } else {
        this._frameId = requestAnimationFrame(step);
      }
    }

    this._frameId = requestAnimationFrame(step);
    f.onmouseenter = () => {
      if (clear == "0") clear = "1";
    }; // при наведении на слайдер
    f.onmouseleave = () => {
      if (clear == "1") {
        clear = "0";
        this._frameId = requestAnimationFrame(step);
      }
    }; // курсор убран со слайдера
    for (let j = 0; j < button.length; j++) { // при нажатии кнопок
      button[j].onclick = function () {
        for (let i = 0; i < img.length; i++) {
          img[i].style.zIndex = "0";
          button[i].style.opacity = "0.5";
        }
        iii = +this.value;
        img[this.value].style.zIndex = "2";
        button[this.value].style.opacity = "1";
      };
      arrows[0].onclick = function () {
        img[iii].style.zIndex = "0";
        button[iii].style.opacity = "0.5";
        iii--;
        iii = ((iii < 0) ? img.length - 1 : iii);
        img[iii].style.zIndex = "2";
        button[iii].style.opacity = "1";
      };
      arrows[1].onclick = function () {
        img[iii].style.zIndex = "0";
        button[iii].style.opacity = "0.5";
        iii++;
        iii = ((iii === img.length) ? 0 : iii);
        img[iii].style.zIndex = "2";
        button[iii].style.opacity = "1";
      }
    }
  }

  /* eslint-enable */
}

export {PromoSlider};