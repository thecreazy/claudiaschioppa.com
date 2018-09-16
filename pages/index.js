require("es6-promise").polyfill();
require("isomorphic-fetch");

import Link from 'next/link'

import Head from "../components/head";
import Images from "../components/images";
import Navbar from "../components/navbar"

import strings from "../locales/en.json";

import '../style/index.scss'

const Index = ({ series }) => {
  const images = series.reduce((total, element)=>{
    element.images.forEach(img => {
      img.info = {
        color: element.color,
        slug: element.slug,
        name: element.name
      }
    })
    return [...total, ...element.images]
  }, [])
  return (
  <div className="container">
    <Head title="Claudia Schioppa - Home" description={strings.description} />
    <Navbar series={series} />
    <div className="hero">
      <h1 className="title">{strings.title}</h1>
      <h2 className="description">{strings.description}</h2>
      <h3 className="description">I’m graduated in Painting to 
        <Link href="http://www.accademiabelleartiroma.it/intro.aspx" >
          <a target="_blank" rel="noopener"> Academy of Fine Arts in Rome</a>
        </Link> and I recently attended the the 
       <Link href="https://www.idea-academy.it/illustration-360">
        <a target="_blank" rel="noopener"> Illustration 360’s Master class to Idea Academy</a>
      </Link>. 
      For any question, proposal or simply to know us, please, mail me at: claudiaschioppa@gmail.com</h3>
      <p>You are Welcome! {strings.contact} </p>
      <div className="social">
        <Link  href="https://www.facebook.com/Claudia-Schioppa-Drawings-1541198826159073/">
        <a target="_blank" rel="noopener"><i className="icon-facebook"/></a>
        </Link>
        <Link href="https://www.instagram.com/claudiaschioppa" >
        <a target="_blank" rel="noopener"><i className="icon-instagram"/></a>
        </Link>
       
      </div>
      <a className="contact" href={strings.cta}>
        {strings.ctalabel}
      </a>
    </div>
    <div className="images">
      <Images images={images} />
    </div>
  </div>
)
};

Index.getInitialProps = async ({ req }) => {
  const res = await fetch("https://cms.claudiaschioppa.com/api/series/");
  const json = await res.json();
  return { series: json };
};

export default Index;
