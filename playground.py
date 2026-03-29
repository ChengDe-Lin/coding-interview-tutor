"""
LC 322 - Coin Change (Medium)

You are given an integer array coins representing coins of different
denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount.
If that amount of money cannot be made up by any combination of the coins,
return -1.

You may assume that you have an infinite number of each kind of coin.

Input:  coins: List[int], amount: int
Output: int

Examples:
  Input:  coins = [1,2,5], amount = 11
  Output: 3          # 5 + 5 + 1

  Input:  coins = [2], amount = 3
  Output: -1

  Input:  coins = [1], amount = 0
  Output: 0

Constraints:
  - 1 <= len(coins) <= 12
  - 1 <= coins[i] <= 2^31 - 1
  - 0 <= amount <= 10^4
"""

from typing import List


def coinChange(coins: List[int], amount: int) -> int:
    # your code here
    if not amount:
        return 0
    coins.sort()
    dp = [float("inf")] * (amount + 1)
    # init dp
    for coin in coins:
        if coin <= amount:
            dp[coin] = 1
    for i in range(1, amount + 1):
        for coin in coins:
            if i - coin <= 0:
                break
            dp[i] = min(dp[i], dp[i - coin] + 1)
    if dp[-1] == float("inf"):
        return -1
    return dp[-1]


# --- Tests ---
if __name__ == "__main__":
    assert coinChange([1, 2, 5], 11) == 3
    assert coinChange([2], 3) == -1
    assert coinChange([1], 0) == 0
    assert coinChange([1], 1) == 1
    assert coinChange([1], 2) == 2
    assert coinChange([1, 2147483647], 2) == 2
    assert coinChange([186, 419, 83, 408], 6249) == 20
    print("All passed!")
