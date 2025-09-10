const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Replace with your VM's public IP or domain
//const target = 'http://4.225.200.37/';
const target = process.env.TARGET;
const authURL = process.env.AUTH_URL;

app.use((req, res, next) => {
  const isAuthenticated = !!req.headers.authorization;
  console.log(`Requested URL: ${req.originalUrl}`);
  console.log(`Authenticated: ${isAuthenticated}`);

  if (req.originalUrl.includes('abc') && !isAuthenticated) {
    const redirectUrl = req.originalUrl.replace('abc', '');
    return res.redirect(authURL + "?post_login_redirect_url=" + redirectUrl);
  }

  next();
});

app.use('/', createProxyMiddleware({ target, changeOrigin: true }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
