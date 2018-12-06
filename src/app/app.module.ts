import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BipariteGraphComponent } from './components/biparite-graph/biparite-graph.component';
import { NfvLayoutComponent } from './components/nfv-layout/nfv-layout.component';
import { DeploymentChainComponent } from './components/deployment-chain/deployment-chain.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    BipariteGraphComponent,
    NfvLayoutComponent,
    DeploymentChainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
