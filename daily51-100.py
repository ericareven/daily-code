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
