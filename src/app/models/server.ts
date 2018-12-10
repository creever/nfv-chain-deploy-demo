import {Vnf} from "./vnf";

export interface Server {
  id: number,
  name: string,
  vnfs: Vnf[],
  storedSubChains: Vnf[]
}
