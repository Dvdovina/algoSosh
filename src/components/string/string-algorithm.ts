import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { TString } from "../../types/common-types";
import { timeout, swap } from "../../utils/utils";


export const sortArray = async (
    arr: TString[],
    setState: React.Dispatch<React.SetStateAction<TString[]>>,
    setLoader: (value: React.SetStateAction<boolean>) => void
) => {
    const { length } = arr;
    let start = 0;
    let end;
    let mid = Math.floor(length / 2);
    for (start; start < mid; start++) {
        end = length - 1 - start
        if (start < end) {
            arr[start].state = ElementStates.Changing;
            arr[end].state = ElementStates.Changing;
            setState([...arr]);
        }
        swap(arr, start, end);
        arr[start].state = ElementStates.Modified;
        arr[end].state = ElementStates.Modified;
        await timeout(DELAY_IN_MS);
    }
    arr[start].state = ElementStates.Modified;
    setState([...arr]);
    setLoader(false);
    return arr;
};
