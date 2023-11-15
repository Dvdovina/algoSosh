import { TString } from "../types/common-types";

export const swap = (
    arr: TString[],
    start: number,
    end: number
  ): void => {
    const check = arr[start];
    arr[start] = arr[end];
    arr[end] = check;
  };

  export const timeout = (delay: number) => {
    return new Promise((res) => setTimeout(res, delay));
  };