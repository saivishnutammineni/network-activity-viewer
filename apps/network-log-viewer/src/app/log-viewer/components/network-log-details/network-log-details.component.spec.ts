import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkLogDetailsComponent } from './network-log-details.component';

describe('NetworkLogDetailsComponent', () => {
  let component: NetworkLogDetailsComponent;
  let fixture: ComponentFixture<NetworkLogDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkLogDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkLogDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
