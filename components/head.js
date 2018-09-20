import NextHead from "next/head";
import { string } from "prop-types";

const defaultDescription = "I’m an Italian Illustrator, in love by brush bristels, books, travelling!";
const defaultOGURL = "";
const defaultOGImage = "https://claudiaschioppa.com/static/imgs/share.jpg";

const Head = props => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{props.title || ""}</title>
    <meta
      name="description"
      content={props.description || defaultDescription}
    />
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />
    <link rel="icon" sizes="192x192" href="/static/imgs/icons/icon-152x152.png" />
    <link rel="apple-touch-icon" href="/static/imgs/icons/icon-152x152.png" />
    <link rel="icon" href="/static/favicon.ico" />
    <meta property="og:url" content={props.url || defaultOGURL} />
    <meta property="og:title" content={props.title || ""} />
    <meta property="og:image" content={props.ogImage || defaultOGImage} />
    <meta
      property="og:description"
      content={props.description || defaultDescription}
    />
    <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
    <meta name="twitter:site" content={props.url || defaultOGURL} />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="manifest" href="/static/manifest.json" />
    <meta name="theme-color" content="#ce4841" />
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-122463118-1"></script>
    <script dangerouslySetInnerHTML={{__html:`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
    
          gtag('config', 'UA-122463118-1');
    `}} />
  </NextHead>
);

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
};

export default Head;
