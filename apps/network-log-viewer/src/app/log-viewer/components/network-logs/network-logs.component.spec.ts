import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkLogsComponent } from './network-logs.component';

describe('NetworkLogsComponent', () => {
  let component: NetworkLogsComponent;
  let fixture: ComponentFixture<NetworkLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkLogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
