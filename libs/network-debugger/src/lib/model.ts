/* eslint-disable @typescript-eslint/no-explicit-any */
export class RequestDetails {
  url: string;
  method: string;
  cookies: any;

  requestHeaders: any;
  requestData: any;

  responseData: any;
  responseStatusCode: number;
  responseHeaders: any;

  requestStartTime: number;
  requestEndTime: number;
}
