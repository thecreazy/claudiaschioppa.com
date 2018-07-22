import React, { Component } from "react";
import { Parallax } from "react-scroll-parallax";

import { string, array } from "prop-types";
import Router from "next/router";

import Transition from "./transition";

const BASE_SLUG = "/serie/";

class Serie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transition: ""
    };
  }
  onClick = e => {
    e.preventDefault();
    this.setState(
      {
        transition: "open"
      },
      () => {
        const { slug, color } = this.props;
        setTimeout(
          () => Router.push(`${BASE_SLUG}${slug}?color=${color.slice(1, 7)}`),
          300
        );
      }
    );
  };
  componentDidMount() {
    Router.prefetch(`${BASE_SLUG}${this.props.slug}`);
  }
  formatUrl = url => {
    const arrayUrl = url.split("/")
    arrayUrl.splice(6,0,"w_400,c_scale")
    return arrayUrl.join('/')
  }
  render() {
    const { color, name, images } = this.props;
    const [firstImmage, secondImmage, thirdImmage] = images;
    const { transition } = this.state;
    return (
      <div onClick={this.onClick}>
        <section className="serie">
          <Transition color={color} status={transition} />
          <h3
            className="serie__name"
            style={{
              color: `${color}`
            }}
          >
            {name}
          </h3>
          <div className="serie__images">
            <Parallax offsetYMax={35} offsetYMin={-35}>
              <div className="serie__primary">
                <img
                  className="serie__image"
                  src={this.formatUrl(firstImmage.image.secure_url)}
                  alt={firstImmage.name}
                />
              </div>
            </Parallax>
            <Parallax offsetYMax={55} offsetYMin={-55}>
              <div className="serie__secondary">
                <div className="animate serie__image" data-background={color}>
                  <img
                    className="serie__image --left"
                    src={this.formatUrl(secondImmage.image.secure_url)}
                    alt={firstImmage.name}
                  />
                </div>
                <div className="animate serie__image" data-background={color}>
                  <img
                    className="serie__image --left"
                    src={this.formatUrl(thirdImmage.image.secure_url)}
                    alt={firstImmage.name}
                  />
                </div>
              </div>
            </Parallax>
          </div>
        </section>
      </div>
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
