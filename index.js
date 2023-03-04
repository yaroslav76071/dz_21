const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;
  if (filePath == './') {
    filePath = './pages/index.html';
  }
  if (filePath == './about') {
    filePath = './pages/about.html';
  }
  if (filePath == './contacts') {
    filePath = './pages/contacts.html';
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  let contentType = 'text/html';
  switch (extname) {
    case '.html':
      contentType = 'text/html';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.css':
      contentType = 'text/css';
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`<h1>404 Page Not Found</h1><p>The requested URL ${req.url} was not found on this server.</p>`);
      } else {
        res.writeHead(500);
        res.end(`Internal Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
  if (filePath == './old-page') {
    res.writeHead(301, { 'Location': '/new-page' });
    res.end();
    return;
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});