import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RequestDetails } from '../../../models/network-logs';

@Component({
  selector: 'network-activity-viewer-network-log',
  templateUrl: './network-log.component.html',
  styleUrls: ['./network-log.component.scss'],
})
export class NetworkLogComponent implements OnInit {
  @Input() networkLog: RequestDetails;

  @Output() selection = new EventEmitter<void>();

  public isErrorResponse: boolean;
  public apiPath: string;

  ngOnInit(): void {
    this.apiPath = this.getApiPath();
    const responseStatusCode = this.networkLog.responseStatusCode;
    this.isErrorResponse =
      responseStatusCode === 0 || responseStatusCode >= 300;
  }

  public selectRequest() {
    this.selection.emit();
  }

  private getApiPath() {
    const url = new URL(this.networkLog.url);

    /**
     * Chrome devtools logic (Involves hostname, pathname, queryparams)
     * 1. If No pathname is present:
     *  1. If no query string, show hostname
     *  2. If a query string is present, show only query string
     * 2. If path name is present, show it along with query params if any
     */
    if (url.pathname.length === 1) {
      // no pathname
      return url.search ? url.search : url.host;
    }
    return url.pathname.substring(url.pathname.lastIndexOf('/')) + url.search;
  }
}
