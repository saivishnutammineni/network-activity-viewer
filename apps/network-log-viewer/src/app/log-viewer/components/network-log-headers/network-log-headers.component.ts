import { Component, Input } from '@angular/core';
import { RequestDetails } from '../../../models/network-logs';

@Component({
  selector: 'network-activity-viewer-network-log-headers',
  templateUrl: './network-log-headers.component.html',
  styleUrls: ['./network-log-headers.component.scss'],
})
export class NetworkLogHeadersComponent {
  @Input() networkLog: RequestDetails;
}
