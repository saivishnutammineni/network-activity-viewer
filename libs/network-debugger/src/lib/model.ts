/* eslint-disable @typescript-eslint/no-explicit-any */
export class RequestDetails {
  id: string;
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

  constructor() {
    this.id = Date.now() + '' + Math.ceil(Math.random() * 1000);
  }
}
