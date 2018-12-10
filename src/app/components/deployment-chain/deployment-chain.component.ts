import {ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {DemonstrationService} from "../../services/demonstration.service";
import {NfvEnvironmentService} from "../../services/nfv-environment.service";

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  SPACE = 32,
  ESC = 27
}

@Component({
  selector: 'app-deployment-chain',
  templateUrl: './deployment-chain.component.html',
  styleUrls: ['./deployment-chain.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeploymentChainComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();

  constructor(public ds: DemonstrationService, public ne: NfvEnvironmentService) {
    this.subscriptions.add(
      ds.currentStep$.subscribe(step => {
        this.nextStep(step);
      }
    ));
  }

  ngOnInit() {
    //console.log(this.getAllPartitions([], [1,2,3]));
    //this.Bell(5, console.log);
    // this.init(4, [], []);
  }

  nextStep(step) {
    if(this.ds.isIteratingPartitions) {
      if(this.ne.moveNextVnfToServer(step).isOver) {
        this.ds.isIteratingPartitions = false;
        this.ds.isShowServers = false;
        this.ds.isShowPartitions = false;
        this.ds.navigationText = "Now we know the switching cost of each subschain of the servers";
        this.ds.isShowGraph = false;
      }
    }
  }

  calculateSwitchingCost() {
    return 0;
  }

  private init(n: number, arr1: Array<number>, arr2: Array<number>) {
    for(let i = 0; i < n; i++) {
      arr1[i] = 0;
      arr2[i] = 0;
    }

    this.nextPartition(n, arr1, arr2);
    this.nextPartition(n, arr1, arr2);
    this.nextPartition(n, arr1, arr2);
    this.nextPartition(n, arr1, arr2);
    this.nextPartition(n, arr1, arr2);
    this.nextPartition(n, arr1, arr2);
    this.nextPartition(n, arr1, arr2);
    this.nextPartition(n, arr1, arr2);
    this.nextPartition(n, arr1, arr2);
    this.nextPartition(n, arr1, arr2);
    this.nextPartition(n, arr1, arr2);
    this.nextPartition(n, arr1, arr2);
    this.nextPartition(n, arr1, arr2);
    this.nextPartition(n, arr1, arr2);
    this.nextPartition(n, arr1, arr2);
  }

  private nextPartition(n: number, arr1: Array<number>, arr2: Array<number>) {
    for(let i = n - 1; i >= 1; i--) {
      if (arr1[i] <= arr2[i-1]) {
        arr1[i] = arr1[i] + 1;
        arr2[i] = Math.max(arr2[i], arr1[i]);

        for (let j = i + 1; j < n; j++) {
          arr1[j] = 0;
          arr2[j] = arr2[i];
        }

        console.log(arr1, arr2);
        return;
      }

    }
  }


  private Stirling(n, k, f) {
    if (n == 0 && k == 0) { f([]); return; }
    if (n == 0 || k == 0) { return; }
    this.Stirling(n-1, k, function(s) {
      for (var i = 0; i < k; i++) {
        s[i].push(n);
        f(s);
        s[i].pop();
      }
    });
    this.Stirling(n-1, k-1, function(s) {
      s.push([n]);
      f(s);
      s.pop();
    });
  }

  private Bell(n, f) {
    for (var i = 1; i <= n; i++) {
      this.Stirling(n, i, f);
    }
  }

  private getAllPartitions(fixedParts: Array<Array<number>>, suffixElements: Array<number>): Array<Array<number>> {

    const subItems = [...fixedParts, suffixElements];
    const suffixPartitions = this.getTuplePartitions(suffixElements);


    for(let i = 0; i < suffixPartitions.length; i++) {

      const subPartitions = this.getAllPartitions([...fixedParts, suffixPartitions[i].Item1], suffixPartitions[i].Item2);

      for (let j = 0; j < subPartitions.length; j++) {
        subItems.push(subPartitions[j]);
      }
    }

    return subItems;
  }

  private getTuplePartitions(elements: Array<number>): Array<{Item1: Array<number>, Item2: Array<number>}> {

    const items = [{Item1: [], Item2: []}];
    // No result if less than 2 elements
    if (elements.length < 2) {
      return items;
    }

    // Generate all 2-part partitions
    for (let i = 1; i < 1 << (elements.length - 1); i++) {
      // Create the two result sets and
      // assign the first element to the first set
      const resultSets: Array<Array<number>> = [[elements[0]], []];
      // Distribute the remaining elements
      for (let j = 1; j < elements.length; j++) {
        resultSets[(i >> (j - 1)) & 1].push(elements[j]);
      }

      items.push({Item1: resultSets[0], Item2: resultSets[1]});
    }

    return items;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
