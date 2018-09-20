const express = require("express");
const next = require("next");
const routes = require("./routes");
const path = require('path')

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const handler = routes.getRequestHandler(app);

require('es6-promise').polyfill();
require('isomorphic-fetch');

app.prepare().then(() => {
  const server = express();

  server.use('/manifest.json', (_, res) => res.sendFile('manifest.json', { root: path.join(__dirname, 'static') }));

  server.use('/sitemap.xml', (_, res) => res.sendFile('sitemap.xml', { root: path.join(__dirname, 'static') }));



  server.use(handler);

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(process.env.NODE_PORT || 3000, err => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
