import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkLogComponent } from './network-log.component';

describe('NetworkLogComponent', () => {
  let component: NetworkLogComponent;
  let fixture: ComponentFixture<NetworkLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
