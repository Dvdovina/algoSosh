import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { timeout } from "../../utils/utils";



export const getNumbers = (num: number) => {
    let arr: number[] = [1, 1];
    for (let i = 2; i < num + 1; i++) {
        arr.push(arr[i - 2] + arr[i - 1]);
    }
    return arr;
};


export const sortFibonacci = async (
    arr: string[],
    setState: React.Dispatch<React.SetStateAction<string[]>>,
    setLoader: (value: React.SetStateAction<boolean>) => void
) => {
    const { length } = arr;
    let i = 0;
    let numArray = [];
    for (i; i < length; i++) {
        numArray.push(arr[i]);
        await timeout(SHORT_DELAY_IN_MS);
        setState(numArray.map(String));
    }
    setLoader(false);
    return numArray;
};