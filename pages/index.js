require("es6-promise").polyfill();
require("isomorphic-fetch");

import { ParallaxProvider } from "react-scroll-parallax";

import Head from "../components/head";
import Serie from "../components/serie";

import strings from "../locales/en.json";

import '../style/index.scss'

const Index = ({ series }) => (
  <div>
    <Head title="Claudia Schioppa - Home" />
    <div className="hero">
      <h1 className="title">{strings.title}</h1>
      <h2 className="description">{strings.description}</h2>
      <h3 className="description">I’m graduated in Painting to <a href="http://www.accademiabelleartiroma.it/intro.aspx" target="_blank">Academy of Fine Arts in Rome</a> and I recently attended the the <a href="https://www.idea-academy.it/illustration-360" target="_blank">Illustration 360’s Master class to Idea Academy</a>. For any question, proposal or simply to know us, please, mail me at: claudiaschioppa@gmail.com</h3>
      <p>You are Welcome! {strings.contact} </p>
      <div className="social">
        <a href="https://www.facebook.com/Claudia-Schioppa-Drawings-1541198826159073/" target="_blank"><i className="icon-facebook"/></a>
        <a href="https://www.instagram.com/claudiaschioppa/?hl=it" target="_blank"><i className="icon-instagram"/></a>
        {/* <a href="" target="_blank"><i className="icon-dribbble"/></a> */}
      </div>
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
