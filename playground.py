"""
LC 1478 - Allocate Mailboxes (Hard)

Given the array houses where houses[i] is the location of the ith house along
a street and an integer k, allocate k mailboxes on the street.

Return the minimum total distance between each house and its nearest mailbox.

The answer is guaranteed to fit in a 32-bit signed integer.

Input:  houses: List[int], k: int
Output: int

Examples:
  Input:  houses = [1,4,8,10,20], k = 3
  Output: 5
  Explanation: Allocate mailboxes at positions 3, 9, 20.
  Minimum total distance = |1-3|+|4-3|+|8-9|+|10-9|+|20-20| = 5

  Input:  houses = [2,3,5,12,18], k = 2
  Output: 9
  Explanation: Allocate mailboxes at positions 3, 14.
  Minimum total distance = |2-3|+|3-3|+|5-3|+|12-14|+|18-14| = 9

  Input:  houses = [7,4,6,1], k = 1
  Output: 8

Constraints:
  - n == houses.length
  - 1 <= n <= 100
  - 1 <= houses[i] <= 10^4
  - All the integers of houses are unique.
  - 1 <= k <= n
"""

from typing import List


def minDistance(houses: List[int], k: int) -> int:
    #
    # dp[i][j] means only given only the first houses, and j mailbox, the min distance
    # to update, dp[i][j] i need to check how many houses i want to assign to mailbox j. so, i need to iterate over dp[i-h][j-1] for all h before i.
    # there is one key note, worth to mention, the min cost of distance to a mailbox, for pre-arranged houses is fix, we make the number of houses on left side and the right side of the mailbox is the same
    # any point that make left/right balance, will lead to the same total distance, and that would be the min distance under this scenario.
    n = len(houses)
    cost = [[float('inf')] * n for _ in range(n)]
    for i in range(n):
        for j in range(i, n):
            cost[i][j] =
    pass

















# --- Tests ---
if __name__ == "__main__":
    assert minDistance([1, 4, 8, 10, 20], 3) == 5
    assert minDistance([2, 3, 5, 12, 18], 2) == 9
    assert minDistance([7, 4, 6, 1], 1) == 8
    assert minDistance([3, 6, 14, 10], 4) == 0
    assert minDistance([5, 10], 2) == 0
    assert minDistance([1], 1) == 0
    assert minDistance([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3) == 8
    print("All passed!")
