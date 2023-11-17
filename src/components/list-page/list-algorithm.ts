export class Node<T> {
    value: T;
    next: Node<T> | null;
    constructor(value: T, next?: Node<T> | null) {
        this.value = value;
        this.next = this.next = (next === undefined ? null : next);
    }
}

interface ILinkedList<T> {
    append: (element: T) => void;
    prepend: (element: T) => this;
    getSize: () => number;
    addByIndex: (element: T, index: number) => void;
    deleteByIndex: (index: number) => void;
    deleteHead: () => Node<T> | null;
    deleteTail: () => Node<T> | null;
    toArray: () => T[]
}

export class LinkedList<T> implements ILinkedList<T> {

    private head: Node<T> | null;
    private tail: Node<T> | null;
    private size: number;
    private length: number;

    constructor(arr: T[]) {
        this.head = null;
        this.tail = null;
        this.size = 0;
        this.length = 0;
        arr.forEach((item) => this.append(item));
    }

    append(el: T) {
        const node = new Node(el);
        if (!this.head || !this.tail) {
            this.head = node;
            this.tail = node;
            return this;
        }
        this.tail.next = node;
        this.tail = node;
        this.length++;
        this.size++;
        return this;
    }

    prepend(el: T) {
        const node = new Node(el, this.head);
        this.head = node;
        if (!this.tail) {
            this.tail = node;
        }
        this.length++;
        this.size++;
        return this;
    }

    deleteHead() {
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
        this.size--;
        this.length--;
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

    addByIndex(element: T, index: number) {
        if (index < 0 || index > this.size) {
            console.log("Enter a valid index");
            return;
        } else {
            const node = new Node(element);
            let el;
            if (index === 0) {
                node.next = this.head;
                this.head = node;
            } else {
                let current = this.head;
                let currentIndex = 0;
                while (currentIndex++ < index) {
                    el = current;
                    if (current) {
                        current = current.next;
                    }
                }
                if (el) {
                    node.next = current;
                    el.next = node;
                }
            }
            this.size++;
            this.length++;
        }
    }

    deleteByIndex(index: number) {
        if (index < 0 || index > this.size) {
            console.log("Enter a valid index");
            return;
        }
        let start = this.head;
        if (index === 0) {
            if (this.head) this.head = this.head.next;
        } else {
            let current = null;
            let currIndex = 0;
            while (currIndex++ < index) {
                current = start;
                if (start) {
                    start = start.next;
                }
            }
            if (current?.next) {
                current.next = start?.next ? start.next : null;
            }
        }
        this.size--;
        this.length--;
    }

    toArray() {
        let current = this.head;
        const array: T[] = [];
        while (current) {
            array.push(current?.value);
            current = current.next;
        }
        return array;
    }

    getSize() {
        return this.size;
    }

}