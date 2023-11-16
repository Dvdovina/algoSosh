import { ElementStates } from "../../types/element-states";
import { TArray } from "../../types/common-types";

export const randomNum = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomArr = (): TArray[] => {
    let arr: TArray[] = [];
    const min = 3;
    const max = 17;
    let length = randomNum(min, max);
    for (let i = 0; i < length; i++) {
        arr.push({ number: randomNum(0, 100), state: ElementStates.Default });
    }
    return arr;
};