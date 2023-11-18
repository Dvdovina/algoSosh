import { ElementStates } from "./element-states";


export type TString = {
  value: string;
  state: ElementStates;
}

export type TStack<T> = {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getLength: () => number;
  getContainer: () => T[];
}

export type TArray = {
  number: number;
  state: ElementStates;
};