import { Component, Input, OnChanges } from '@angular/core';
import { Record, RequestDetails } from '../../../models/network-logs';

@Component({
  selector: 'network-activity-viewer-network-log-payload',
  templateUrl: './network-log-payload.component.html',
  styleUrls: ['./network-log-payload.component.scss'],
})
export class NetworkLogPayloadComponent implements OnChanges {
  @Input() networkLog: RequestDetails;

  public queryParams: Record;

  ngOnChanges(): void {
    const url = this.networkLog.url;
    const queryString = url?.includes('?')
      ? url.substring(url.indexOf('?') + 1)
      : '';

    if (queryString) {
      this.queryParams = queryString
        .split('&')
        .reduce((queryParams, queryParamString) => {
          const queryParamDetails = queryParamString?.split('=');
          queryParams[queryParamDetails[0]] = queryParamDetails[1];
          return queryParams;
        }, {} as Record);
    } else {
      this.queryParams = undefined;
    }
  }
}
