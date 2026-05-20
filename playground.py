"""
LC 137 - Single Number II

Given an integer array nums where every element appears three times except for one,
which appears exactly once. Find the single element and return it.

Input:  nums: List[int]
Output: int

Examples:
  Input:  nums = [2, 2, 3, 2]
  Output: 3

  Input:  nums = [0, 1, 0, 1, 0, 1, 99]
  Output: 99

Constraints:
  - 1 <= nums.length <= 3 * 10^4
  - -2^31 <= nums[i] <= 2^31 - 1
  - Each element in nums appears exactly three times except for one element which appears once
"""

from typing import List


def singleNumber(nums: List[int]) -> int:
    # TODO:
    # 1. 先想怎麼把所有出現 3 次的 bit 消掉
    # 2. 注意 Python 負數 bit operation 的處理
    pass


# --- Tests ---
if __name__ == "__main__":
    assert singleNumber([2, 2, 3, 2]) == 3
    assert singleNumber([0, 1, 0, 1, 0, 1, 99]) == 99
    assert singleNumber([-2, -2, -2, -7]) == -7
    assert singleNumber([-4, 1, 1, 1]) == -4
    assert singleNumber([-1, -1, -1, -2147483648]) == -2147483648
    print("All passed!")
