import { ResourceType } from './ResourceType';

export interface Resource {
  [ResourceType.Black]: number;
  [ResourceType.Blue]: number;
  [ResourceType.Green]: number;
  [ResourceType.Red]: number;
  [ResourceType.Uncolored]: number;
  [ResourceType.White]: number;
}
