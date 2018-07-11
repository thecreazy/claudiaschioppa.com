require("es6-promise").polyfill();
require("isomorphic-fetch");

import { ParallaxProvider } from "react-scroll-parallax";

import Head from "../components/head";
import Serie from "../components/serie";
import Sketch from "../components/sketch";

import strings from "../locales/en.json";

const Index = ({ series }) => (
  <div>
    <Head title="Home" />
    <Sketch />
    <div className="hero">
      <h1 className="title">{strings.title}</h1>
      <h2 className="description">{strings.description}</h2>
      <p>{strings.contact} </p>
      <a className="contact" href={strings.cta}>
        {strings.ctalabel}
      </a>
    </div>
    <ParallaxProvider>
      { series.map(serie => <Serie {...serie} />)}
    </ParallaxProvider>

    <style jsx>{`
      .hero {
        max-width: 44.125rem;
        padding: 0 1.875rem;
        margin-left: auto;
        margin-right: auto;
      }
      .hero .title {
        font-weight: 800;
        letter-spacing: 0.25rem;
        font-size: 6.25rem;
        color: #ce4841;
      }
      .title,
      .description {
        text-align: left;
        pointer-events: none;
      }
      .hero .description {
        font-weight: 600;
        line-height: 1.6;
        font-size: 1.125rem;
        margin-bottom: 1.75rem;
      }
      .hero .contact {
        font-size: 1.125rem;
        display: table;
        margin-top: 1.875rem;
        padding: 0.75rem 4.375rem;
        transition: all 0.225s ease;
        text-decoration: none;
        color: #fff;
        border: 0.125rem solid #000;
        background-color: #000;
      }
      .hero .contact:hover {
        color: #000;
        background-color: #fff;
      }
    `}</style>
    <style jsx global>
      {`
        body {
          border: 25px solid #000000;
          border-top: 0px;
          border-width: 0 25px;
          border-image: url(https://res.cloudinary.com/dgv71mms7/image/upload/v1530825657/border.png)
            30 round;
          padding: 20px;
          margin: 0px;
          min-height: 99vh;
          font-family: -apple-system, system-ui, BlinkMacSystemFont, Segoe UI,
            Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, sans-serif;
        }
      `}
    </style>
  </div>
);

Index.getInitialProps = async ({ req }) => {
  const res = await fetch("https://cms.claudiaschioppa.com/api/series/");
  const json = await res.json();
  return { series: json };
};

export default Index;
