export default class Queue {
    constructor(arr = []) {
        this.queue = []
        arr.forEach(elem => this.enqueue(elem))
        
    }
  
    enqueue(element) {
        this.queue.push(element);
        return this.queue;
    }
  
    dequeue() {
        return this.queue.shift();
    }
  
    peek() {
        return this.queue[0];
    }
  
    reverse() {
        // Declare an empty array
        const reversed = [];
    
        // Iterate through the array using a while loop
        while (this.queue.length > 0) {
            reversed.push(this.queue.pop());
        }
        // Set queue using the new array
        this.queue = reversed;
        return this.queue;
    }
  }