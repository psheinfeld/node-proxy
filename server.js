const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Replace with your VM's public IP or domain
const target = 'http://4.225.200.37/';

app.use('/', createProxyMiddleware({ target, changeOrigin: true }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
