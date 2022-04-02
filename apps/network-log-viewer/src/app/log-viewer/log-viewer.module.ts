import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { NetworkLogDetailsComponent } from './components/network-log-details/network-log-details.component';
import { NetworkLogHeadersComponent } from './components/network-log-headers/network-log-headers.component';
import { NetworkLogPayloadComponent } from './components/network-log-payload/network-log-payload.component';
import { NetworkLogResponseComponent } from './components/network-log-response/network-log-response.component';
import { NetworkLogComponent } from './components/network-log/network-log.component';
import { NetworkLogsListComponent } from './components/network-logs-list/network-logs-list.component';
import { NetworkLogsComponent } from './components/network-logs/network-logs.component';

@NgModule({
  declarations: [
    NetworkLogsComponent,
    NetworkLogsListComponent,
    NetworkLogComponent,
    NetworkLogDetailsComponent,
    NetworkLogHeadersComponent,
    NetworkLogPayloadComponent,
    NetworkLogResponseComponent,
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatCardModule,
    NgxJsonViewerModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule,
  ],
  exports: [NetworkLogsComponent],
})
export class LogViewerModule {}
