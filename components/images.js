import React, { Component } from "react";
import { string, array } from "prop-types";
import Link from 'next/link'
import Router from 'next/router'


import Transition from "./transition";

const BASE_SLUG = "/serie/";

class Serie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transition: ""
    };
  }
  formatUrl = url => {
    const arrayUrl = url.split("/")
    arrayUrl.splice(6,0,"w_400,c_scale")
    return arrayUrl.join('/')
  }
  onClick = e =>{
    if(e) e.preventDefault()
    if(e) e.stopPropagation()
    const {currentTarget} = e
    const slug = currentTarget.getAttribute('data-slug')
    const color = currentTarget.getAttribute('data-color')
    this.setState({
      transition: 'open',
      color
    }, () =>{
        setTimeout(
          () => Router.push(`${BASE_SLUG}${slug}`),
          300
        );
    })
  }
  render() {
    const { images = [], inner } = this.props;
    const { transition, color } = this.state;
    return (
        <section className="serie">
        <Transition status={transition} color={color} inner={inner} />
          {images.map((image,k) => <div 
          data-slug={image.info.slug}
          data-color={image.info.color}
          key={`image-${k}`}
          onClick={this.onClick}
          className="serie__image">
          <Link prefetch href={`${BASE_SLUG}${image.info.slug}`}>
            <a className="__noevent">
              <img
                src={this.formatUrl(image.image.secure_url)}
                alt={image.name}
              />
            </a>
          </Link>
          <div className="serie__info">
            <h3>{image.info.name}</h3>
          </div>
          </div>)}
        </section>
    );
  }
}

Serie.propTypes = {
  color: string,
  images: array,
  title: string,
  slug: string
};

export default Serie;
