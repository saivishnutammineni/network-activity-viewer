import { RequestDetails } from './model';
let requests: RequestDetails[] = [];

export function saveRequest(request: RequestDetails) {
  if (requests.length === 50) {
    requests = [];
  }
  requests.push(request);
}

export function clearLogs() {
  requests = [];
}

export function getLogs() {
  return requests;
}
