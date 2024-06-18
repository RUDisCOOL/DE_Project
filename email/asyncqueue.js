class async_queue {
    constructor() {
        this.queue = [];
        this.isprocessing = false;
    }

    async add(fn) {
        this.queue.push(fn);
        if(!this.isprocessing) {
            this.#processing();
        }
    }

    async #processing() {
        if(this.isprocessing) {
            return
        }

        this.isprocessing = true;

        while (this.queue.length > 0) {
            const task = this.queue.shift();
            try {
                await task();
            } catch(err) {
                console.log(err);
            }
        }

        this.isprocessing = false;
    }
}

module.exports = async_queue;
