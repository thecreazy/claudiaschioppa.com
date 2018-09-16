import React, { Component } from "react";
import Swiper from 'react-id-swiper';


import Head from '../components/head';
import Transition from "../components/transition";
import Navbar from '../components/navbar'

export default class Serie extends Component {
  static async getInitialProps({ query }) {
    const res = await fetch(`https://cms.claudiaschioppa.com/api/series/${query.slug}`);
    const json = await res.json();
    return { query, serie : json };
  }
  constructor(props) {
    super(props);
    this.state = {
      transition: "open"
    };
  }
  componentDidMount() {
    setTimeout(() => this.setState({ transition: "open close" }), 500);
    window.scrollTo(0, 0)
  }
  formatUrl = url => {
    const arrayUrl = url.split("/")
    arrayUrl.splice(6,0,"w_1920,c_scale")
    return arrayUrl.join('/')
  }
  render() {
    const { transition } = this.state;
    const { query, serie } = this.props;
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
    

    return (
      <div className="singleserie">
      <Navbar />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.3.5/css/swiper.css" />
        <Head title={`Serie - ${serie.name}`} />
        <div className="singleserie_info">
          <Transition status={transition} color={`${serie.color}`} />
          <h1 style={{
                color: `${serie.color}`
              }}>{serie.name}</h1>
          <div id="description" dangerouslySetInnerHTML={{__html: serie.description}} />
        </div>
        <div className="carousel">
          <Swiper {...params} ref={node => this.swiper = node ? node.swiper : null } >
              {serie.images.map((ig, i) => <div>
                <img key={i} title={ig.name} src={this.formatUrl(ig.image.secure_url)} /> 
              </div>)}
          </Swiper>
        </div>
      </div>
    );
  }
}
