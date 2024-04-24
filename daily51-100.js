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

/* 55
Implement a URL shortener with the following methods:
shorten(url), which shortens the url into a six-character alphanumeric string, such as zLg6wl.
restore(short), which expands the shortened string into the original url. If no such shortened string exists, return null.
Hint: What if we enter the same URL twice?
*/

class URLShortener {
    constructor() {
        this.urlToShort = {};
        this.shortToUrl = {};
    }

    shorten(url) {
        if (this.urlToShort[url]) {
            return this.urlToShort[url];
        }

        const short = this.generateShort();
        this.urlToShort[url] = short;
        this.shortToUrl[short] = url;
        return short;
    }

    restore(short) {
        return this.shortToUrl[short] || null;
    }

    generateShort() {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let short = '';
        for (let i = 0; i < 6; i++) {
            short += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return short;
    }
}

// Example usage:
const shortener = new URLShortener();
const url1 = "https://www.example.com";
const short1 = shortener.shorten(url1);
console.log("Shortened URL:", short1);

const url2 = "https://www.example.com";
const short2 = shortener.shorten(url2);
console.log("Shortened URL for the same URL:", short2); // Should print the same short URL

const restoredUrl = shortener.restore(short1);
console.log("Restored URL:", restoredUrl);

const invalidShort = "abc123";
const restoredInvalidUrl = shortener.restore(invalidShort);
console.log("Restored invalid URL:", restoredInvalidUrl); // Should print null
