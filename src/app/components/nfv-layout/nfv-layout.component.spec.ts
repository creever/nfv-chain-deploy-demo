import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NfvLayoutComponent } from './nfv-layout.component';
import {Component} from "@angular/core";

@Component({selector: 'app-bipartite-graph', template: ''})
class BipartiteGraphStubComponent { }

@Component({selector: 'app-deployment-chain', template: ''})
class DeploymentChainStubComponent { }

describe('NfvLayoutComponent', () => {
  let component: NfvLayoutComponent;
  let fixture: ComponentFixture<NfvLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NfvLayoutComponent,
        BipartiteGraphStubComponent,
        DeploymentChainStubComponent
      ]
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
