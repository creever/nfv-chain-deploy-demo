import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {Server} from "../models/server";
import {Vnf} from "../models/vnf";

@Injectable({
  providedIn: 'root'
})
export class NfvEnvironmentService {

  protected _serverCount = 3;
  protected _chainLength = 10;

  protected dataStore = {
    servers: [],
    chain: []
  };

  protected _servers = new BehaviorSubject<Server[]>(this.dataStore.servers);
  protected servers: Observable<Server[]> = this._servers.asObservable();

  protected _chain = new BehaviorSubject<Vnf[]>(this.dataStore.chain);

  protected chain: Observable<Vnf[]> = this._chain.asObservable();

  constructor() {
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

  moveNextVnfToServer(index: number) {
    if(!this.dataStore.chain.length || 0 > index || index > this.dataStore.servers.length-1)
      return;

    let nextVnf = this.dataStore.chain.pop();
    nextVnf.cost = Math.floor(Math.random() * 20) + 1;
    this.dataStore.servers[index].vnfs.push(nextVnf);
    this._servers.next([...this.dataStore.servers]);
    this._chain.next([...this.dataStore.chain]);
  }

  setServerCount(count: number) {
    this._serverCount = count;

    this.dataStore.servers = [];
    for(let i = 0; i < count; i++) {
      this.dataStore.servers.push({name: 'Server ' + i, vnfs: []});
    }

    this._servers.next([...this.dataStore.servers]);
  }

  setChainLength(length: number) {
    this._chainLength = length;

    this.dataStore.chain = [];
    for(let i = 0; i < length; i++) {
      this.dataStore.chain.push({name: 'VNF ' + i});
    }

    this._chain.next([...this.dataStore.chain]);
  }

  reset() {
    this.setChainLength(this._chainLength);
    this.setServerCount(this._serverCount);
  }
}
