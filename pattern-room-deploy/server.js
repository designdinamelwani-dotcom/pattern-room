const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, 'public');
const USER = process.env.BASIC_USER || '';
const PASS = process.env.BASIC_PASS || '';
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' };

http.createServer((req, res) => {
  if (USER && PASS) {
    const want = 'Basic ' + Buffer.from(USER + ':' + PASS).toString('base64');
    if (req.headers.authorization !== want) {
      res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="Pattern Room"' });
      return res.end('Login required');
    }
  }
  let p = decodeURIComponent((req.url || '/').split('?')[0]);
  if (p === '/' || !path.extname(p)) p = '/index.html';
  const file = path.normalize(path.join(ROOT, p));
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, {
      'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'same-origin',
      'X-Frame-Options': 'SAMEORIGIN',
      'Cache-Control': 'no-cache'
    });
    res.end(data);
  });
}).listen(PORT, () => console.log('Pattern Room on port ' + PORT));
