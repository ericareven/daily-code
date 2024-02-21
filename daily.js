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
