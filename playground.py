"""
LC 56 - Merge Intervals (Medium)

Given an array of intervals where intervals[i] = [start_i, end_i], merge
all overlapping intervals, and return an array of the non-overlapping
intervals that cover all the intervals in the input.

Input:  intervals: List[List[int]]
Output: List[List[int]]

Examples:
  Input:  intervals = [[1,3],[2,6],[8,10],[15,18]]
  Output: [[1,6],[8,10],[15,18]]

  Input:  intervals = [[1,4],[4,5]]
  Output: [[1,5]]

Constraints:
  - 1 <= len(intervals) <= 10^4
  - intervals[i].length == 2
  - 0 <= start_i <= end_i <= 10^4
"""

from typing import List


def merge(intervals: List[List[int]]) -> List[List[int]]:
    # your code here
    res = []
    intervals.sort()
    for start, end in intervals:
        if not res:
            res.append([start, end])
            continue
        if res[-1][1] >= start:
            res[-1][1] = max(end, res[-1][1])
        else:
            res.append([start, end])
    return res


# --- Tests ---
if __name__ == "__main__":
    assert merge([[1, 3], [2, 6], [8, 10], [15, 18]]) == [[1, 6], [8, 10], [15, 18]]
    assert merge([[1, 4], [4, 5]]) == [[1, 5]]
    assert merge([[1, 4], [2, 3]]) == [[1, 4]]
    assert merge([[1, 4], [0, 4]]) == [[0, 4]]
    assert merge([[1, 1]]) == [[1, 1]]
    assert merge([[1, 4], [0, 0]]) == [[0, 0], [1, 4]]
    assert merge([[2, 3], [4, 5], [6, 7], [8, 9], [1, 10]]) == [[1, 10]]
    print("All passed!")
