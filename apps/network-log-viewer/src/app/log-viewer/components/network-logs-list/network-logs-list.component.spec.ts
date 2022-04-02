import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkLogsListComponent } from './network-logs-list.component';

describe('NetworkLogsListComponent', () => {
  let component: NetworkLogsListComponent;
  let fixture: ComponentFixture<NetworkLogsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkLogsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkLogsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
