import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BipartiteGraphComponent } from './bipartite-graph.component';

describe('BipartiteGraphComponent', () => {
  let component: BipartiteGraphComponent;
  let fixture: ComponentFixture<BipartiteGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BipartiteGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BipartiteGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
