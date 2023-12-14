import { ElementStates } from "../../types/element-states";
import { TString } from "../../types/common-types";
import { sortArray } from "./string-algorithm";


describe("Testing string reversal", () => {
    const setState = jest.fn()
    const setLoader = jest.fn()
    it("should be rendered correctly with even number of characters", async () => {
        const stringArr = Array.from("abcd");
        const testStringArr = Array.from("dcba");
        const arrayObj = stringArr.map((value) => ({
            value,
            state: ElementStates.Default,
        })) as TString[];
        const arrayTestObj = testStringArr.map((value) => ({
            value,
            state: ElementStates.Modified,
        })) as TString[];
        const sortingArr = await sortArray(arrayObj, setState, setLoader);
        expect(sortingArr).toEqual(arrayTestObj);
    });
    it("should be rendered correctly with odd number of characters", async () => {
        const stringArr = Array.from("abcde");
        const testStringArr = Array.from("edcba");
        const arrayObj = stringArr.map((value) => ({
            value,
            state: ElementStates.Default,
        })) as TString[];
        const arrayTestObj = testStringArr.map((value) => ({
            value,
            state: ElementStates.Modified,
        })) as TString[];
        const sortingArr = await sortArray(arrayObj, setState, setLoader);
        expect(sortingArr).toEqual(arrayTestObj);
    });
    it("should be rendered correctly with one character", async () => {
        const stringArr = Array.from("a");
        const testStringArr = Array.from("a");
        const arrayObj = stringArr.map((value) => ({
            value,
            state: ElementStates.Default,
        })) as TString[];
        const arrayTestObj = testStringArr.map((value) => ({
            value,
            state: ElementStates.Modified,
        })) as TString[];
        const sortingArr = await sortArray(arrayObj, setState, setLoader);
        expect(sortingArr).toEqual(arrayTestObj);
    });
    it("should be rendered correctly with empty string", async () => {
        const stringArr: TString[] = [];
        const sortingArr = await sortArray(stringArr, setState, setLoader);
        expect(sortingArr).toEqual(stringArr);
    })
})
