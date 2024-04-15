import { Coordinate, Action } from ".";

export default interface ParsedFile {
  data: Coordinate[];
  actions: Action[];
}
