import {Component, HostListener} from '@angular/core';
import {KEY_CODE} from "./components/deployment-chain/deployment-chain.component";
import {DemonstrationService} from "./services/demonstration.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    switch(event.keyCode){
      case KEY_CODE.RIGHT_ARROW:
        this.ds.nextStep();
        break;
      case KEY_CODE.SPACE:
        this.ds.play();
        break;
      case KEY_CODE.ESC:
        this.ds.reset();
        break;
    }
  }

  constructor(private ds: DemonstrationService) {}
}
