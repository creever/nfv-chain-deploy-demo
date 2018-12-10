import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Server} from "../models/server";
import {Vnf} from "../models/vnf";
import {ConsoleService} from "./console.service";

@Injectable({
  providedIn: 'root'
})
export class NfvEnvironmentService {

  protected _serverCount = 3;
  protected _chainLength = 4;

  protected dataStore = {
    servers: [],
    chain: []
  };

  protected _servers = new BehaviorSubject<Server[]>(this.dataStore.servers);
  protected servers: Observable<Server[]> = this._servers.asObservable();

  protected _chain = new BehaviorSubject<Vnf[]>(this.dataStore.chain);

  protected chain: Observable<Vnf[]> = this._chain.asObservable();

  private partitions = [
    [[1], [2], [3]],
    [[1, 2], [3]],
    [[1, 3], [2]],
    [[1], [2, 3]],
    [[1, 2, 3]]
  ];

  private calculatedSwitchingCosts = {};

  constructor(private cs: ConsoleService) {
    this.reset();
  }

  get chain$(): Observable<Vnf[]> {
    return this.chain;
  }

  get servers$(): Observable<Server[]> {
    return this.servers;
  }

  get serverCount(): number {
    return this._serverCount;
  }

  generatePartitionSets(length: number) {

    for(let i = 0; i < this.partitions.length; i++) {
      for(let j = 0; j < this.partitions[i].length; j++) {
        for(let k = 0; k < this.partitions[i][j].length; k++) {
          this.partitions[i][j][k] = this.dataStore.chain.find(item => item.id === this.partitions[i][j][k]);
        }
      }
    }

    return this.partitions;
  }

  get partitionSet() {
    return this.partitions;
  }

  moveNextVnfToServer(step: number) {
    let startStep = 4;

    let currentPartition;
    for(let i = 0; i < this.partitions.length; i++) {
      for (let j = 0; j < this.partitions[i].length; j++) {
        startStep++;

        if(startStep == step) {
          currentPartition = this.partitions[i][j];
          currentPartition['active'] = true;
          console.log(step, currentPartition);

          for(let k = 0; k < this.dataStore.servers.length; k++) {
            this.dataStore.servers[k].vnfs = [...currentPartition];
            this.dataStore.servers[k].storedSubChains.push(currentPartition);
          }

          this._servers.next([...this.dataStore.servers]);

          break;
        } else {
          this.partitions[i][j]['active'] = false;
        }
      }
    }

    if (startStep < step) {
      return {isOver: true};
    }

    return {isOver: false};
  }

  F(concurrent = false, copies = 1) {
    let min = 1;
    let max = 10;

    if(concurrent) {
      max = 2;
      min = 1;
    }

    return (Math.floor(Math.random() * (max - min + 1)) + min) * copies;
  }

  calculateDeltaF(copies) {
    return (copies * this.F() - this.F(true, copies));
  }

  generateSwitchingCost(copies) {
    let cost = 0;
    let deltacost = 0;

    for(let i = 1; i <= copies; i++) {
      console.log(deltacost, this.calculateDeltaF(copies));
      deltacost += this.calculateDeltaF(copies);
    }

    for(let i = 1; i <= copies; i++) {
      cost += this.F() - (copies - 1);
    }

    console.log("cost", cost, deltacost, copies);
    cost *= deltacost / copies;

    return cost;
  }

  setServerCount(count: number) {
    this._serverCount = count;

    this.dataStore.servers = [];
    for(let i = 0; i < count; i++) {
      this.dataStore.servers.push({id: i, name: 'Server ' + i, vnfs: [], storedSubChains: []});
    }

    this._servers.next([...this.dataStore.servers]);
  }

  setChainLength(length: number) {
    this._chainLength = length;

    this.dataStore.chain = [];
    for(let i = 0; i < length; i++) {
      this.dataStore.chain.push({id: i, name: 'VNF ' + i});
    }

    this._chain.next([...this.dataStore.chain]);
    this.generatePartitionSets(3);
  }

  reset() {
    this.setChainLength(this._chainLength);
    this.setServerCount(this._serverCount);
  }
}
