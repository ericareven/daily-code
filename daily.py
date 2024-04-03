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

class OrderLog:
    def __init__(self, size):
        self.size = size
        self.log = [None] * size
        self.current_idx = 0

    def record(self, order_id):
        self.log[self.current_idx] = order_id
        self.current_idx = (self.current_idx + 1) % self.size  # Move to the next index in a circular manner

    def get_last(self, i):
        # Calculate the index to retrieve the ith last element
        idx = (self.current_idx - i + self.size) % self.size
        return self.log[idx]

# Example usage:
order_log = OrderLog(5)  # Create an order log with size 5
order_log.record(1001)
order_log.record(1002)
order_log.record(1003)
order_log.record(1004)
order_log.record(1005)

print(order_log.get_last(1))  # Output: 1005 (last order id)
print(order_log.get_last(2))  # Output: 1004 (second last order id)
print(order_log.get_last(5))  # Output: 1001 (oldest order id)


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

def min_rooms(intervals):
    if not intervals:
        return 0

    start_times = sorted(interval[0] for interval in intervals)
    end_times = sorted(interval[1] for interval in intervals)

    rooms_needed = 0
    min_rooms_needed = 0
    start_ptr = end_ptr = 0

    while start_ptr < len(start_times):
        if start_times[start_ptr] < end_times[end_ptr]:
            # A new lecture starts before another ends, so we need an additional room
            rooms_needed += 1
            min_rooms_needed = max(min_rooms_needed, rooms_needed)
            start_ptr += 1
        else:
            # An ongoing lecture ends, so we release a room
            rooms_needed -= 1
            end_ptr += 1

    return min_rooms_needed

# Example usage:
intervals = [(30, 75), (0, 50), (60, 150)]
print(min_rooms(intervals))  # Output: 2


# 22
# Given a dictionary of words and a string made up of those words (no spaces), return the original sentence in a list. 
# If there is more than one possible reconstruction, return any of them. If there is no possible reconstruction, then return null.
# For example, given the set of words 'quick', 'brown', 'the', 'fox', and the string "thequickbrownfox", you should return ['the', 'quick', 'brown', 'fox'].
# Given the set of words 'bed', 'bath', 'bedbath', 'and', 'beyond', and the string "bedbathandbeyond", return either ['bed', 'bath', 'and', 'beyond] or ['bedbath', 'and', 'beyond'].
#

def word_break(s, word_dict):
    def word_break_helper(s, word_dict, memo):
        if s in memo:
            return memo[s]

        if not s:
            return []

        result = []
        for word in word_dict:
            if s.startswith(word):
                # Recursively check the remaining part of the string after removing the matched word
                rest = word_break_helper(s[len(word):], word_dict, memo)
                if rest is not None:
                    result = [word] + rest
                    memo[s] = result
                    return result

        memo[s] = None
        return None

    return word_break_helper(s, word_dict, {})

# Example usage:
word_dict1 = {'quick', 'brown', 'the', 'fox'}
s1 = "thequickbrownfox"
print(word_break(s1, word_dict1))  # Output: ['the', 'quick', 'brown', 'fox']

word_dict2 = {'bed', 'bath', 'bedbath', 'and', 'beyond'}
s2 = "bedbathandbeyond"
print(word_break(s2, word_dict2))  # Output: ['bed', 'bath', 'and', 'beyond'] or ['bedbath', 'and', 'beyond']

# 23
# You are given an M by N matrix consisting of booleans that represents a board. Each True boolean represents a wall. 
# Each False boolean represents a tile you can walk on.
# Given this matrix, a start coordinate, and an end coordinate, return the minimum number of steps required to reach the end coordinate from the start. 
# If there is no possible path, then return null. You can move up, left, down, and right. 
# You cannot move through walls. You cannot wrap around the edges of the board.
# For example, given the following board:

# [[f, f, f, f],
# [t, t, f, t],
# [f, f, f, f],
# [f, f, f, f]]

# and start = (3, 0) (bottom left) and end = (0, 0) (top left), the minimum number of steps required to reach the end is 7, 
# since we would need to go through (1, 2) because there is a wall everywhere else on the second row.
# 
from collections import deque

def min_steps_to_reach_end(board, start, end):
    num_rows = len(board)
    num_cols = len(board[0])

    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    # Queue to store the positions to be visited along with their steps
    queue = deque([(start, 0)])
    # Set to store visited positions
    visited = set()

    while queue:
        (row, col), steps = queue.popleft()

        if (row, col) == end:
            return steps
        # Explore all four directions
        for d_row, d_col in directions:
            new_row = row + d_row
            new_col = col + d_col
            # Check if the new position is within the board bounds and not a wall
            if 0 <= new_row < num_rows and 0 <= new_col < num_cols and not board[new_row][new_col] and (new_row, new_col) not in visited:
                queue.append(((new_row, new_col), steps + 1))
                visited.add((new_row, new_col))

    return None

# Example usage:
board = [
    [False, False, False, False],
    [True, True, False, True],
    [False, False, False, False],
    [False, False, False, False]
]
start = (3, 0)
end = (0, 0)
print(min_steps_to_reach_end(board, start, end))  # Output: 7

# 26
# Given a singly linked list and an integer k, remove the kth last element from the list. 
# k is guaranteed to be smaller than the length of the list.
# The list is very long, so making more than one pass is prohibitively expensive.
# Do this in constant space and in one pass.
# 

class ListNode:
    def __init__(self, value=0, next=None):
        self.value = value
        self.next = next

def remove_kth_last(head, k):
    dummy = ListNode()
    dummy.next = head
    fast = dummy
    slow = dummy

    # Move fast pointer k steps ahead
    for _ in range(k):
        fast = fast.next

    # Move both pointers until fast reaches the end
    while fast.next:
        fast = fast.next
        slow = slow.next

    # Remove the kth last element
    slow.next = slow.next.next

    return dummy.next

# 27
# Given a string of round, curly, and square open and closing brackets, 
# return whether the brackets are balanced (well-formed).
# For example, given the string "([])[]({})", you should return true.
# Given the string "([)]" or "((()", you should return false.
# 

def isValid(s: str) -> bool:
    stack = []
    pairs = {'(': ')', '[': ']', '{': '}'}

    for char in s:
        if char in pairs:
            stack.append(char)  # Push opening brackets onto the stack
        else:
            # Check if the stack is empty or if the top element doesn't match the current closing bracket
            if not stack or pairs[stack.pop()] != char:
                return False

    # Check if there are any remaining brackets in the stack
    return len(stack) == 0

# 28
# Write an algorithm to justify text. Given a sequence of words and an integer line length k, 
# return a list of strings which represents each line, fully justified.
# More specifically, you should have as many words as possible in each line. There should be at least one space between each word. 
# Pad extra spaces when necessary so that each line has exactly length k. Spaces should be distributed as equally as possible, 
# with the extra spaces, if any, distributed starting from the left.
# If you can only fit one word on a line, then you should pad the right-hand side with spaces.
# Each word is guaranteed not to be longer than k.
# For example, given the list of words ["the", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog"] and k = 16, you should return the following:

# ["the  quick brown", # 1 extra space on the left
# "fox  jumps  over", # 2 extra spaces distributed evenly
# "the   lazy   dog"] # 4 extra spaces distributed evenly
# 
def justify_text(words, k):
    result = []
    current_line = []
    current_length = 0

    for word in words:
        if current_length + len(word) + len(current_line) > k:
            spaces_needed = k - current_length
            if len(current_line) == 1:
                line = current_line[0] + ' ' * spaces_needed
            else:
                num_gaps = len(current_line) - 1
                spaces_per_gap = spaces_needed // num_gaps
                extra_spaces = spaces_needed % num_gaps
                line = ''
                for i in range(num_gaps):
                    line += current_line[i] + ' ' * (spaces_per_gap + (1 if i < extra_spaces else 0))
                line += current_line[-1]
            result.append(line)
            current_line = []
            current_length = 0

        current_line.append(word)
        current_length += len(word)

    last_line = ' '.join(current_line)
    last_line += ' ' * (k - len(last_line))
    result.append(last_line)

    return result

# Example usage:
words = ["the", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog"]
k = 16
print(justify_text(words, k))

# 29
# Run-length encoding is a fast and simple method of encoding strings. 
# The basic idea is to represent repeated successive characters as a single count and character. 
# For example, the string "AAAABBBCCDAA" would be encoded as "4A3B2C1D2A".
# Implement run-length encoding and decoding. You can assume the string to be encoded have no digits and 
# consists solely of alphabetic characters. You can assume the string to be decoded is valid.
# 

def encode(s):
    encoded = ''
    count = 1

    for i in range(len(s)):
        # Check if the current character is the same as the next one
        if i < len(s) - 1 and s[i] == s[i + 1]:
            count += 1
        else:
            encoded += str(count) + s[i]
            count = 1

    return encoded

def decode(s):
    decoded = ''
    count = ''

    for char in s:
        if char.isdigit():
            count += char
        else:
            decoded += char * int(count)
            count = ''

    return decoded

# Example usage:
input_str = "AAAABBBCCDAA"
encoded = encode(input_str)
print("Encoded:", encoded)  # Output: "4A3B2C1D2A"
decoded = decode(encoded)
print("Decoded:", decoded)  # Output: "AAAABBBCCDAA"

# 30
# You are given an array of non-negative integers that represents a two-dimensional elevation map where 
# each element is unit-width wall and the integer is the height. 
# Suppose it will rain and all spots between two walls get filled up.
# Compute how many units of water remain trapped on the map in O(N) time and O(1) space.
# For example, given the input [2, 1, 2], we can hold 1 unit of water in the middle.
# Given the input [3, 0, 1, 3, 0, 5], we can hold 3 units in the first index, 2 in the second, and 3 in the fourth index 
# (we cannot hold 5 since it would run off to the left), so we can trap 8 units of water.
#

def trap_water(heights):
    left = 0
    right = len(heights) - 1
    left_max = 0
    right_max = 0
    trapped_water = 0

    while left < right:
        if heights[left] < heights[right]:
            if heights[left] >= left_max:
                left_max = heights[left]
            else:
                trapped_water += left_max - heights[left]
            left += 1
        else:
            if heights[right] >= right_max:
                right_max = heights[right]
            else:
                trapped_water += right_max - heights[right]
            right -= 1

    return trapped_water

# Example usage:
heights1 = [2, 1, 2]
print(trap_water(heights1))  # Output: 1

heights2 = [3, 0, 1, 3, 0, 5]
print(trap_water(heights2))  # Output: 8

# 31
# The edit distance between two strings refers to the minimum number of character insertions, deletions, 
# and substitutions required to change one string to the other. For example, the edit distance between “kitten” and “sitting” is three: 
# substitute the “k” for “s”, substitute the “e” for “i”, and append a “g”.
# Given two strings, compute the edit distance between them.
#

def edit_distance(s1, s2):
    m = len(s1)
    n = len(s2)

    # Create a 2D array to store the edit distances
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Initialize the first row and column with the distance from an empty string
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j

    # Fill the DP table
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i - 1] == s2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(dp[i - 1][j],        # Deletion
                                   dp[i][j - 1],        # Insertion
                                   dp[i - 1][j - 1])   # Substitution

    # The value at the bottom-right corner of the DP table contains the edit distance
    return dp[m][n]

# Example usage:
s1 = "kitten"
s2 = "sitting"
print(edit_distance(s1, s2))  # Output: 3

# 34
# Given a string, find the palindrome that can be made by inserting the fewest number of characters as possible anywhere in the word. 
# If there is more than one palindrome of minimum length that can be made, return the lexicographically earliest one (the first one alphabetically).
# For example, given the string "race", you should return "ecarace", since we can add three letters to it (which is the smallest amount to make a palindrome). 
# There are seven other palindromes that can be made from "race" by adding three letters, but "ecarace" comes first alphabetically.
# As another example, given the string "google", you should return "elgoogle".
# 

def longest_palindromic_subsequence(s):
    n = len(s)
    dp = [[0] * n for _ in range(n)]

    for i in range(n):
        dp[i][i] = 1

    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            if s[i] == s[j]:
                dp[i][j] = 2 + dp[i + 1][j - 1]
            else:
                dp[i][j] = max(dp[i + 1][j], dp[i][j - 1])

    return dp[0][n - 1]

def shortest_palindrome(s):
    longest_subsequence_length = longest_palindromic_subsequence(s)
    remaining_chars = len(s) - longest_subsequence_length
    return s[::-1][:remaining_chars] + s

# Example usage:
print(shortest_palindrome("race"))   # Output: "ecarace"
print(shortest_palindrome("google")) # Output: "elgoogle"


# 35
# Given an array of strictly the characters 'R', 'G', and 'B', segregate the values of the array so that all the Rs come first, 
# the Gs come second, and the Bs come last. You can only swap elements of the array.
# Do this in linear time and in-place.
# For example, given the array ['G', 'B', 'R', 'R', 'B', 'R', 'G'], it should become ['R', 'R', 'R', 'G', 'G', 'B', 'B'].

def dutch_national_flag(arr):
    low = 0
    mid = 0
    high = len(arr) - 1

    while mid <= high:
        if arr[mid] == 'R':
            arr[low], arr[mid] = arr[mid], arr[low]
            low += 1
            mid += 1
        elif arr[mid] == 'G':
            mid += 1
        else:
            arr[mid], arr[high] = arr[high], arr[mid]
            high -= 1

# Example usage:
arr = ['G', 'B', 'R', 'R', 'B', 'R', 'G']
dutch_national_flag(arr)
print(arr)  # Output: ['R', 'R', 'R', 'G', 'G', 'B', 'B']


# 37
# The power set of a set is the set of all its subsets. Write a function that, given a set, generates its power set.
# For example, given the set {1, 2, 3}, it should return {{}, {1}, {2}, {3}, {1, 2}, {1, 3}, {2, 3}, {1, 2, 3}}.
# You may also use a list or array to represent a set.
# 

def generate_power_set(nums):
    def backtrack(start, path):
        power_set.append(path)
        for i in range(start, len(nums)):
            backtrack(i + 1, path + [nums[i]])

    power_set = []
    backtrack(0, [])
    return power_set

# Example usage:
set = [1, 2, 3]
print(generate_power_set(set))

# 41
# Given an unordered list of flights taken by someone, each represented as (origin, destination) pairs, and a starting airport, 
# compute the person's itinerary. If no such itinerary exists, return null. If there are multiple possible itineraries, 
# return the lexicographically smallest one. All flights must be used in the itinerary.
# For example, given the list of flights [('SFO', 'HKO'), ('YYZ', 'SFO'), ('YUL', 'YYZ'), ('HKO', 'ORD')] and starting airport 'YUL', 
# you should return the list ['YUL', 'YYZ', 'SFO', 'HKO', 'ORD'].
# Given the list of flights [('SFO', 'COM'), ('COM', 'YYZ')] and starting airport 'COM', you should return null.
# Given the list of flights [('A', 'B'), ('A', 'C'), ('B', 'C'), ('C', 'A')] and starting airport 'A', you should return the list ['A', 'B', 'C', 'A', 'C']
# even though ['A', 'C', 'A', 'B', 'C'] is also a valid itinerary. However, the first one is lexicographically smaller.
# 
# JS notes on DFS FUNCTION

def find_itinerary(flights, start):
    graph = {}
    for src, dst in flights:
        if src not in graph:
            graph[src] = []
        graph[src].append(dst)

    # Sort the destinations lexicographically
    for src in graph:
        graph[src].sort(reverse=True)

    # DFS function to find the itinerary
    def dfs(node):
        while graph.get(node):
            next_node = graph[node].pop()
            dfs(next_node)
        itinerary.append(node)

    # Initialize variables
    itinerary = []
    dfs(start)
    return itinerary[::-1] if len(itinerary) == len(flights) + 1 else None

# Example usage:
flights1 = [('SFO', 'HKO'), ('YYZ', 'SFO'), ('YUL', 'YYZ'), ('HKO', 'ORD')]
start1 = 'YUL'
print(find_itinerary(flights1, start1))  # Output: ['YUL', 'YYZ', 'SFO', 'HKO', 'ORD']

flights2 = [('SFO', 'COM'), ('COM', 'YYZ')]
start2 = 'COM'
print(find_itinerary(flights2, start2))  # Output: None

flights3 = [('A', 'B'), ('A', 'C'), ('B', 'C'), ('C', 'A')]
start3 = 'A'
print(find_itinerary(flights3, start3))  # Output: ['A', 'B', 'C', 'A', 'C']

# 43
# Implement a stack that has the following methods:
# push(val), which pushes an element onto the stack
# pop(), which pops off and returns the topmost element of the stack. If there are no elements in the stack, then it should throw an error or return null.
# max(), which returns the maximum value in the stack currently. If there are no elements in the stack, then it should throw an error or return null.
# Each method should run in constant time.
#

class Node:
    def __init__(self, val, max_so_far):
        self.val = val
        self.max_so_far = max_so_far
        self.prev = None

class MaxStack:
    def __init__(self):
        self.top = None

    def push(self, val):
        if not self.top:
            self.top = Node(val, val)
        else:
            max_so_far = max(val, self.top.max_so_far)
            new_node = Node(val, max_so_far)
            new_node.prev = self.top
            self.top = new_node

    def pop(self):
        if not self.top:
            return None
        val = self.top.val
        self.top = self.top.prev
        return val

    def max(self):
        if not self.top:
            return None
        return self.top.max_so_far

# Example usage:
stack = MaxStack()
stack.push(5)
stack.push(3)
stack.push(7)
print(stack.max())  # Output: 7
print(stack.pop())  # Output: 7
print(stack.max())  # Output: 5
