# 51
# Given a function that generates perfectly random numbers between 1 and k (inclusive), where k is an input, 
# write a function that shuffles a deck of cards represented as an array using only swaps.
# It should run in O(N) time.
# Hint: Make sure each one of the 52! permutations of the deck is equally likely.
#

import random

def shuffle_deck(deck):
    n = len(deck)
    for i in range(n - 1, 0, -1):
        j = random.randint(0, i)  # Generate a random index j such that 0 <= j <= i
        deck[i], deck[j] = deck[j], deck[i]  # Swap deck[i] with deck[j]
    return deck

# Example usage:
deck = list(range(1, 53))  # Representing the deck of cards as an array of numbers from 1 to 52
shuffled_deck = shuffle_deck(deck)
print(shuffled_deck)

# 53
# Implement a queue using two stacks. Recall that a queue is a FIFO (first-in, first-out) data structure with the following methods: 
# enqueue, which inserts an element into the queue, and dequeue, which removes it.
# 

class QueueUsingStacks:
    def __init__(self):
        self.in_stack = []  # Stack for enqueue operation
        self.out_stack = []  # Stack for dequeue operation

    def enqueue(self, value):
        self.in_stack.append(value)

    def dequeue(self):
        if not self.out_stack:
            # If the out_stack is empty, transfer elements from in_stack to out_stack
            while self.in_stack:
                self.out_stack.append(self.in_stack.pop())
        if self.out_stack:
            # Pop and return the top element from out_stack (FIFO)
            return self.out_stack.pop()
        else:
            # If both stacks are empty, the queue is empty
            return "Error: Dequeue from empty queue"

    def is_empty(self):
        return len(self.in_stack) == 0 and len(self.out_stack) == 0

# Example usage:
queue = QueueUsingStacks()
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)

print(queue.dequeue())  # Output: 1
print(queue.dequeue())  # Output: 2
print(queue.dequeue())  # Output: 3

# 55
# Implement a URL shortener with the following methods:
# shorten(url), which shortens the url into a six-character alphanumeric string, such as zLg6wl.
# restore(short), which expands the shortened string into the original url. If no such shortened string exists, return null.
# Hint: What if we enter the same URL twice?
#

import random
import string

class URLShortener:
    def __init__(self):
        self.url_to_short = {}
        self.short_to_url = {}

    def shorten(self, url):
        if url in self.url_to_short:
            return self.url_to_short[url]

        short = self.generate_short()
        self.url_to_short[url] = short
        self.short_to_url[short] = url
        return short

    def restore(self, short):
        return self.short_to_url.get(short, None)

    def generate_short(self):
        chars = string.ascii_letters + string.digits
        return ''.join(random.choice(chars) for _ in range(6))

# Example usage:
shortener = URLShortener()
url1 = "https://www.example.com"
short1 = shortener.shorten(url1)
print("Shortened URL:", short1)

url2 = "https://www.example.com"
short2 = shortener.shorten(url2)
print("Shortened URL for the same URL:", short2)  # Should print the same short URL

restored_url = shortener.restore(short1)
print("Restored URL:", restored_url)

invalid_short = "abc123"
restored_invalid_url = shortener.restore(invalid_short)
print("Restored invalid URL:", restored_invalid_url)  # Should print None

# 57
# Given a string s and an integer k, break up the string into multiple lines such that each line has a length of k or less. 
# You must break it up so that words don't break across lines. Each line has to have the maximum possible amount of words. 
# If there's no way to break the text up, then return null.
# You can assume that there are no spaces at the ends of the string and that there is exactly one space between each word.
# For example, given the string "the quick brown fox jumps over the lazy dog" and k = 10, you should return: 
# ["the quick", "brown fox", "jumps over", "the lazy", "dog"]. No string in the list has a length of more than 10.
#

def break_text_into_lines(s, k):
    words = s.split()
    lines = []
    current_line = ""

    for word in words:
        if len(current_line) + len(word) <= k:
            if current_line:
                current_line += " "
            current_line += word
        else:
            if not current_line:
                return None  # Word length is greater than k
            lines.append(current_line)
            current_line = word

    if current_line:
        lines.append(current_line)

    return lines

# Example usage:
s = "the quick brown fox jumps over the lazy dog"
k = 10
print(break_text_into_lines(s, k))
# Output: ['the quick', 'brown fox', 'jumps over', 'the lazy', 'dog']

# 58
# An sorted array of integers was rotated an unknown number of times.
# Given such an array, find the index of the element in the array in faster than linear time. 
# If the element doesn't exist in the array, return null.
# For example, given the array [13, 18, 25, 2, 8, 10] and the element 8, return 4 (the index of 8 in the array).
# You can assume all the integers in the array are unique.
#



# 60
# Given a multiset of integers, return whether it can be partitioned into two subsets whose sums are the same.
# For example, given the multiset {15, 5, 20, 10, 35, 15, 10}, it would return true, since we can split it up into 
# {15, 5, 10, 15, 10} and {20, 35}, which both add up to 55.
# Given the multiset {15, 5, 20, 10, 35}, it would return false, since we can't split it up into two subsets that add up to the same sum.
# 


# 61
# Implement integer exponentiation. That is, implement the pow(x, y) function, where x and y are integers and returns x^y.
# Do this faster than the naive method of repeated multiplication.
# For example, pow(2, 10) should return 1024.
# 



# 62
# There is an N by M matrix of zeroes. Given N and M, write a function to count the number of ways of starting at the top-left corner 
# and getting to the bottom-right corner. You can only move right or down.
# For example, given a 2 by 2 matrix, you should return 2, since there are two ways to get to the bottom-right:
# Right, then down
# Down, then right
# Given a 5 by 5 matrix, there are 70 ways to get to the bottom-right.
# 



# 63
# Given a 2D matrix of characters and a target word, write a function that returns whether the word can be found 
# in the matrix by going left-to-right, or up-to-down.
# For example, given the following matrix:
# [['F', 'A', 'C', 'I'],
#  ['O', 'B', 'Q', 'P'],
#  ['A', 'N', 'O', 'B'],
#  ['M', 'A', 'S', 'S']]
# and the target word 'FOAM', you should return true, since it's the leftmost column. 
# Similarly, given the target word 'MASS', you should return true, since it's the last row.
# 