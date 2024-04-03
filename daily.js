/* 1
Given a list of numbers and a number k, return whether any two numbers from the list add up to k.
For example, given [10, 15, 3, 7] and k of 17, return true since 10 + 7 is 17.
*/

function pairsWithSum(nums, k) {
    const seen = new Set()
    for(let num of nums){
        const complement = k - num
        if (seen.has(complement)) { // seen[complement]
            return true
        }
        seen.add(num) // seen[num]
    }
    return false
}

// Example
const nums = [10, 15, 3, 7]
const j = 17
console.log(pairsWithSum(nums, j))

/* 2
Given an array of integers, return a new array such that each element at index i of the new array is the product of all the numbers in the original array except the one at i.
For example, if our input was [1, 2, 3, 4, 5], the expected output would be [120, 60, 40, 30, 24]. If our input was [3, 2, 1], the expected output would be [2, 3, 6].
*/

function productExceptSelf(nums) {
    const result = new Array(nums);
    let product = 1;

    // Calculate the product of all elements to the left of each index
    for (let i = 0; i < nums.length; i++) {
        result[i] = product;
        product *= nums[i];
    }

    product = 1;

    // Multiply the product of all elements to the right of each index with the result array
    for (let i = nums.length - 1; i >= 0; i--) {
        result[i] *= product;
        product *= nums[i];
    }

    return result;
}

// Example
const nums1 = [1, 2, 3, 4, 5];
console.log(productExceptSelf(nums1)); // Output: [120, 60, 40, 30, 24]

const nums2 = [3, 2, 1];
console.log(productExceptSelf(nums2)); // Output: [2, 3, 6]

/* 4
Given an array of integers, find the first missing positive integer in linear time and constant space. 
In other words, find the lowest positive integer that does not exist in the array. 
The array can contain duplicates and negative numbers as well.
For example, the input [3, 4, -1, 1] should give 2. The input [1, 2, 0] should give 3.
*/

function firstMissingPositive(nums) {
    const n = nums.length;

    // Rearrange the array: place each positive integer at its respective index
    for (let i = 0; i < n; i++) {
        while (0 < nums[i] && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
            [nums[nums[i] - 1], nums[i]] = [nums[i], nums[nums[i] - 1]];
        }
    }

    // Iterate through the rearranged array to find the first missing positive integer
    for (let i = 0; i < n; i++) {
        if (nums[i] !== i + 1) {
            return i + 1;
        }
    }

    // If all positive integers from 1 to n are present, return n + 1
    return n + 1;
}

// Test cases
console.log(firstMissingPositive([3, 4, -1, 1]));  // Output: 2
console.log(firstMissingPositive([1, 2, 0]));     // Output: 3

/* 5
cons(a, b) constructs a pair, and car(pair) and cdr(pair) returns the first and last element of that pair. 
For example, car(cons(3, 4)) returns 3, and cdr(cons(3, 4)) returns 4.
Given this implementation of cons:
def cons(a, b):
    def pair(f):
        return f(a, b)
    return pair
Implement car and cdr.
*/

function cons(a, b) {
    function pair(f) {
        return f(a, b);
    }
    return pair;
}

function car(pair) {
    function getFirst(a, b) {
        return a;
    }
    return pair(getFirst);
}

function cdr(pair) {
    function getLast(a, b) {
        return b;
    }
    return pair(getLast);
}

// Example usage:
console.log(car(cons(3, 4))); // Output: 3
console.log(cdr(cons(3, 4))); // Output: 4


/*
The purpose of writing these functions is to implement a fundamental concept in computer science and programming languages known as "pairing" or "cons cells." 
In languages like Lisp, pairs or cons cells are used to build more complex data structures like lists, trees, and more.
Here's a breakdown of the purpose of each function:
cons: This function is used to create a pair or a cons cell. It takes two values a and b and returns a function pair that represents the pair (a, b). 
The pair function takes another function f as an argument and applies f to a and b. This technique of using higher-order functions allows us to represent pairs in a functional programming style.
car: This function is used to extract the first element of a pair. It takes a pair as an argument and returns the first element a of that pair. 
In the context of cons cells, car is often used to access the head of a list or the left child of a tree node.
cdr: This function is used to extract the second element of a pair. It takes a pair as an argument and returns the second element b of that pair. 
In the context of cons cells, cdr is often used to access the tail of a list or the right child of a tree node.
These functions are foundational building blocks in languages like Lisp and Scheme, where pairs and cons cells are used extensively to construct data structures.
*/

/* 7
Given the mapping a = 1, b = 2, ... z = 26, and an encoded message, count the number of ways it can be decoded.
For example, the message '111' would give 3, since it could be decoded as 'aaa', 'ka', and 'ak'.
You can assume that the messages are decodable. For example, '001' is not allowed.
*/

function numDecodings(message) {
    const n = message.length;
    if (n === 0) return 0;
    
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    dp[1] = message[0] === '0' ? 0 : 1;
    
    for (let i = 2; i <= n; i++) {
        const oneDigit = parseInt(message.slice(i - 1, i));
        const twoDigits = parseInt(message.slice(i - 2, i));
        
        if (oneDigit >= 1 && oneDigit <= 9) {
            dp[i] += dp[i - 1];
        }
        
        if (twoDigits >= 10 && twoDigits <= 26) {
            dp[i] += dp[i - 2];
        }
    }
    
    return dp[n];
}

// Example usage:
const message = "111";
console.log(numDecodings(message)); // Output should be 3


/* 8
A unival tree (which stands for "universal value") is a tree where all nodes under it have the same value.
Given the root to a binary tree, count the number of unival subtrees.
For example, the following tree has 5 unival subtrees:

   0
  / \
 1   0
    / \
   1   0
  / \
 1   1

 */

class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = this.right = null;
    }
}

function countUnivalSubtrees(root) {
    let count = 0;

    function isUnival(node) {
        if (node === null) return true;

        const leftIsUnival = isUnival(node.left);
        const rightIsUnival = isUnival(node.right);

        if (leftIsUnival && rightIsUnival) {
            if (
                (node.left === null || node.left.val === node.val) &&
                (node.right === null || node.right.val === node.val)
            ) {
                count++;
                return true;
            }
        }

        return false;
    }

    isUnival(root);
    return count;
}

// Example usage:
const root = new TreeNode(0);
root.left = new TreeNode(1);
root.right = new TreeNode(0);
root.right.left = new TreeNode(1);
root.right.right = new TreeNode(0);
root.right.left.left = new TreeNode(1);
root.right.left.right = new TreeNode(1);

console.log(countUnivalSubtrees(root)); // Output should be 5


/* 9
Given a list of integers, write a function that returns the largest sum of non-adjacent numbers. Numbers can be 0 or negative.
For example, [2, 4, 6, 2, 5] should return 13, since we pick 2, 6, and 5. [5, 1, 1, 5] should return 10, since we pick 5 and 5.
*/

function maxNonAdjacentSum(arr) {
    if (arr.length === 0) return 0;
    if (arr.length === 1) return Math.max(0, arr[0]);

    let inclusive = arr[0];
    let exclusive = 0;

    for (let i = 1; i < arr.length; i++) {
        let temp = inclusive;
        inclusive = Math.max(inclusive, exclusive + arr[i]);
        exclusive = temp;
    }

    return Math.max(inclusive, exclusive);
}

// Example usage:
console.log(maxNonAdjacentSum([2, 4, 6, 2, 5])); // Output: 13
console.log(maxNonAdjacentSum([5, 1, 1, 5]));    // Output: 10

/* 10
Implement a job scheduler which takes in a function f and an integer n, and calls f after n milliseconds.
*/

function scheduleJob(f, n) {
    setTimeout(f, n);
}

// Example usage:
function myFunction() {
    console.log("Job executed!");
}

scheduleJob(myFunction, 3000); // Call myFunction after 3000 milliseconds (3 seconds)

/* 12
There exists a staircase with N steps, and you can climb up either 1 or 2 steps at a time. Given N, 
write a function that returns the number of unique ways you can climb the staircase. The order of the steps matters.
For example, if N is 4, then there are 5 unique ways:

1, 1, 1, 1
2, 1, 1
1, 2, 1
1, 1, 2
2, 2

What if, instead of being able to climb 1 or 2 steps at a time, you could climb any number from a set of positive integers X? 
For example, if X = {1, 3, 5}, you could climb 1, 3, or 5 steps at a time.
*/
// Dynamic Programming
function countWays(N, X) { // N = steps, X = size of steps
    let dp = new Array(N + 1).fill(0) // Creates an array that stores the number of ways for each step

    dp[0] = 1 // There is only one way to reach the 0th step (by not taking any step)

    for (let i = 1; i <= N; i++) {
        for (let step of X) {
            if (i - step >= 0) {
                dp[i] += dp[i - step]
            }
        }
    }
    return dp[N]
}

// Example usage:
console.log(countWays(4, [1, 2])); // Output: 5 (number of unique ways for N = 4, where steps can be 1 or 2)
console.log(countWays(4, [1, 3, 5])); // Output: 3 (number of unique ways for N = 4, where steps can be 1, 3, or 5)


/* 13
Given an integer k and a string s, find the length of the longest substring that contains at most k distinct characters.
For example, given s = "abcba" and k = 2, the longest substring with k distinct characters is "bcb".
*/

function longestSubstring(s, k) {
    let maxLength = 0;
    let charCount = new Map();
    let left = 0;
    
    for (let right = 0; right < s.length; right++) {
        const rightChar = s[right];
        charCount.set(rightChar, (charCount.get(rightChar) || 0) + 1);

        while (charCount.size > k) {
            const leftChar = s[left];
            charCount.set(leftChar, charCount.get(leftChar) - 1);
            if (charCount.get(leftChar) === 0) {
                charCount.delete(leftChar);
            }
            left++;
        }
        maxLength = Math.max(maxLength, right - left + 1);
    }
    return maxLength;
}

// Example usage:
const s = "abcba";
const k = 2;
console.log(longestSubstring(s, k)); // Output: 3 (for substring "bcb")

/* 14
The area of a circle is defined as πr^2. Estimate π to 3 decimal places using a Monte Carlo method.
Hint: The basic equation of a circle is x2 + y2 = r2.
*/
// The Monte Carlo method is a computational technique that uses random sampling to obtain numerical results.
function estimatePi(numPoints) {
    let insideCircle = 0;

    // Generate random points and count how many fall inside the circle
    for (let i = 0; i < numPoints; i++) {
        const x = Math.random() * 2 - 1; // Random x coordinate between -1 and 1
        const y = Math.random() * 2 - 1; // Random y coordinate between -1 and 1

        // Check if the point falls inside the circle (x^2 + y^2 <= 1)
        if (x * x + y * y <= 1) {
            insideCircle++;
        }
    }

    // Estimate pi based on the ratio of points inside the circle to total points
    const ratio = insideCircle / numPoints;
    const piEstimate = ratio * 4;

    return piEstimate.toFixed(3); // Round to 3 decimal places
}

// Example usage:
const numPoints = 1000000; // Increase this number for better precision
const estimatedPi = estimatePi(numPoints);
console.log("Estimated value of Pi:", estimatedPi);

/* 15
Given a stream of elements too large to store in memory, pick a random element from the stream with uniform probability.
*/
function getRandomElementFromStream(stream) {
    let selected = null; 
    let count = 0; 

    for (const element of stream) {
        count++;
        // With probability 1/count, replace the selected element with the current element
        if (Math.floor(Math.random() * count) === 0) {
            selected = element;
        }
    }

    return selected;
}

// Example usage:
const stream = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Example stream
const randomElement = getRandomElementFromStream(stream);
console.log("Random element from the stream:", randomElement);


/* 16
You run an e-commerce website and want to record the last N order ids in a log. 
Implement a data structure to accomplish this, with the following API:
record(order_id): adds the order_id to the log
get_last(i): gets the ith last element from the log. i is guaranteed to be smaller than or equal to N.
*/

class OrderLog {
    constructor(size) {
        this.size = size;
        this.log = new Array(size).fill(null);
        this.currentIdx = 0;
    }

    record(orderId) {
        this.log[this.currentIdx] = orderId;
        this.currentIdx = (this.currentIdx + 1) % this.size; // Move to the next index in a circular manner
    }

    get_last(i) {
        // Calculate the index to retrieve the ith last element
        const idx = (this.currentIdx - i + this.size) % this.size;
        return this.log[idx];
    }
}

// Example usage:
const orderLog = new OrderLog(5); // Create an order log with size 5
orderLog.record(1001);
orderLog.record(1002);
orderLog.record(1003);
orderLog.record(1004);
orderLog.record(1005);

console.log(orderLog.get_last(1)); // Output: 1005 (last order id)
console.log(orderLog.get_last(2)); // Output: 1004 (second last order id)
console.log(orderLog.get_last(5)); // Output: 1001 (oldest order id)


/* 19
A builder is looking to build a row of N houses that can be of K different colors. 
He has a goal of minimizing cost while ensuring that no two neighboring houses are of the same color.
Given an N by K matrix where the nth row and kth column represents the cost to build the nth house with kth color, 
return the minimum cost which achieves this goal.
*/

function minCost(costs) {
    if (!costs || costs.length === 0) return 0;

    const n = costs.length;
    const k = costs[0].length;

    // Create a dp array to store the minimum cost up to each house
    const dp = new Array(n).fill(0).map(() => new Array(k).fill(0));

    // Initialize the first row of dp array with costs of the first house
    for (let i = 0; i < k; i++) {
        dp[0][i] = costs[0][i];
    }

    // Iterate through each house
    for (let i = 1; i < n; i++) {
        // Iterate through each color for the current house
        for (let j = 0; j < k; j++) {
            // Find the minimum cost for the current color by considering the costs of previous house colors
            dp[i][j] = costs[i][j] + Math.min(...dp[i - 1].filter((_, index) => index !== j));
        }
    }

    // Return the minimum cost of the last house
    return Math.min(...dp[n - 1]);
}

// Example usage:
const costs = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12]
];
console.log(minCost(costs)); // Output: 10

/* 21
Given an array of time intervals (start, end) for classroom lectures (possibly overlapping), 
find the minimum number of rooms required.
For example, given [(30, 75), (0, 50), (60, 150)], you should return 2.
*/

function minRooms(intervals) {
    if (intervals.length === 0) return 0;

    const startTimes = intervals.map(interval => interval[0]).sort((a, b) => a - b);
    const endTimes = intervals.map(interval => interval[1]).sort((a, b) => a - b);

    let roomsNeeded = 0;
    let minRoomsNeeded = 0;
    let startPtr = 0;
    let endPtr = 0;

    while (startPtr < startTimes.length) {
        if (startTimes[startPtr] < endTimes[endPtr]) {
            // A new lecture starts before another ends, so we need an additional room
            roomsNeeded++;
            minRoomsNeeded = Math.max(minRoomsNeeded, roomsNeeded);
            startPtr++;
        } else {
            // An ongoing lecture ends, so we release a room
            roomsNeeded--;
            endPtr++;
        }
    }

    return minRoomsNeeded;
}

// Example usage:
const intervals = [[30, 75], [0, 50], [60, 150]];
console.log(minRooms(intervals)); // Output: 2


/* 22
Given a dictionary of words and a string made up of those words (no spaces), return the original sentence in a list. 
If there is more than one possible reconstruction, return any of them. If there is no possible reconstruction, then return null.
For example, given the set of words 'quick', 'brown', 'the', 'fox', and the string "thequickbrownfox", you should return ['the', 'quick', 'brown', 'fox'].
Given the set of words 'bed', 'bath', 'bedbath', 'and', 'beyond', and the string "bedbathandbeyond", return either ['bed', 'bath', 'and', 'beyond] or ['bedbath', 'and', 'beyond'].
*/

function wordBreak(s, wordDict) {
    const wordBreakHelper = (s, wordDict, memo) => {
        if (memo.has(s)) return memo.get(s);
        if (s === '') return [];

        const result = [];
        for (const word of wordDict) {
            if (s.startsWith(word)) {
                const rest = wordBreakHelper(s.slice(word.length), wordDict, memo);
                if (rest !== null) {
                    result.push(word);
                    result.push(...rest);
                    memo.set(s, result);
                    return result;
                }
            }
        }
        memo.set(s, null);
        return null;
    };

    return wordBreakHelper(s, wordDict, new Map());
}

// Example usage:
const wordDict1 = new Set(['quick', 'brown', 'the', 'fox']);
const s1 = "thequickbrownfox";
console.log(wordBreak(s1, wordDict1)); // Output: ['the', 'quick', 'brown', 'fox']

const wordDict2 = new Set(['bed', 'bath', 'bedbath', 'and', 'beyond']);
const s2 = "bedbathandbeyond";
console.log(wordBreak(s2, wordDict2)); // Output: ['bed', 'bath', 'and', 'beyond'] or ['bedbath', 'and', 'beyond']

/* 23
You are given an M by N matrix consisting of booleans that represents a board. Each True boolean represents a wall. 
Each False boolean represents a tile you can walk on.
Given this matrix, a start coordinate, and an end coordinate, return the minimum number of steps required to reach the end coordinate from the start. 
If there is no possible path, then return null. You can move up, left, down, and right. 
You cannot move through walls. You cannot wrap around the edges of the board.
For example, given the following board:

[[f, f, f, f],
[t, t, f, t],
[f, f, f, f],
[f, f, f, f]]

and start = (3, 0) (bottom left) and end = (0, 0) (top left), the minimum number of steps required to reach the end is 7, 
since we would need to go through (1, 2) because there is a wall everywhere else on the second row.
*/

function minStepsToReachEnd(board, start, end) {
    const numRows = board.length;
    const numCols = board[0].length;

    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    // Queue to store the positions to be visited along with their steps
    const queue = [[start, 0]];
    // Set to store visited positions
    const visited = new Set();

    while (queue.length > 0) {
        const [currentPos, steps] = queue.shift();
        const [row, col] = currentPos;

        if (row === end[0] && col === end[1]) {
            return steps;
        }
        // Explore all four directions
        for (const [dRow, dCol] of directions) {
            const newRow = row + dRow;
            const newCol = col + dCol;
            // Check if the new position is within the board bounds and not a wall
            if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols && !board[newRow][newCol] && !visited.has(`${newRow},${newCol}`)) {
                queue.push([[newRow, newCol], steps + 1]);
                visited.add(`${newRow},${newCol}`);
            }
        }
    }

    return null;
}

// Example usage:
const board = [
    [false, false, false, false],
    [true, true, false, true],
    [false, false, false, false],
    [false, false, false, false]
];
const start = [3, 0];
const end = [0, 0];
console.log(minStepsToReachEnd(board, start, end)); // Output: 7

/* 26
Given a singly linked list and an integer k, remove the kth last element from the list. 
k is guaranteed to be smaller than the length of the list.
The list is very long, so making more than one pass is prohibitively expensive.
Do this in constant space and in one pass.
*/

class ListNode {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}

function removeKthLast(head, k) {
    const dummy = new ListNode();
    dummy.next = head;
    let fast = dummy;
    let slow = dummy;

    // Move fast pointer k steps ahead
    for (let i = 0; i < k; i++) {
        fast = fast.next;
    }

    // Move both pointers until fast reaches the end
    while (fast.next) {
        fast = fast.next;
        slow = slow.next;
    }

    // Remove the kth last element
    slow.next = slow.next.next;

    return dummy.next;
}

/* 27
Given a string of round, curly, and square open and closing brackets, 
return whether the brackets are balanced (well-formed).
For example, given the string "([])[]({})", you should return true.
Given the string "([)]" or "((()", you should return false.
*/

function isValid(s) {
    const stack = [];
    const pairs = {
        '(': ')',
        '[': ']',
        '{': '}'
    };

    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (char in pairs) {
            stack.push(char); // Push opening brackets onto the stack
        } else {
            // Check if the stack is empty or if the top element doesn't match the current closing bracket
            if (stack.length === 0 || pairs[stack.pop()] !== char) {
                return false;
            }
        }
    }

    // Check if there are any remaining brackets in the stack
    return stack.length === 0;
}

/* 28
Write an algorithm to justify text. Given a sequence of words and an integer line length k, 
return a list of strings which represents each line, fully justified.
More specifically, you should have as many words as possible in each line. There should be at least one space between each word. 
Pad extra spaces when necessary so that each line has exactly length k. Spaces should be distributed as equally as possible, 
with the extra spaces, if any, distributed starting from the left.
If you can only fit one word on a line, then you should pad the right-hand side with spaces.
Each word is guaranteed not to be longer than k.
For example, given the list of words ["the", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog"] and k = 16, you should return the following:

["the  quick brown", # 1 extra space on the left
"fox  jumps  over", # 2 extra spaces distributed evenly
"the   lazy   dog"] # 4 extra spaces distributed evenly
*/
function justifyText(words, m) {
    const result = [];
    let currentLine = [];
    let currentLength = 0;

    for (const word of words) {
        if (currentLength + word.length + currentLine.length > m) {
            const spacesNeeded = m - currentLength;
            if (currentLine.length === 1) {
                const line = currentLine[0] + ' '.repeat(spacesNeeded);
                result.push(line);
            } else {
                const numGaps = currentLine.length - 1;
                const spacesPerGap = Math.floor(spacesNeeded / numGaps);
                const extraSpaces = spacesNeeded % numGaps;
                let line = '';
                for (let i = 0; i < numGaps; i++) {
                    line += currentLine[i] + ' '.repeat(spacesPerGap + (i < extraSpaces ? 1 : 0));
                }
                line += currentLine[currentLine.length - 1];
                result.push(line);
            }
            currentLine = [];
            currentLength = 0;
        }

        currentLine.push(word);
        currentLength += word.length;
    }

    const lastLine = currentLine.join(' ') + ' '.repeat(m - currentLength - currentLine.length + 1);
    result.push(lastLine);

    return result;
}

// Example usage:
const words = ["the", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog"];
const m = 16;
console.log(justifyText(words, m));

/* 29
Run-length encoding is a fast and simple method of encoding strings. 
The basic idea is to represent repeated successive characters as a single count and character. 
For example, the string "AAAABBBCCDAA" would be encoded as "4A3B2C1D2A".
Implement run-length encoding and decoding. You can assume the string to be encoded have no digits and 
consists solely of alphabetic characters. You can assume the string to be decoded is valid.
*/

function encode(s) {
    let encoded = '';
    let count = 1;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === s[i + 1]) {
            count++;
        } else {
            encoded += count + s[i];
            count = 1;
        }
    }

    return encoded;
}

function decode(s) {
    let decoded = '';
    let count = '';

    for (let i = 0; i < s.length; i++) {
        if (!isNaN(s[i])) {
            count += s[i];
        } else {
            decoded += s[i].repeat(parseInt(count));
            count = '';
        }
    }

    return decoded;
}

// Example usage:
const input = "AAAABBBCCDAA";
const encoded = encode(input);
console.log("Encoded:", encoded); // Output: "4A3B2C1D2A"
const decoded = decode(encoded);
console.log("Decoded:", decoded); // Output: "AAAABBBCCDAA"

/* 30
You are given an array of non-negative integers that represents a two-dimensional elevation map where 
each element is unit-width wall and the integer is the height. 
Suppose it will rain and all spots between two walls get filled up.
Compute how many units of water remain trapped on the map in O(N) time and O(1) space.
For example, given the input [2, 1, 2], we can hold 1 unit of water in the middle.
Given the input [3, 0, 1, 3, 0, 5], we can hold 3 units in the first index, 2 in the second, and 3 in the fourth index 
(we cannot hold 5 since it would run off to the left), so we can trap 8 units of water.
*/

function trapWater(heights) {
    let left = 0;
    let right = heights.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let trappedWater = 0;

    while (left < right) {
        if (heights[left] < heights[right]) {
            if (heights[left] >= leftMax) {
                leftMax = heights[left];
            } else {
                trappedWater += leftMax - heights[left];
            }
            left++;
        } else {
            if (heights[right] >= rightMax) {
                rightMax = heights[right];
            } else {
                trappedWater += rightMax - heights[right];
            }
            right--;
        }
    }

    return trappedWater;
}

// Example usage:
const heights1 = [2, 1, 2];
console.log(trapWater(heights1)); // Output: 1

const heights2 = [3, 0, 1, 3, 0, 5];
console.log(trapWater(heights2)); // Output: 8

/* 31
The edit distance between two strings refers to the minimum number of character insertions, deletions, 
and substitutions required to change one string to the other. For example, the edit distance between “kitten” and “sitting” is three: 
substitute the “k” for “s”, substitute the “e” for “i”, and append a “g”.
Given two strings, compute the edit distance between them.
*/

function editDistance(string1, string2) {
    const m = string1.length;
    const n = string2.length;

    // Create a 2D array to store the edit distances
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    // Initialize the first row and column with the distance from an empty string
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i;
    }
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
    }

    // Fill the DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (string1[i - 1] === string2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j],      // Deletion
                    dp[i][j - 1],      // Insertion
                    dp[i - 1][j - 1]   // Substitution
                );
            }
        }
    }

    // The value at the bottom-right corner of the DP table contains the edit distance
    return dp[m][n];
}

// Example usage:
const string1 = "kitten";
const string2 = "sitting";
console.log(editDistance(string1, string2)); // Output: 3

/* 34
Given a string, find the palindrome that can be made by inserting the fewest number of characters as possible anywhere in the word. 
If there is more than one palindrome of minimum length that can be made, return the lexicographically earliest one (the first one alphabetically).
For example, given the string "race", you should return "ecarace", since we can add three letters to it (which is the smallest amount to make a palindrome). 
There are seven other palindromes that can be made from "race" by adding three letters, but "ecarace" comes first alphabetically.
As another example, given the string "google", you should return "elgoogle".
*/

function longestPalindromicSubsequence(s) {
    const n = s.length;
    const dp = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        dp[i][i] = 1;
    }

    for (let length = 2; length <= n; length++) {
        for (let i = 0; i < n - length + 1; i++) {
            const j = i + length - 1;
            if (s[i] === s[j]) {
                dp[i][j] = 2 + (dp[i + 1][j - 1] || 0);
            } else {
                dp[i][j] = Math.max(dp[i + 1][j] || 0, dp[i][j - 1] || 0);
            }
        }
    }

    return dp[0][n - 1];
}

function shortestPalindrome(s) {
    const longestSubsequenceLength = longestPalindromicSubsequence(s);
    const remainingChars = s.length - longestSubsequenceLength;
    return [...s.split('').reverse().join('').slice(0, remainingChars), s].join('');
}

// Example usage:
console.log(shortestPalindrome("race"));   // Output: "ecarace"
console.log(shortestPalindrome("google")); // Output: "elgoogle"

/* 35
Given an array of strictly the characters 'R', 'G', and 'B', segregate the values of the array so that all the Rs come first, 
the Gs come second, and the Bs come last. You can only swap elements of the array.
Do this in linear time and in-place.
For example, given the array ['G', 'B', 'R', 'R', 'B', 'R', 'G'], it should become ['R', 'R', 'R', 'G', 'G', 'B', 'B'].
*/
/*
THE DUTCH NATIONAL FLAG ALGORITHM, also known as 3-way partitioning, is an algorithm designed to sort an array containing three distinct values into three partitions according to a specified order.
The basic idea of the algorithm is to partition the array into three sections: one for elements smaller than a given value (e.g., 'R'), 
                                                                               one for elements equal to that value (e.g., 'G'), 
                                                                               and one for elements larger than that value (e.g., 'B'). 
This is achieved by maintaining three pointers:
A pointer low pointing to the boundary between the 'R' and 'G' sections.
A pointer mid pointing to the current element being processed.
A pointer high pointing to the boundary between the 'G' and 'B' sections.

The Dutch National Flag algorithm is efficient because it only requires a single pass through the array, 
making it a linear-time algorithm (O(n)) with respect to the size of the array.
Additionally, it is an in-place algorithm, meaning it does not require additional memory beyond the input array. 
This makes it particularly useful for sorting arrays with a small number of distinct values.
*/

function dutchNationalFlag(arr) {
    let low = 0;
    let mid = 0;
    let high = arr.length - 1;

    while (mid <= high) {
        if (arr[mid] === 'R') {
            [arr[low], arr[mid]] = [arr[mid], arr[low]];
            low++;
            mid++;
        } else if (arr[mid] === 'G') {
            mid++;
        } else {
            [arr[mid], arr[high]] = [arr[high], arr[mid]];
            high--;
        }
    }
}

// Example usage:
const arr = ['G', 'B', 'R', 'R', 'B', 'R', 'G'];
dutchNationalFlag(arr);
console.log(arr); // Output: ['R', 'R', 'R', 'G', 'G', 'B', 'B']

/* 37
The power set of a set is the set of all its subsets. Write a function that, given a set, generates its power set.
For example, given the set {1, 2, 3}, it should return {{}, {1}, {2}, {3}, {1, 2}, {1, 3}, {2, 3}, {1, 2, 3}}.
You may also use a list or array to represent a set.
*/

function generatePowerSet(nums) {
    const powerSet = [[]];

    for (const num of nums) {
        const subsetsWithNum = [];
        for (const subset of powerSet) {
            subsetsWithNum.push([...subset, num]);
        }
        powerSet.push(...subsetsWithNum);
    }

    return powerSet;
}

// Example usage:
const set = [1, 2, 3];
console.log(generatePowerSet(set));

/* 41
Given an unordered list of flights taken by someone, each represented as (origin, destination) pairs, and a starting airport, 
compute the person's itinerary. If no such itinerary exists, return null. If there are multiple possible itineraries, 
return the lexicographically smallest one. All flights must be used in the itinerary.
For example, given the list of flights [('SFO', 'HKO'), ('YYZ', 'SFO'), ('YUL', 'YYZ'), ('HKO', 'ORD')] and starting airport 'YUL', 
you should return the list ['YUL', 'YYZ', 'SFO', 'HKO', 'ORD'].
Given the list of flights [('SFO', 'COM'), ('COM', 'YYZ')] and starting airport 'COM', you should return null.
Given the list of flights [('A', 'B'), ('A', 'C'), ('B', 'C'), ('C', 'A')] and starting airport 'A', you should return the list ['A', 'B', 'C', 'A', 'C']
even though ['A', 'C', 'A', 'B', 'C'] is also a valid itinerary. However, the first one is lexicographically smaller.
*/
/* DFS FUNCTION
DFS stands for Depth-First Search. It's an algorithm used for traversing or searching tree or graph data structures.
DFS explores as far as possible along each branch before backtracking. It starts at a selected node (often referred to as the "root" node) 
and explores as far as possible along each branch before backtracking.
*/

function findItinerary(flights, start) {
    const graph = {};
    for (const [src, dst] of flights) {
        if (!(src in graph)) {
            graph[src] = [];
        }
        graph[src].push(dst);
    }

    for (const src in graph) {
        graph[src].sort((a, b) => b.localeCompare(a)); // Sort destinations lexicographically in reverse order
    }

    const itinerary = [];

    function dfs(node) {
        while (graph[node] && graph[node].length > 0) {
            const nextNode = graph[node].pop();
            dfs(nextNode);
        }
        itinerary.push(node);
    }

    dfs(start);

    return itinerary.length === flights.length + 1 ? itinerary.reverse() : null;
}

// Example usage:
const flights1 = [['SFO', 'HKO'], ['YYZ', 'SFO'], ['YUL', 'YYZ'], ['HKO', 'ORD']];
const start1 = 'YUL';
console.log(findItinerary(flights1, start1)); // Output: ['YUL', 'YYZ', 'SFO', 'HKO', 'ORD']

const flights2 = [['SFO', 'COM'], ['COM', 'YYZ']];
const start2 = 'COM';
console.log(findItinerary(flights2, start2)); // Output: null

const flights3 = [['A', 'B'], ['A', 'C'], ['B', 'C'], ['C', 'A']];
const start3 = 'A';
console.log(findItinerary(flights3, start3)); // Output: ['A', 'B', 'C', 'A', 'C']

/* 43
Implement a stack that has the following methods:
push(val), which pushes an element onto the stack
pop(), which pops off and returns the topmost element of the stack. If there are no elements in the stack, then it should throw an error or return null.
max(), which returns the maximum value in the stack currently. If there are no elements in the stack, then it should throw an error or return null.
Each method should run in constant time.
*/

class Node {
    constructor(val, maxSoFar) {
        this.val = val;
        this.maxSoFar = maxSoFar;
        this.prev = null;
    }
}

class MaxStack {
    constructor() {
        this.top = null;
    }

    push(val) {
        if (!this.top) {
            this.top = new Node(val, val);
        } else {
            const maxSoFar = Math.max(val, this.top.maxSoFar);
            const newNode = new Node(val, maxSoFar);
            newNode.prev = this.top;
            this.top = newNode;
        }
    }

    pop() {
        if (!this.top) {
            throw new Error("Stack is empty");
        }
        const val = this.top.val;
        this.top = this.top.prev;
        return val;
    }

    max() {
        if (!this.top) {
            throw new Error("Stack is empty");
        }
        return this.top.maxSoFar;
    }
}

// Example usage:
const stack = new MaxStack();
stack.push(5);
stack.push(3);
stack.push(7);
console.log(stack.max()); // Output: 7
console.log(stack.pop()); // Output: 7
console.log(stack.max()); // Output: 5
