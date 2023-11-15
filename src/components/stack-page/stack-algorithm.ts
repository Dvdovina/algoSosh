import { TStack } from "../../types/common-types";


export class Stack<T> implements TStack<T> {
    private container: T[] = [];

    push = (item: T): void => {
        this.container.push(item);
    };

    pop = (): void => {
        this.container.pop();
    };

    peak = (): T | null => {
        if (this.container.length) return this.container[this.container.length - 1];
        return null;
    }

    getLength = () => this.container.length;

    getContainer = () => {
        return this.container;
    };
}