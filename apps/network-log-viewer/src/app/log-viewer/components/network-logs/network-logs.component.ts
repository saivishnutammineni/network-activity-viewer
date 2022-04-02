import { Component, OnInit } from '@angular/core';
import { RequestDetails } from '../../../models/network-logs';
import { NetworkLogsService } from '../../../services/network-logs.service';

@Component({
  selector: 'network-activity-viewer-network-logs',
  templateUrl: './network-logs.component.html',
  styleUrls: ['./network-logs.component.scss'],
})
export class NetworkLogsComponent implements OnInit {
  public networkRequests: RequestDetails[];
  public selectedRequest: RequestDetails;

  constructor(private networkLogsSvc: NetworkLogsService) {}

  ngOnInit() {
    this.refreshLogs();
  }

  public viewRequestDetails(request: RequestDetails) {
    this.selectedRequest = request;
  }

  public refreshLogs() {
    this.networkLogsSvc.getNetworkLogs().subscribe((requests) => {
      this.networkRequests = requests;
      this.selectedRequest = null;
    });
  }

  public clearLogs() {
    this.networkLogsSvc.clearLogs().subscribe();
    this.networkRequests = [];
    this.selectedRequest = null;
  }
}
