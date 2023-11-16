

type TQueue<T> = {
    enqueue: (item: T) => void;
    dequeue: () => void;
    peak: () => T | null;
    getTail: () => T | null;
    getElements: () => (T | null)[];
    isEmpty: () => boolean;
    clear: () => void;
}

export class Queue<T> implements TQueue<T> {
    private container: (T | null)[] = [];
    private head = 0;
    private tail = 0;
    private length: number = 0;
    private size: number = 0; 
    constructor(size: number) {
        this.size = size;
        this.container = Array(size);
    }
    enqueue = (i: T) => {
        if (this.length >= this.size) {
            throw new Error("Maximum length error");
        }
        this.container[this.tail % this.size] = i;
        this.tail++;
        this.length++;
    };
    dequeue = () => {
        if (this.isEmpty()) {
            throw new Error("The queue is empty");
        }
        const item = this.container[this.head];
        delete this.container[this.head % this.size];  
        this.length--;
        this.head++;
        return item;
    };
    peak = () => {
        if (this.isEmpty()) {
            throw new Error("The queue is empty");
        }
        return this.container[this.head];
    };
    getTail = () => {
        if (this.isEmpty()) {
            throw new Error("The queue is empty");
        }
        return this.container[this.tail - 1];
    };
    getElements = () => {
        return this.container;
    };
    isEmpty = () => this.length === 0
    clear = () => {
        this.head = 0;
        this.tail = 0;
        this.container = Array(this.size);
        this.length = 0;
    };
}