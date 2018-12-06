import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NfvLayoutComponent } from './nfv-layout.component';

describe('NfvLayoutComponent', () => {
  let component: NfvLayoutComponent;
  let fixture: ComponentFixture<NfvLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NfvLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NfvLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
