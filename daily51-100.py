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
