import { ElementStates } from "../../types/element-states";


export class Node<T> {
    value: T
    next: Node<T> | null
    constructor(value: T, next?: Node<T> | null) {
        this.value = value;
        this.next = (next === undefined ? null : next);
    }
}

export type TLinkedList<T> = {
    append: (element: T) => void;
    prepend: (element: T) => void;
    deleteHead: () => Node<T> | null;
    deleteTail: () => Node<T> | null;
    addByIndex: (element: T, index: number) => void;
    deleteByIndex: (index: number) => void;
    getSize: () => number;
    toArray: () => T[]
}

export class LinkedList<T> implements TLinkedList<T> {
    // private container: (T | null)[] = [];
    private head: Node<T> | null;
    private tail: Node<T> | null;
    private size: number;
    length: number;

    constructor(arr: T[]) {
        this.head = null;
        this.tail = null;
        this.length = 0;
        this.size = 0;
        if (arr && arr.length > 0) {
            arr?.forEach((item) => {
                this.append(item)
            })
        }
    }
    append = (el: T) => {
        const node = new Node(el);
        if (!this.head || !this.tail) {
            this.head = node;
            this.tail = node;
            this.length++;
            return this;
        }
        this.tail.next = node;
        this.tail = node;
        this.length++;
        return this;
    }
    prepend = (el: T) => {
        const node = new Node(el);
        if (!this.head || !this.tail) {
            this.head = node;
            this.head.next = null;
            this.tail = node;
        }
        node.next = this.head;
        this.head = node;
        this.length++;
        this.size++;
    }
    deleteHead = () => {
        if (!this.head) {
            return null;
        }
        const deletedHead = this.head;
        if (this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }
        this.length--;
        this.size--;
        return deletedHead;
    }
    deleteTail() {
        if (!this.tail) {
            return null;
        }
        const deletedTail = this.tail;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
            return deletedTail;
        }
        let currentNode = this.head;
        while (currentNode?.next) {
            if (!currentNode.next.next) {
                currentNode.next = null;
            } else {
                currentNode = currentNode.next;
            }
        }
        this.tail = currentNode;
        this.size--;
        this.length--;
        return deletedTail;
    }
    addByIndex = (element: T, index: number) => {
        if (index < 0 || index > this.size) {
            console.log("Enter a valid index");
            return;
        } else {
            const node = new Node(element);
            if (index === 0) {
                node.next = this.head;
                this.head = node;
            } else {
                let curr = this.head;
                let currIndex = 0;
                while (currIndex++ < index) {
                    if (curr) {
                        curr = curr.next;
                    }
                }
                if (curr) {
                    node.next = curr.next;
                    curr.next = node;
                }
            }
            this.size++;
            this.length++;
        }
    }
    deleteByIndex = (index: number) => {
        if (index < 0 || index > this.size) {
            console.log("Enter a valid index");
            return;
        }
        let start = this.head;
        if (index === 0) {
            if (this.head) this.head = this.head.next;
        } else {
            let curr = null;
            let currIndex = 0;
            while (currIndex++ < index) {
                curr = start;
                if (start) {
                    start = start.next;
                }
            }
            if (curr?.next) {
                curr.next = start?.next ? start.next : null;
            }
        }
        this.size--;
        this.length--;
    }
    toArray() {
        let curr = this.head;
        let arr: T[] = [];
        while (curr) {
            arr.push(curr.value);
            curr = curr.next;
        }
        return arr;
    }
    getSize = () => this.length;
}
