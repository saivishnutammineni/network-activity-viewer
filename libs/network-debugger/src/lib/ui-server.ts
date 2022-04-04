import * as path from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const SPAserver = require('single-page-app-server');

export function initUiServer(port = 4500) {
  const uiFolderAbsPath = path.normalize(
    __dirname + '../../../static/network-log-viewer'
  );
  const uiFolderRelativePath = path.relative(process.cwd(), uiFolderAbsPath);

  const httpOpts = {
    port,
    timeout: 0,
    staticDir: uiFolderRelativePath,
    indexFile: 'index.html',
    acceptEncoding: 'deflate',
    headers: {
      // CORS Headers
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Max-Age': '3600',
    },
    debug: false,
  };

  const spaServer = new SPAserver(httpOpts);
  spaServer.start();
}
