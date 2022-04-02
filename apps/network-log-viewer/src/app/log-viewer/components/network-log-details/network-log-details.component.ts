import { Component, Input } from '@angular/core';
import { RequestDetails } from '../../../models/network-logs';

@Component({
  selector: 'network-activity-viewer-network-log-details',
  templateUrl: './network-log-details.component.html',
  styleUrls: ['./network-log-details.component.scss'],
})
export class NetworkLogDetailsComponent {
  @Input() request: RequestDetails;
}
