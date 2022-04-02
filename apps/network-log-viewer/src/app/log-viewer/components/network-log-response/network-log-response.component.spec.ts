import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkLogResponseComponent } from './network-log-response.component';

describe('NetworkLogResponseComponent', () => {
  let component: NetworkLogResponseComponent;
  let fixture: ComponentFixture<NetworkLogResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkLogResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkLogResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
