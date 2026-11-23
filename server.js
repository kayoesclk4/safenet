const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

let PORT = parseInt(process.env.PORT || '3000', 10);
const ROOT = path.resolve(__dirname);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]).replace(/^[\/\\]+/, '');
  if (reqPath === '') {
    reqPath = 'index.html';
  }

  const filePath = path.resolve(ROOT, reqPath);

  // Evita directory traversal (case-insensitive para compatibilidade com Windows)
  if (!filePath.toLowerCase().startsWith(ROOT.toLowerCase())) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 Proibido');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Arquivo não encontrado');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    PORT += 1;
    console.log(`Porta anterior ocupada. Tentando porta ${PORT}...`);
    startServer(PORT);
  } else {
    console.error('Erro no servidor:', err);
  }
});

function startServer(port) {
  server.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log(`\n===========================================`);
    console.log(` 🛡️  SafeNet Kids - Servidor Local Iniciado!`);
    console.log(` 🌐 Acesse: ${url}`);
    console.log(` Pressione Ctrl + C para encerrar o servidor`);
    console.log(`===========================================\n`);

    if (process.env.NO_OPEN !== 'true' && process.platform === 'win32') {
      exec(`start ${url}`);
    }
  });
}

startServer(PORT);
