import React, { Component } from "react";
import Swiper from 'react-id-swiper';


import Head from '../components/head';
import Transition from "../components/transition";
import Navbar from '../components/navbar'
import Images from '../components/images'

export default class Serie extends Component {
  static async getInitialProps({ query }) {
    const res = await fetch(`https://cms.claudiaschioppa.com/api/series/${query.slug}`);
    const json = await res.json();
    const resseries = await fetch("https://cms.claudiaschioppa.com/api/series/");
    const series = await resseries.json()
    return { query, serie : json, series };
  }
  constructor(props) {
    super(props);
    this.state = {
      transition: "open"
    };
  }
  componentDidMount() {
    this.setState({isLittle: window.innerWidth < 600})
    setTimeout(() => this.setState({ transition: "open close" }), 500);
    window.scrollTo(0, 0)
  }
  formatUrl = url => {
    const arrayUrl = url.split("/")
    arrayUrl.splice(6,0,"w_1920,c_scale")
    return arrayUrl.join('/')
  }

  onLeftClick = e =>{
    if(e) e.preventDefault()
    if (this.swiper) this.swiper.slidePrev()
  }

  onRightClick = e =>{
    if(e) e.preventDefault()
    console.log(this.swiper)
    if (this.swiper) this.swiper.slideNext()
  }

  render() {
    const { transition, isLittle } = this.state;
    const { serie, series } = this.props;
    const params = {
      fadeEffect: {
        crossFade: true
      },
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      effect: 'fade',
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      }
    }

    const images = series.reduce((total, element)=>{
      element.images.forEach(img => {
        img.info = {
          color: element.color,
          slug: element.slug,
          name: element.name
        }
      })
      if(element.slug !== serie.slug) return [...total, ...element.images]
      return total
    }, [])

    return (
      <div className="singleserie">
        <Navbar series={series} />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.3.5/css/swiper.css" />
        <Head title={`Serie - ${serie.name}`} description={serie.description} />
        <div className="singleserie_info">
          <Transition status={transition} color={`${serie.color}`} />
          <h1 style={{
                color: `${serie.color}`
              }}>{serie.name}</h1>
          <div id="description" dangerouslySetInnerHTML={{__html: serie.description}} />
          <div className="__button-container">
            <button className="__button"><i className="icon icon-chevron-thin-left" onClick={this.onLeftClick} /></button>
            <button className="__button"><i className="icon icon-chevron-thin-right" onClick={this.onRightClick}/></button>
          </div>
        </div>
        <div className="carousel">
          {!isLittle && <Swiper {...params} ref={node => this.swiper = node ? node.swiper : null } >
              {serie.images.map((ig, i) => <div key={i}>
                <img  title={ig.name} src={this.formatUrl(ig.image.secure_url)} /> 
              </div>)}
          </Swiper>}
          {isLittle && serie.images.map((ig, i) => <div key={i} className="swiper-container">
                <img  title={ig.name} src={this.formatUrl(ig.image.secure_url)} /> 
          </div>)}
        </div>
        <div className="singleserie_images">
          <h4>Other projects</h4>
          <Images inner images={images} />
        </div>
      </div>
      
    );
  }
}
