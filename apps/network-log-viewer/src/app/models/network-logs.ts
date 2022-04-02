export class RequestDetails {
  url: string;
  method: string;
  cookies: string;

  requestHeaders: Record;
  requestData: unknown;
  queryParams: Record;

  responseData: unknown;
  responseStatusCode: number;
  responseHeaders: Record;

  requestStartTime: number;
  requestEndTime: number;
}

export class Record {
  [key: string]: string;
}
