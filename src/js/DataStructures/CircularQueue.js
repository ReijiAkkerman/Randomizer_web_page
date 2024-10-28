class CircularQueue {
    #front;
    #rear;
    #items;
    #queue_size;
    #last_dequeued_element;

    constructor(queue_size, last_dequeued_element, init_elements) {
        this.#front = 0;
        this.#rear = 1;
        this.#items = [];
        this.#queue_size = queue_size;
        this.#last_dequeued_element = last_dequeued_element;
        this.#items[0] = init_elements[0];
        this.#items[1] = init_elements[1];
    }

    enQueue(value) {
        if(this.isFull()) {
            console.log("Очередь заполнена!");
        }
        else {
            if(this.#front === -1)
                this.#front = 0;
            this.#rear = (this.#rear + 1) % this.#queue_size;
            this.#items[this.#rear] = value;
        }
    }

    deQueue() {
        if(this.isEmpty()) {
            console.log("Очередь пуста!");
        }
        else {
            if(this.#front === this.#rear) {
                this.#rear = -1;
                this.#front = -1;
                this.lastDeQueuedElement = undefined;
            }
            else {
                this.#last_dequeued_element = this.#items[this.#front];
                this.#front = (this.#front + 1) % this.#queue_size;
            }
        }
    }

    isFull() {
        if((this.#rear + 1) % this.#queue_size === this.#front) return true;
        return false;
    }

    isEmpty() {
        if(this.#front === -1) return true;
        return false;
    }

    peek() {
        return this.#items[this.#front];
    }

    get lastDeQueuedElement() {
        return this.#last_dequeued_element;
    }
}

export {CircularQueue};