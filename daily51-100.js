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

/* 57
Given a string s and an integer k, break up the string into multiple lines such that each line has a length of k or less. 
You must break it up so that words don't break across lines. Each line has to have the maximum possible amount of words. 
If there's no way to break the text up, then return null.
You can assume that there are no spaces at the ends of the string and that there is exactly one space between each word.
For example, given the string "the quick brown fox jumps over the lazy dog" and k = 10, you should return: 
["the quick", "brown fox", "jumps over", "the lazy", "dog"]. No string in the list has a length of more than 10.
*/

function breakTextIntoLines(s, k) {
    const words = s.split(" ");
    const lines = [];
    let currentLine = "";
    
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        
        if (currentLine.length + word.length <= k) {
            if (currentLine) {
                currentLine += " ";
            }
            currentLine += word;
        } else {
            if (!currentLine) {
                return null; // Word length is greater than k
            }
            lines.push(currentLine);
            currentLine = word;
        }
    }
    
    if (currentLine) {
        lines.push(currentLine);
    }
    
    return lines;
}

// Example usage:
const s = "the quick brown fox jumps over the lazy dog";
const k = 10;
console.log(breakTextIntoLines(s, k)); // Output: ["the quick", "brown fox", "jumps over", "the lazy", "dog"]

/* 58
An sorted array of integers was rotated an unknown number of times.
Given such an array, find the index of the element in the array in faster than linear time. 
If the element doesn't exist in the array, return null.
For example, given the array [13, 18, 25, 2, 8, 10] and the element 8, return 4 (the index of 8 in the array).
You can assume all the integers in the array are unique.
*/



/* 60
Given a multiset of integers, return whether it can be partitioned into two subsets whose sums are the same.
For example, given the multiset {15, 5, 20, 10, 35, 15, 10}, it would return true, since we can split it up into 
{15, 5, 10, 15, 10} and {20, 35}, which both add up to 55.
Given the multiset {15, 5, 20, 10, 35}, it would return false, since we can't split it up into two subsets that add up to the same sum.
*/



/* 61
Implement integer exponentiation. That is, implement the pow(x, y) function, where x and y are integers and returns x^y.
Do this faster than the naive method of repeated multiplication.
For example, pow(2, 10) should return 1024.
*/



/* 62
There is an N by M matrix of zeroes. Given N and M, write a function to count the number of ways of starting at the top-left corner 
and getting to the bottom-right corner. You can only move right or down.
For example, given a 2 by 2 matrix, you should return 2, since there are two ways to get to the bottom-right:
Right, then down
Down, then right
Given a 5 by 5 matrix, there are 70 ways to get to the bottom-right.
*/



/* 63
Given a 2D matrix of characters and a target word, write a function that returns whether the word can be found 
in the matrix by going left-to-right, or up-to-down.
For example, given the following matrix:
[['F', 'A', 'C', 'I'],
 ['O', 'B', 'Q', 'P'],
 ['A', 'N', 'O', 'B'],
 ['M', 'A', 'S', 'S']]
and the target word 'FOAM', you should return true, since it's the leftmost column. 
Similarly, given the target word 'MASS', you should return true, since it's the last row.
*/