import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subscription, timer} from "rxjs";
import {NfvEnvironmentService} from "./nfv-environment.service";

@Injectable({
  providedIn: 'root'
})
export class DemonstrationService {

  protected _currentStep = new BehaviorSubject(0);
  protected currentStep = this._currentStep.asObservable();
  protected timer: Subscription;
  protected playing = false;
  protected inInitState = true;

  constructor(private ne: NfvEnvironmentService) { }

  nextStep() {
    if(this.inInitState) {
      this.inInitState = false;
    }
    this._currentStep.next(this._currentStep.value + 1);
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
        this._currentStep.next(this._currentStep.value + 1);
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

