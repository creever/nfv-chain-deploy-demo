import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BipariteGraphComponent } from './biparite-graph.component';

describe('BipariteGraphComponent', () => {
  let component: BipariteGraphComponent;
  let fixture: ComponentFixture<BipariteGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BipariteGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BipariteGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
