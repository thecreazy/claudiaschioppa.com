import React, { Component } from "react";
import { Parallax } from "react-scroll-parallax";

import { string } from "prop-types";
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
          <style jsx>
            {`
              .serie{
                  min-height: 120px;
                  margin: 0px;
                  margin-top: 20px;
                  padding: 0 15px;
                  display:flex;
                  flex-direction: column;
                  cursor: pointer;
                  position: relative;
              }
              .serie .serie__name{
                  margin: 0px
                  margin-top: 20px;
                  font-size: 1.5rem;
                  font-weight: bold;
                  margin-bottom: 0.5em;
                  text-align: center;
                  font-size: 5rem;
                  margin-bottom: 1.25rem;
                  text-transform: capitalize;
              }
              .serie .serie__images{
                  width: 100%;
                  display: flex;
                  justify-content: space-evenly;
                  flex-flow: row wrap;
                  padding-top: 10px;
                  height: 100%;
                  flex-direction: row-reverse;
                  align-items: center;
              }
              .serie .serie__primary, .serie .serie__secondary{
                  display: flex;
                  height: 100%;
                  justify-content: center;
                  width:100%;
                  max-width: 400px;
              }
              .serie .serie__primary{
                  justify-content: left;
              }
              .serie .serie__secondary{
                  flex-direction: column;
                  justify-content: right;
              }
              .serie .serie__secondary > div{
                  display: flex;
                  align-items: right;
                  margin-bottom: 10px;
              }
              .animate{
                  position: relative;
              }
              .animate:after{
                  position: absolute;
                  content: "";
                  left: 0;
                  top: 0;
                  width: 100%;
                  height: 100%;
                  background: attr(data-background)
              }
              .serie .serie__image {
                  margin: 5px;
                  height: auto;
                  transition: filter 1s;
                  width: 100%;
              }
              .serie .serie__image:hover{
                  filter: grayscale(100%)
              }
              .serie .serie__image.--left{
                  margin-left: auto;
              }
              }
            `}
          </style>
        </section>
      </div>
    );
  }
}

Serie.propTypes = {
  color: string,
  images: string,
  title: string,
  slug: string
};

export default Serie;
