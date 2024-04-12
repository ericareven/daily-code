/* 51
Given a function that generates perfectly random numbers between 1 and k (inclusive), where k is an input, 
write a function that shuffles a deck of cards represented as an array using only swaps.
It should run in O(N) time.
Hint: Make sure each one of the 52! permutations of the deck is equally likely.
*/

// Fisher-Yates (also known as Knuth) shuffle algorithm
// The Fisher-Yates algorithm works by iteratively swapping each element of the array with a randomly chosen element that comes after it
function shuffleDeck(deck) {
    const n = deck.length;
    for (let i = n - 1; i > 0; i--) {
        // Generate a random index j such that 0 <= j <= i
        const j = Math.floor(Math.random() * (i + 1));
        // Swap deck[i] with deck[j]
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// Example usage:
const deck = Array.from({ length: 52 }, (_, i) => i + 1); // Representing the deck of cards as an array of numbers from 1 to 52
const shuffledDeck = shuffleDeck(deck);
console.log(shuffledDeck);


/* 53
Implement a queue using two stacks. Recall that a queue is a FIFO (first-in, first-out) data structure with the following methods: 
enqueue, which inserts an element into the queue, and dequeue, which removes it.
*/

class QueueUsingStacks {
    constructor() {
        this.inStack = [];  // Stack for enqueue operation
        this.outStack = [];  // Stack for dequeue operation
    }

    enqueue(value) {
        this.inStack.push(value);
    }

    dequeue() {
        if (this.outStack.length === 0) {
            // If the outStack is empty, transfer elements from inStack to outStack
            while (this.inStack.length > 0) {
                this.outStack.push(this.inStack.pop());
            }
        }
        if (this.outStack.length > 0) {
            // Pop and return the top element from outStack (FIFO)
            return this.outStack.pop();
        } else {
            // If both stacks are empty, return an error message
            return "Error: Dequeue from empty queue";
        }
    }
}

// Example usage:
const queue = new QueueUsingStacks();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

console.log(queue.dequeue());  // Output: 1
console.log(queue.dequeue());  // Output: 2
console.log(queue.dequeue());  // Output: 3
console.log(queue.dequeue());  // Output: Error: Dequeue from empty queue
