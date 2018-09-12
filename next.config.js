module.exports = {
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty"
    };

    return config;
  }
};
const withFonts = require('next-fonts')
const withSass = require('@zeit/next-sass')
module.exports =  withFonts(withSass())
