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

export const bubbleSort = (size: string, array: number[]) => {
    if (array.length === 0) return [];
    if (array.length === 1) return array;
    for (let i = 0; i < array.length; i++) {
        for (let n = 0; n < array.length - i - 1; n++) {
            if (size === 'descend' ? array[n] < array[n + 1] : array[n] > array[n + 1]) {
                let tempArr = array[n];
                array[n] = array[n + 1];
                array[n + 1] = tempArr;
            }
        }
    }
    return array;
};

export const selectionSort = (size: string, array: number[]) => {
    if (array.length === 0) return [];
    if (array.length === 1) return array;
    for (let i = 0; i < array.length - 1; i++) {
        let index = i;
        for (let n = i + 1; n < array.length; n++) {
            if (size === 'descend' ? array[index] < array[n] : array[index] > array[n])
                index = n;
        }
        let tempArr = array[index];
        array[index] = array[i];
        array[i] = tempArr;
    }
    return array;
};