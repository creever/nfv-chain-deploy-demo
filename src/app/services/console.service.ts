import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {

  protected _consoleLines = new BehaviorSubject<string[]>(['Console']);
  protected consoleLines = this._consoleLines.asObservable();

  constructor() { }

  get consoleLines$(): Observable<string[]> {
    return this.consoleLines;
  }

  addConsoleLine(line: string) {
    this._consoleLines.next([...this._consoleLines.value, line]);
  }
}
