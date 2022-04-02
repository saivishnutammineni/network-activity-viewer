import { Component, Input } from '@angular/core';
import { RequestDetails } from '../../../models/network-logs';

@Component({
  selector: 'network-activity-viewer-network-log-response',
  templateUrl: './network-log-response.component.html',
  styleUrls: ['./network-log-response.component.scss'],
})
export class NetworkLogResponseComponent {
  @Input() networkLog: RequestDetails;
}
