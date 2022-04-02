import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkLogHeadersComponent } from './network-log-headers.component';

describe('NetworkLogHeadersComponent', () => {
  let component: NetworkLogHeadersComponent;
  let fixture: ComponentFixture<NetworkLogHeadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkLogHeadersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkLogHeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
