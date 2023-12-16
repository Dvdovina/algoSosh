
import { bubbleSort, selectionSort } from "./sorting-page-algorithm";

describe("Testing sorting", () => {
    it("should be rendered correctly while the array is empty", async () => {
        expect(selectionSort('ascend', [])).toEqual([]);
        expect(selectionSort('descend', [])).toEqual([]);
        expect(bubbleSort('ascend', [])).toEqual([]);
        expect(bubbleSort('descend', [])).toEqual([]);
    });
    it("should be rendered correctly while the array has one element", async () => {
        expect(selectionSort('ascend', [1])).toEqual([1]);
        expect(selectionSort('descend', [1])).toEqual([1]);
        expect(bubbleSort('ascend', [1])).toEqual([1]);
        expect(bubbleSort('descend', [1])).toEqual([1]);
    });
    it("should be rendered correctly while the array has multiple elements", async () => {
        expect(selectionSort('ascend', [4, 2, 5, 1, 3, 6])).toEqual([1, 2, 3, 4, 5, 6]);
        expect(selectionSort('descend', [4, 2, 5, 1, 3, 6])).toEqual([6, 5, 4, 3, 2, 1]);
        expect(bubbleSort('ascend', [4, 2, 5, 1, 3, 6])).toEqual([1, 2, 3, 4, 5, 6]);
        expect(bubbleSort('descend', [4, 2, 5, 1, 3, 6])).toEqual([6, 5, 4, 3, 2, 1]);
    });
});