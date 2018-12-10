import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DemonstrationService} from "../../services/demonstration.service";
import {FormControl} from "@angular/forms";
import {Subscription} from "rxjs";
import {NfvEnvironmentService} from "../../services/nfv-environment.service";
import {ConsoleService} from "../../services/console.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit, OnDestroy {

  @Output() onNextStep: EventEmitter<any> = new EventEmitter();
  @Output() onPlay: EventEmitter<any> = new EventEmitter();

  serverCount: FormControl = new FormControl(3);
  chainLength: FormControl = new FormControl(10);
  subscriptions: Subscription = new Subscription();

  isShowConsole = false;

  constructor(public ds: DemonstrationService, private ne: NfvEnvironmentService, private cs: ConsoleService) {
    this.subscriptions.add(this.serverCount.valueChanges.subscribe(value => this.ne.setServerCount(value)));
    this.subscriptions.add(this.chainLength.valueChanges.subscribe(value => this.ne.setChainLength(value)));
  }

  ngOnInit() {
  }

  play() {
    this.onPlay.next(null);
    this.ds.play();
  }

  nextStep() {
    this.onNextStep.next(null);
    this.ds.nextStep();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  showConsole() {
    this.isShowConsole = !this.isShowConsole;
  }


}
