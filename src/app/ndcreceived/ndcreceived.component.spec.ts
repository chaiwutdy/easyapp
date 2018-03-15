import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NdcreceivedComponent } from './ndcreceived.component';

describe('NdcreceivedComponent', () => {
  let component: NdcreceivedComponent;
  let fixture: ComponentFixture<NdcreceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NdcreceivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NdcreceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
