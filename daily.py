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

# 9
# Given a list of integers, write a function that returns the largest sum of non-adjacent numbers. Numbers can be 0 or negative.
# For example, [2, 4, 6, 2, 5] should return 13, since we pick 2, 6, and 5. [5, 1, 1, 5] should return 10, since we pick 5 and 5.
#

def max_non_adjacent_sum(arr):
    if len(arr) == 0:
        return 0
    if len(arr) == 1:
        return max(0, arr[0])

    inclusive = arr[0]
    exclusive = 0

    for i in range(1, len(arr)):
        temp = inclusive
        inclusive = max(inclusive, exclusive + arr[i])
        exclusive = temp

    return max(inclusive, exclusive)

# Example usage:
print(max_non_adjacent_sum([2, 4, 6, 2, 5]))  # Output: 13
print(max_non_adjacent_sum([5, 1, 1, 5]))     # Output: 10

# 10
# Implement a job scheduler which takes in a function f and an integer n, and calls f after n milliseconds.
# 

import time

def schedule_job(f, n):
    def delayed_execution():
        time.sleep(n / 1000)  # Convert milliseconds to seconds
        f()

    delayed_execution()

# Example usage:
def my_function():
    print("Job executed!")

schedule_job(my_function, 3000)  # Call my_function after 3000 milliseconds (3 seconds)

# 12
# There exists a staircase with N steps, and you can climb up either 1 or 2 steps at a time. Given N, 
# write a function that returns the number of unique ways you can climb the staircase. The order of the steps matters.
# For example, if N is 4, then there are 5 unique ways:

# 1, 1, 1, 1
# 2, 1, 1
# 1, 2, 1
# 1, 1, 2
# 2, 2

# What if, instead of being able to climb 1 or 2 steps at a time, you could climb any number from a set of positive integers X? 
# For example, if X = {1, 3, 5}, you could climb 1, 3, or 5 steps at a time.
#

def count_ways(N, X):
    dp = [0] * (N + 1)
    dp[0] = 1

    for i in range(1, N + 1):
        for step in X:
            if i - step >= 0:
                dp[i] += dp[i - step]

    return dp[N]

# Example usage:
print(count_ways(4, [1, 2]))  # Output: 5
print(count_ways(4, [1, 3, 5]))  # Output: 3


# 13
# Given an integer k and a string s, find the length of the longest substring that contains at most k distinct characters.
# For example, given s = "abcba" and k = 2, the longest substring with k distinct characters is "bcb".
# 

def longest_substring(s, k):
    max_length = 0
    char_count = {}
    left = 0

    for right in range(len(s)):
        right_char = s[right]
        char_count[right_char] = char_count.get(right_char, 0) + 1

        while len(char_count) > k:
            left_char = s[left]
            char_count[left_char] -= 1
            if char_count[left_char] == 0:
                del char_count[left_char]
            left += 1

        max_length = max(max_length, right - left + 1)

    return max_length

# Example usage:
s = "abcba"
k = 2
print(longest_substring(s, k))  # Output: 3 (for substring "bcb")

# 14
# The area of a circle is defined as πr^2. Estimate π to 3 decimal places using a Monte Carlo method.
# Hint: The basic equation of a circle is x2 + y2 = r2.
# 
import random

def estimate_pi(num_points):
    inside_circle = 0

    # Generate random points and count how many fall inside the circle
    for _ in range(num_points):
        x = random.uniform(-1, 1)  # Random x coordinate between -1 and 1
        y = random.uniform(-1, 1)  # Random y coordinate between -1 and 1

        # Check if the point falls inside the circle (x^2 + y^2 <= 1)
        if x**2 + y**2 <= 1:
            inside_circle += 1

    # Estimate pi based on the ratio of points inside the circle to total points
    ratio = inside_circle / num_points
    pi_estimate = ratio * 4

    return pi_estimate

# Example usage:
num_points = 1000000  # Increase this number for better precision
estimated_pi = estimate_pi(num_points)
print("Estimated value of Pi:", round(estimated_pi, 3))

# 15
# Given a stream of elements too large to store in memory, pick a random element from the stream with uniform probability.
# 

import random

def get_random_element_from_stream(stream):
    selected = None
    count = 0

    for element in stream:
        count += 1
        # With probability 1/count, replace the selected element with the current element
        if random.randint(1, count) == 1:
            selected = element

    return selected

# Example usage:
stream = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]  # Example stream
random_element = get_random_element_from_stream(stream)
print("Random element from the stream:", random_element)


# 16
# You run an e-commerce website and want to record the last N order ids in a log. 
# Implement a data structure to accomplish this, with the following API:
# record(order_id): adds the order_id to the log
# get_last(i): gets the ith last element from the log. i is guaranteed to be smaller than or equal to N.
#

# 19
# A builder is looking to build a row of N houses that can be of K different colors. 
# He has a goal of minimizing cost while ensuring that no two neighboring houses are of the same color.
# Given an N by K matrix where the nth row and kth column represents the cost to build the nth house with kth color, 
# return the minimum cost which achieves this goal.
#

def min_cost(costs):
    if not costs or len(costs) == 0:
        return 0
    
    n = len(costs)
    k = len(costs[0])
    
    # Create a dp array to store the minimum cost up to each house
    dp = [[0] * k for _ in range(n)]
    
    # Initialize the first row of dp array with costs of the first house
    dp[0] = costs[0]
    
    # Iterate through each house
    for i in range(1, n):
        # Iterate through each color for the current house
        for j in range(k):
            # Find the minimum cost for the current color by considering the costs of previous house colors
            dp[i][j] = costs[i][j] + min(dp[i-1][:j] + dp[i-1][j+1:])
    
    # Return the minimum cost of the last house
    return min(dp[n-1])

# Example usage:
costs = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12]
]
print(min_cost(costs))  # Output: 10

# 21
# Given an array of time intervals (start, end) for classroom lectures (possibly overlapping), 
# find the minimum number of rooms required.
# For example, given [(30, 75), (0, 50), (60, 150)], you should return 2.
# 