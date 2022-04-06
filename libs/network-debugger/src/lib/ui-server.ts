import * as fs from 'fs';
import * as http from 'http';
import * as path from 'path';
import * as zlib from 'zlib';

const uiDir = path.normalize(__dirname + '../../../static/network-log-viewer');

export function initUiServer(port = 4500) {
  http.createServer(requestHandler).listen(port);
}

function requestHandler(req: http.IncomingMessage, res: http.ServerResponse) {
  res.setHeader('access-control-allow-origin', '*');

  const baseUrl = 'http://' + req.headers.host + '/';
  const decodedPathname = decodeURI(new URL(req.url, baseUrl).pathname);
  const pathname = path
    .normalize(decodedPathname)
    .replace(/^(\.\.(\/|\\|$))+/, '');

  if (!isRouteRequest(pathname)) {
    return serveStaticFile(res, pathname);
  }
  return serveIndexFile(res);
}

const isRouteRequest = (pathname: string) =>
  pathname.split('/').pop().indexOf('.') === -1;

const utf8 = (file: string) => Buffer.from(file, 'binary').toString('utf8');

const serveStaticFile = (res: http.ServerResponse, pathname: string) => {
  const uri = path.join(uiDir, pathname);
  const ext = uri.replace(/^.*[./\\]/, '').toLowerCase();

  if (!fs.existsSync(uri)) {
    console.log('File Not found ' + pathname);
    return sendError(res, 404);
  }

  fs.readFile(uri, 'binary', (err, file) =>
    err ? sendError(res, 500) : sendFile(res, 200, file, ext)
  );
};

const serveIndexFile = (res: http.ServerResponse) => {
  const index = path.join(uiDir, 'index.html');
  fs.readFile(index, 'binary', (err, file) => {
    if (err) {
      return sendError(res, 500);
    }
    sendFile(res, 200, file, 'html');
  });
};

const sendFile = (
  res: http.ServerResponse,
  status: number,
  file: string,
  ext: string,
  encoding: BufferEncoding = 'binary'
) => {
  if (['js', 'css', 'html', 'json', 'xml', 'svg'].includes(ext)) {
    res.setHeader('content-encoding', 'gzip');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    file = zlib.gzipSync(utf8(file)) as any;
    encoding = 'utf8';
  }
  res.writeHead(status, {
    'content-type': mimeTypes[ext] ?? 'application/octet-stream',
  });
  res.write(file, encoding);
  res.end();
};

const sendError = (res: http.ServerResponse, status: number) => {
  res.writeHead(status);
  res.write(`${status}`);
  res.end();
};

// the mime types required by the ui bundle
const mimeTypes: {
  [key: string]: string;
} = {
  js: 'application/javascript',
  css: 'text/css',
  html: 'text/html',
  txt: 'text/plain',
  ico: 'image/x-icon',
};
