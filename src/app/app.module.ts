import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BipartiteGraphComponent } from './components/bipartite-graph/bipartite-graph.component';
import { DeploymentChainComponent } from './components/deployment-chain/deployment-chain.component';
import { VnfComponent } from './components/deployment-chain/vnf/vnf.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SafePipe} from "./pipes/safe.pipe";

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    BipartiteGraphComponent,
    DeploymentChainComponent,
    VnfComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
