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
     * When the request url has only host name Ex: https://abcd.com
     * Then path name is a simple '\'. Chrome devtools shows hostname in this case.
     * Following same approach
     */
    return (url.pathname.length === 1 ? url.host : url.pathname) + url.search;
  }
}
