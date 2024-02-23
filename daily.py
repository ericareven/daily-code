#1 
# Given a list of numbers and a number k, return whether any two numbers from the list add up to k.
# For example, given [10, 15, 3, 7] and k of 17, return true since 10 + 7 is 17.
#

def pairs_with_sum(nums, k):
    seen = set()
    for num in nums:
        complement = k - num
        if complement in seen:
            return True
        seen.add(num)
    return False

# Example
nums = [10, 15, 3, 7]
k = 17
print(pairs_with_sum(nums, k))  # Output: True

#2
# Given an array of integers, return a new array such that each element at index i of the new array is the product of all the numbers in the original array except the one at i.
# For example, if our input was [1, 2, 3, 4, 5], the expected output would be [120, 60, 40, 30, 24]. If our input was [3, 2, 1], the expected output would be [2, 3, 6].
#

def product_except_self(nums):
    n = len(nums)
    result = [1] * n
    left_product = 1
    right_product = 1

    # Calculate the product of all elements to the left of each index
    for i in range(n):
        result[i] *= left_product
        left_product *= nums[i]

    # Calculate the product of all elements to the right of each index
    for i in range(n - 1, -1, -1):
        result[i] *= right_product
        right_product *= nums[i]

    return result

# Example
nums1 = [1, 2, 3, 4, 5]
print(product_except_self(nums1))  # Output: [120, 60, 40, 30, 24]

nums2 = [3, 2, 1]
print(product_except_self(nums2))  # Output: [2, 3, 6]

# 4
# Given an array of integers, find the first missing positive integer in linear time and constant space. 
# In other words, find the lowest positive integer that does not exist in the array. 
# The array can contain duplicates and negative numbers as well.
# For example, the input [3, 4, -1, 1] should give 2. The input [1, 2, 0] should give 3.
#

def first_missing_positive(nums):
    n = len(nums)
    
    # Rearrange the array: place each positive integer at its respective index
    for i in range(n):
        while 0 < nums[i] <= n and nums[nums[i] - 1] != nums[i]:
            nums[nums[i] - 1], nums[i] = nums[i], nums[nums[i] - 1]
    
    # Iterate through the rearranged array to find the first missing positive integer
    for i in range(n):
        if nums[i] != i + 1:
            return i + 1
    
    # If all positive integers from 1 to n are present, return n + 1
    return n + 1

# Test cases
print(first_missing_positive([3, 4, -1, 1]))  # Output: 2
print(first_missing_positive([1, 2, 0]))     # Output: 3

# 5 SEE JS FOR NOTES
# cons(a, b) constructs a pair, and car(pair) and cdr(pair) returns the first and last element of that pair. 
# For example, car(cons(3, 4)) returns 3, and cdr(cons(3, 4)) returns 4.
# Given this implementation of cons:
# def cons(a, b):
#     def pair(f):
#         return f(a, b)
#     return pair
# Implement car and cdr.
#

def cons(a, b):
    def pair(f):
        return f(a, b)
    return pair

def car(pair):
    def get_first(a, b):
        return a
    return pair(get_first)

def cdr(pair):
    def get_last(a, b):
        return b
    return pair(get_last)

# Example usage:
print(car(cons(3, 4)))  # Output: 3
print(cdr(cons(3, 4)))  # Output: 4
