"""
LC 153 - Find Minimum in Rotated Sorted Array

Input:  nums: List[int] — rotated sorted array, no duplicates
Output: int — the minimum element

Example:
  Input:  [3,4,5,1,2]
  Output: 1

  Input:  [4,5,6,7,0,1,2]
  Output: 0

Constraints:
  - 1 <= len(nums) <= 5000
  - -5000 <= nums[i] <= 5000
  - All values are unique
  - nums was sorted ascending then rotated 1 to n times
"""

from typing import List


def find_min(nums: List[int]) -> int:
    left, right = 0, len(nums) - 1
    while left < right:
      mid = (left + right) // 2
      if nums[mid] > nums[right]:
        left  = mid + 1
      else:
        right = mid
    return nums[left]


# --- Tests ---
if __name__ == "__main__":
    assert find_min([3,4,5,1,2]) == 1
    assert find_min([4,5,6,7,0,1,2]) == 0
    assert find_min([11,13,15,17]) == 11
    assert find_min([2,1]) == 1
    assert find_min([1]) == 1
    assert find_min([3,1,2]) == 1
    print("All passed!")
