/* eslint-disable @typescript-eslint/no-explicit-any */
import * as http from 'http';
import * as https from 'https';
import { URL } from 'url';
import { initNetworkRequestsServer } from './logs-server';
import { RequestDetails } from './model';
import { saveRequest } from './requests.store';

export function initNetworkLogging() {
  const agents = [http, https];

  agents.forEach((agent) => {
    const actualRequestHandlerFn = agent.request;
    (agent as any).request = requestProxyFactory(
      actualRequestHandlerFn,
      agent === https
    );
  });

  initNetworkRequestsServer();
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

    actualCallBack(response);

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
      requestDetails.responseData = parseResponseData(
        responseData,
        requestDetails
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

function parseResponseData(
  responseData: string,
  requestDetails: RequestDetails
) {
  const contentType: string = requestDetails?.responseHeaders?.['content-type'];
  if (contentType.includes('application/json')) {
    try {
      return JSON.parse(responseData);
    } catch (e) {
      return responseData;
    }
  }
  return responseData;
}

function registerRequest(request: RequestDetails) {
  saveRequest(request);
}
