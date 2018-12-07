import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-nfv-layout',
  templateUrl: './nfv-layout.component.html',
  styleUrls: ['./nfv-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NfvLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
