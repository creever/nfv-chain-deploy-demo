import {Vnf} from "./vnf";

export interface Server {
  name: string,
  vnfs: Vnf[]
}
