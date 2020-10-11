import { ResourceTypeApiV1 } from './ResourceTypeApiV1';

export interface ResourceApiV1 {
  [ResourceTypeApiV1.Black]: number;
  [ResourceTypeApiV1.Blue]: number;
  [ResourceTypeApiV1.Green]: number;
  [ResourceTypeApiV1.Red]: number;
  [ResourceTypeApiV1.Uncolored]: number;
  [ResourceTypeApiV1.White]: number;
}
