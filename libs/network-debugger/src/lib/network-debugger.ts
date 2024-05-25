/* eslint-disable @typescript-eslint/no-explicit-any */
import * as http from 'http';
import * as https from 'https';
import { initNetworkRequestsServer } from './logs-server';
import { RequestDetails } from './model';
import { saveRequest } from './requests.store';
import { initUiServer } from './ui-server';

export function initNetworkLogging() {
  const agents = [http, https];

  // proxy the native fetch of node
  proxyFetchRequest();

  agents.forEach((agent) => {
    const actualRequestHandlerFn = agent.request;
    (agent as any).request = requestProxyFactory(
      actualRequestHandlerFn,
      agent === https
    );
  });

  initNetworkRequestsServer();
  initUiServer();
}

function requestProxyFactory(actualRequestHandler: any, isHttps: boolean) {
  return (options: string | https.RequestOptions | URL, cb: any) => {
    const requestDetails = new RequestDetails();
    requestDetails.requestStartTime = new Date().getTime();

    if (typeof options === 'string') {
      requestDetails.url = options;
      requestDetails.method = 'GET';
    } else if (options instanceof URL) {
      requestDetails.url = options.toString();
      requestDetails.method = 'GET';
    } else if (options) {
      const connectionType = isHttps ? 'https' : 'http';
      requestDetails.url = `${connectionType}://${
        options.hostname || options.host
      }${options.path}`;
      requestDetails.method = options.method;
      requestDetails.requestHeaders = options.headers;
    }

    const proxyCallback = proxyCallbackFactory(cb, requestDetails);
    const request: http.ClientRequest = actualRequestHandler(
      options,
      proxyCallback
    );
    return proxyClientRequestFactory(request, requestDetails);
  };
}

function proxyCallbackFactory(
  actualCallBack: any,
  requestDetails: RequestDetails
) {
  return (response: http.IncomingMessage) => {
    requestDetails.responseHeaders = response.headers;

    if (typeof actualCallBack === 'function') {
      actualCallBack(response);
    }

    handleResponse(response, requestDetails);
  };
}

function handleResponse(
  response: http.IncomingMessage,
  requestDetails: RequestDetails
) {
  const responseBuffer: Buffer[] = [];

  requestDetails.responseStatusCode = response.statusCode;

  response.on('data', (chunk: any) => {
    responseBuffer.push(chunk);
  });

  response.on('aborted', () => {
    requestDetails.responseStatusCode = 0;
    requestDetails.requestEndTime = new Date().getTime();
    registerRequest(requestDetails);
  });

  response.on('error', () => {
    requestDetails.responseStatusCode = 0;
    requestDetails.requestEndTime = new Date().getTime();
    registerRequest(requestDetails);
  });

  response.on('end', function handleStreamEnd() {
    try {
      let responseData: Buffer | string =
        responseBuffer.length === 1
          ? responseBuffer[0]
          : Buffer.concat(responseBuffer);
      responseData = responseData.toString();
      requestDetails.responseData = parseData(
        responseData,
        requestDetails?.responseHeaders
      );
      requestDetails.requestEndTime = new Date().getTime();
      registerRequest(requestDetails);
    } catch (err) {
      requestDetails.responseStatusCode = 0;
      requestDetails.requestEndTime = new Date().getTime();
    }
  });
}

function proxyClientRequestFactory(
  actualRequest: http.ClientRequest,
  requestDetails: RequestDetails
) {
  const actualFn = actualRequest.write;
  actualRequest.write = (data: any) => {
    try {
      requestDetails.requestData = JSON.parse(data.toString());
    } catch (err) {
      requestDetails.requestData = data;
    }

    return actualFn.bind(actualRequest)(data);
  };

  actualRequest.on('error', () => {
    requestDetails.responseStatusCode = 0;
    requestDetails.requestEndTime = new Date().getTime();
    registerRequest(requestDetails);
  });

  return actualRequest;
}

function parseData(data: string, headers: any) {
  const contentType: string =
    headers?.['content-type'] || headers?.['Content-Type'];
  if (contentType?.includes('application/json')) {
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  }
  return data;
}

function proxyFetchRequest() {
  if (!fetch) {
    return;
  }
  const actualFetch = fetch;
  global['fetch'] = fetchProxyFactory(actualFetch);
}

function fetchProxyFactory(actualFetch: typeof fetch) {
  return function (request: string | URL | Request, options?: RequestInit) {
    const requestDetails = new RequestDetails();
    requestDetails.requestStartTime = new Date().getTime();

    if (typeof request === 'string') {
      requestDetails.url = request;
    } else if (request instanceof URL) {
      requestDetails.url = request.toString();
    }

    requestDetails.method = options?.method ?? 'GET';
    requestDetails.requestHeaders = options?.headers;
    requestDetails.requestData =
      typeof options?.body === 'string'
        ? parseData(options?.body, requestDetails?.requestHeaders)
        : options?.body;

    return actualFetch(request as string | Request, options)
      .then(fetchResponseHandlerFactory(requestDetails))
      .catch(fetchErrorHandlerFactory(requestDetails));
  };
}

function fetchResponseHandlerFactory(requestDetails: RequestDetails) {
  return (response: Response) => {
    const clonedResponse = response.clone();
    requestDetails.requestEndTime = new Date().getTime();
    requestDetails.responseHeaders = getParsedHeaders(response.headers);
    requestDetails.responseStatusCode = response.status || 0;

    clonedResponse
      .text()
      .then((responseText) => {
        requestDetails.responseData = parseData(
          responseText,
          requestDetails?.responseHeaders
        );
        registerRequest(requestDetails);
      })
      .catch(() => {
        registerRequest(requestDetails);
      });

    return response;
  };
}

function fetchErrorHandlerFactory(requestDetails: RequestDetails) {
  return (err: any) => {
    requestDetails.requestEndTime = new Date().getTime();
    requestDetails.responseStatusCode = 0;
    registerRequest(requestDetails);
    throw err;
  };
}

function getParsedHeaders(headers: any) {
  const parsedHeaders: any = {};
  for (const pair of headers) {
    parsedHeaders[pair[0]] = pair[1];
  }

  return parsedHeaders;
}

function registerRequest(request: RequestDetails) {
  saveRequest(request);
}
