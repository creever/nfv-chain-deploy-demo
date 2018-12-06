import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeploymentChainComponent } from './deployment-chain.component';

describe('DeploymentChainComponent', () => {
  let component: DeploymentChainComponent;
  let fixture: ComponentFixture<DeploymentChainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeploymentChainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeploymentChainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
