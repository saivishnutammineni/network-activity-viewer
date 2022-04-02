import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestDetails } from '../models/network-logs';

const API_BASE_URL = `http://localhost:6262`;
const NETWORK_LOGS_URL = `${API_BASE_URL}/network-log`;

@Injectable({
  providedIn: 'root',
})
export class NetworkLogsService {
  constructor(private http: HttpClient) {}

  public getNetworkLogs(): Observable<RequestDetails[]> {
    return this.http.get<RequestDetails[]>(NETWORK_LOGS_URL);
  }

  public clearLogs(): Observable<unknown> {
    return this.http.delete(NETWORK_LOGS_URL);
  }
}
