import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subscription, timer} from "rxjs";
import {NfvEnvironmentService} from "./nfv-environment.service";
import {ConsoleService} from "./console.service";

@Injectable({
  providedIn: 'root'
})
export class DemonstrationService {

  protected _currentStep = new BehaviorSubject(0);
  protected currentStep = this._currentStep.asObservable();
  protected timer: Subscription;
  protected playing = false;
  protected inInitState = true;

  public isShowServers = false;
  public isShowChain = false;
  public isShowPartitions = false;
  public isShowGraph = false;
  public isIteratingPartitions = false;

  protected steps = [
    {id: 1, description: 'First step: Generate all of the possible partitions of VNFs into a partition set. The count of the partition set is known as Bell Number.<br />' +
        '(1, 1, 2, 5, 15, 52, 203, 877, 4140, 21147, 115975, 678570, 4213597, ...)'},
    {id: 2, description: 'Second step: Iterate over all partition of partition sets and servers and <br />' +
        'inside of the iteration we calculate the HyperVisor and VNF switching cost of deploying VNF partition on one of our servers'},
    {id: 3, description: 'Find the minimum of the switching costs with the help of a Bipartite Graph'},
    {id: 4, description: 'Generate a deploy-map based on the extracted solution from the Graph'}
  ];

  public navigationText = "";

  constructor(private ne: NfvEnvironmentService, private cs: ConsoleService) {
    this.navigationText = this.steps[0].description;
  }

  nextStep() {
    if(this.inInitState) {
      this.inInitState = false;
    }
    const step = this._currentStep.value + 1;

    if(step == 1 ) {
      this.navigationText = "";
      this.isShowPartitions = true;
    } else if (step == 2) {
      this.navigationText = this.steps[1].description;
      this.isShowPartitions = false;
    } else if (step == 3) {
      this.navigationText = "";
      this.isShowPartitions = true;
      this.isShowServers = true;
      this.isIteratingPartitions = true;
      this.isShowGraph = true;
    }


    switch(step) {
      case 1:
        this.cs.addConsoleLine('Step 1.: ' + this.steps.find(items => items.id == 1).description);
        break;
    }
    this._currentStep.next(step);
  }

  play() {

    if(this.inInitState) {
      this.inInitState = false;
    }

    if(this.playing === true) {
      this.stop();
    } else {
      this.playing = true;
      this.timer = timer(1000, 1000).subscribe(val => {
        this.nextStep();
      });
    }
  }

  stop() {
    this.playing = false;
    if(this.timer) {
      this.timer.unsubscribe();
    }
  }

  reset() {
    this.stop();
    this.inInitState = true;
    this._currentStep.next(0);
    this.ne.reset();
  }

  get currentStep$(): Observable<number> {
    return this.currentStep;
  }

  get isPlaying(): boolean {
    return this.playing;
  }

  get isInInitState(): boolean {
    return this.inInitState;
  }
}

