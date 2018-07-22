require("es6-promise").polyfill();
require("isomorphic-fetch");

import { ParallaxProvider } from "react-scroll-parallax";

import Head from "../components/head";
import Serie from "../components/serie";
import Sketch from "../components/sketch";

import strings from "../locales/en.json";

import '../style/index.scss'

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
      { series.map((serie, index) => <Serie key={`serie-${index}`} {...serie} />)}
    </ParallaxProvider>
  </div>
);

Index.getInitialProps = async ({ req }) => {
  const res = await fetch("https://cms.claudiaschioppa.com/api/series/");
  const json = await res.json();
  return { series: json };
};

export default Index;
