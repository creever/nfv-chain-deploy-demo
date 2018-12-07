import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DemonstrationService} from "../../services/demonstration.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit {

  @Output() onNextStep: EventEmitter<any> = new EventEmitter();
  @Output() onPlay: EventEmitter<any> = new EventEmitter();

  constructor(private ds: DemonstrationService) { }

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


}
