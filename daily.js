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