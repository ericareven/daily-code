# 1 
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

# 2
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

# 7
# Given the mapping a = 1, b = 2, ... z = 26, and an encoded message, count the number of ways it can be decoded.
# For example, the message '111' would give 3, since it could be decoded as 'aaa', 'ka', and 'ak'.
# You can assume that the messages are decodable. For example, '001' is not allowed.
# 

def num_decodings(message):
    n = len(message)
    if n == 0:
        return 0
    
    dp = [0] * (n + 1)
    dp[0] = 1
    dp[1] = 1 if message[0] != '0' else 0
    
    for i in range(2, n + 1):
        one_digit = int(message[i - 1:i])
        two_digits = int(message[i - 2:i])
        
        if one_digit >= 1:
            dp[i] += dp[i - 1]
            
        if 10 <= two_digits <= 26:
            dp[i] += dp[i - 2]
    
    return dp[n]

# Example usage:
message = "111"
print(num_decodings(message))  # Output should be 3


# 8
# A unival tree (which stands for "universal value") is a tree where all nodes under it have the same value.
# Given the root to a binary tree, count the number of unival subtrees.
# For example, the following tree has 5 unival subtrees:

#    0
#   / \
#  1   0
#     / \
#    1   0
#   / \
#  1   1

# 

# 9
# Given a list of integers, write a function that returns the largest sum of non-adjacent numbers. Numbers can be 0 or negative.
# For example, [2, 4, 6, 2, 5] should return 13, since we pick 2, 6, and 5. [5, 1, 1, 5] should return 10, since we pick 5 and 5.
#

# 10
# Implement a job scheduler which takes in a function f and an integer n, and calls f after n milliseconds.
# 

# 11
# Implement an autocomplete system. That is, given a query string s and a set of all possible query strings, 
# return all strings in the set that have s as a prefix.
# For example, given the query string de and the set of strings [dog, deer, deal], return [deer, deal].
# Hint: Try preprocessing the dictionary into a more efficient data structure to speed up queries.
# 