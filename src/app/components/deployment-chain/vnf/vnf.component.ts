import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Vnf} from "../../../models/vnf";

@Component({
  selector: 'app-vnf',
  templateUrl: './vnf.component.html',
  styleUrls: ['./vnf.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VnfComponent implements OnInit {

  @Input() data: Vnf;

  constructor() { }

  ngOnInit() {
  }

}
