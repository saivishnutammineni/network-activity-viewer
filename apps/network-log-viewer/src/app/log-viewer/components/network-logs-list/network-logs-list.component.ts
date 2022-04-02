import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RequestDetails } from '../../../models/network-logs';

@Component({
  selector: 'network-activity-viewer-network-logs-list',
  templateUrl: './network-logs-list.component.html',
  styleUrls: ['./network-logs-list.component.scss'],
})
export class NetworkLogsListComponent {
  @Input() networkLogs: RequestDetails[];

  @Output() request: EventEmitter<RequestDetails> = new EventEmitter();

  @Output() clear = new EventEmitter<void>();

  @Output() refresh = new EventEmitter<void>();

  public selectRequest(request: RequestDetails) {
    this.request.emit(request);
  }

  public clearLogs() {
    this.clear.emit();
  }

  public refreshLogs() {
    this.refresh.emit();
  }
}
