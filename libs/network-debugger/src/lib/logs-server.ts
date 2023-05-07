/* eslint-disable @typescript-eslint/no-explicit-any */
import * as http from 'http';
import { clearLogs, getLogs } from './requests.store';

export function initNetworkRequestsServer(port = 6262) {
  const server = http.createServer(logsRequestHandler);
  server.listen(port, 'localhost');
}

function logsRequestHandler(
  req: http.IncomingMessage,
  res: http.ServerResponse
) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    const headers: any = {};
    headers['Access-Control-Allow-Origin'] = '*';
    headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS';
    headers['Access-Control-Allow-Credentials'] = false;
    headers['Access-Control-Max-Age'] = '86400'; // 24 hours
    headers['Access-Control-Allow-Headers'] =
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept';
    res.writeHead(200, headers);
    res.end();

    return;
  }

  if (req.url === '/network-log' && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(getLogs()));
  } else if (req.url === '/network-log' && req.method === 'DELETE') {
    clearLogs();
    res.writeHead(200, {
      'Content-Type': 'text/plain',
    });
    res.end('Logs cleared');
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/plain',
    });
    res.end('API not available');
  }
}
