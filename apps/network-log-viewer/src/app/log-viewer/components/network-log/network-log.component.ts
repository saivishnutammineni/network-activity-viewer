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
    this.apiPath = this.networkLog.url?.substring(
      this.networkLog.url.lastIndexOf('/')
    );
    const responseStatusCode = this.networkLog.responseStatusCode;
    this.isErrorResponse =
      responseStatusCode === 0 || responseStatusCode >= 300;
  }

  public selectRequest() {
    this.selection.emit();
  }
}
