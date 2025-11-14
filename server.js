const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const base = process.cwd();

const mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.jsx': 'application/javascript',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function sendFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 - Internal Server Error');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  try {
    const safePath = req.url.split('?')[0].replace(/\/+$/, '') || '/';
    let filePath = path.join(base, safePath);

    // if requested path is the workspace root or a directory, serve index.html
    if (safePath === '/') {
      filePath = path.join(base, 'index.html');
    } else {
      // if path doesn't exist, treat as 404
      if (!fs.existsSync(filePath)) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Not Found');
        return;
      }

      // if it's a directory, serve index.html
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        filePath = path.join(filePath, 'index.html');
        if (!fs.existsSync(filePath)) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 - Not Found');
          return;
        }
      }
    }

    sendFile(res, filePath);
  } catch (err) {
    console.error('Server error:', err && err.stack ? err.stack : err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('500 - Internal Server Error');
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

server.on('error', (err) => {
  console.error('Server failed to start:', err && err.stack ? err.stack : err);
  process.exit(1);
});
