class Stack {
    top;
    #items;
    #size;

    constructor(size) {
        this.top = -1;
        this.#items = [];
        this.#size = size;
    }

    push(value) {
        if(this.isFull())
            return false;
        else {
            this.top++;
            this.#items.push(value);
            return true;
        }
    }

    pop() {
        if(this.isEmpty())
            return false;
        else {
            this.#items.pop();
            this.top--;
            return true;
        }
    }

    isFull() {
        if(this.top + 1 === this.#size) return true;
        else return false;
    }

    isEmpty() {
        if(this.top === -1) return true;
        else return false;
    }

    peek() {
        if(!this.isEmpty()) return this.#items[this.top];
        else return false;
    }
}

export {Stack};