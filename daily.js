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
const k = 17
console.log(pairsWithSum(nums, k))

/* 2
Given an array of integers, return a new array such that each element at index i of the new array is the product of all the numbers in the original array except the one at i.
For example, if our input was [1, 2, 3, 4, 5], the expected output would be [120, 60, 40, 30, 24]. If our input was [3, 2, 1], the expected output would be [2, 3, 6].
*/

function productExceptSelf(nums) {
    const result = new Array(n);
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

/* 14
The area of a circle is defined as πr^2. Estimate π to 3 decimal places using a Monte Carlo method.
Hint: The basic equation of a circle is x2 + y2 = r2.
*/

/* 15
Given a stream of elements too large to store in memory, pick a random element from the stream with uniform probability.
*/

/* 16
You run an e-commerce website and want to record the last N order ids in a log. 
Implement a data structure to accomplish this, with the following API:
record(order_id): adds the order_id to the log
get_last(i): gets the ith last element from the log. i is guaranteed to be smaller than or equal to N.
*/