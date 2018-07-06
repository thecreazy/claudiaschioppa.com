import { ParallaxProvider } from 'react-scroll-parallax';

import Head from '../components/head'
import Serie from '../components/serie'
import Sketch from '../components/sketch'

export default () => (
  <div>
    <Head title="Home" />
    <Sketch />
    <div className="hero">
      <h1 className="title">Hi, I’m Claudia</h1>
      <h2 className="description">
      I’m a 27-year-old Argentinian-Italian web designer and frontend developer living in Buenos Aires and looking forward to moving to Europe or USA. I’m a really curious person, and in spite of having a university degree, I consider myself a self-taught person constantly learning and always looking for new things to improve.

Besides my passion for design and coding, I love and spend a lot of time travelling and taking photos. Feel free to visit my Unsplash page.

My main focus nowadays is emotional design, web animation, and accessibility.
      </h2>
      <p>And don’t forget to stalk me on:</p>
      <a className="contact" href="mailto:juan.dinella@gmail.com">Contact me</a>
    </div>
    <ParallaxProvider>
      <Serie color="#ce4841" title="ciao" slug="ciao" />
      <Serie color="#9e2412" title="ciao" slug="ciao2" />
      <Serie color="#412234" title="ciao" slug="ciao2" />
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
        letter-spacing: .25rem;
        font-size: 6.25rem;
        color: #ce4841;
      }
      .title, .description {
        text-align: left;
        pointer-events: none;
      }
      .hero .description {
        font-weight: 600;
        line-height: 1.6;
        font-size: 1.125rem;
        margin-bottom: 1.75rem;
      }
      .hero .contact{
        font-size: 1.125rem;
        display: table;
        margin-top: 1.875rem;
        padding: .75rem 4.375rem;
        transition: all .225s ease;
        text-decoration: none;
        color: #fff;
        border: .125rem solid #000;
        background-color: #000;
      }
      .hero .contact:hover{
        color: #000;

background-color: #fff;


      }
    `}</style>
    <style jsx global>
    {`
    body{
      border: 25px solid #000000;
      border-top: 0px;
      border-width: 0 25px;
      border-image: url(https://res.cloudinary.com/dgv71mms7/image/upload/v1530825657/border.png) 30 round;
      padding: 20px;
      margin: 0px;
      min-height: 99vh;
      font-family: -apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, sans-serif;
    }
    `}
    </style>
  </div>
)
