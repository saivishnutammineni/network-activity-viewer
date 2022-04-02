import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkLogPayloadComponent } from './network-log-payload.component';

describe('NetworkLogPayloadComponent', () => {
  let component: NetworkLogPayloadComponent;
  let fixture: ComponentFixture<NetworkLogPayloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkLogPayloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkLogPayloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
