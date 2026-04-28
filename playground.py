"""
LC 862 - Shortest Subarray with Sum at Least K (Hard)

Given an integer array nums and an integer k, return the length of the
shortest non-empty subarray of nums with a sum of at least k. If there is
no such subarray, return -1.

A subarray is a contiguous part of an array.

Input:  nums: List[int], k: int
Output: int

Examples:
  Input:  nums = [1], k = 1
  Output: 1

  Input:  nums = [1,2], k = 4
  Output: -1

  Input:  nums = [2,-1,2], k = 3
  Output: 3

Constraints:
  - 1 <= nums.length <= 10^5
  - -10^5 <= nums[i] <= 10^5
  - 1 <= k <= 10^9
"""

from typing import List
from collections import deque

def shortestSubarray(nums: List[int], k: int) -> int:
    # seeing continuse sub array count, think of prefix sum first.
    # once i get a prefix sum, i need to find at any point the nearest idx that smaller than a target number, and that target number is dynamically change based on the cur num
    # let's think simplier, i only need to find the cloest number that smaller smaller than me, not me - target
    # preSum = [1, 7, 3, 6, 4, 8] >> maintain a monolitic stack keep increasing sequence
    # what i want is to find a val that nearest to me and meVal - val >= target
    # so, now, if i want to find the nearest previous member that is smaller than Me - target,
    # i can change the monolitic stack pop check quation to from meVal >= val to Me - Taergt >= val
    # your code here
    prefixSum = [0]
    for num in nums:
        prefixSum.append(prefixSum[-1] + num)
    n = len(prefixSum)
    stack = deque()
    ans = float('inf')
    for i in range(n):
        while stack and prefixSum[stack[-1]] > prefixSum[i]:
            stack.pop()
        stack.append(i)
        while prefixSum[stack[-1]] - prefixSum[stack[0]] >= k:
            ans = min(ans, stack[-1] - stack[0])
            stack.popleft()
    if ans == float('inf'):
        return -1
    print(ans)
    return ans



# --- Tests ---
if __name__ == "__main__":
    assert shortestSubarray([1], 1) == 1
    assert shortestSubarray([1, 2], 4) == -1
    assert shortestSubarray([2, -1, 2], 3) == 3
    assert shortestSubarray([17, 85, 93, -45, -21], 150) == 2
    assert shortestSubarray([84, -37, 32, 40, 95], 167) == 3
    assert shortestSubarray([-28, 81, -20, 28, -29], 89) == 3
    assert shortestSubarray([1, 2, 3, 4, 5], 11) == 3
    assert shortestSubarray([-1, 2, -1, 4, -1], 3) == 1
    print("All passed!")
