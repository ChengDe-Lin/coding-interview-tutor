"""
LC 42 - Trapping Rain Water

Input:  height: List[int] — array of non-negative integers representing bar heights
Output: int — total units of trapped rain water

Example:
  Input:  [0,1,0,2,1,0,1,3,2,1,2,1]
  Output: 6

Constraints:
  - 1 <= len(height) <= 2 * 10^4
  - 0 <= height[i] <= 10^5
"""

from typing import List


def trap(height: List[int]) -> int:
    left, right = 0, len(height) - 1
    leftMax, rightMax = height[left], height[right]
    water = 0
    while left < right:
      if leftMax < rightMax:
        left += 1
        leftMax = max(leftMax, height[left])
        water += leftMax - height[left]
      else:
        right -= 1
        rightMax = max(rightMax, height[right])
        water += rightMax - height[right]
    return water

# --- Tests ---
if __name__ == "__main__":
    assert trap([0,1,0,2,1,0,1,3,2,1,2,1]) == 6
    assert trap([4,2,0,3,2,5]) == 9
    assert trap([1,0,1]) == 1
    assert trap([3,0,0,2,0,4]) == 10
    assert trap([0]) == 0
    assert trap([1,2,3,4,5]) == 0
    print("All passed!")
