"""
LC 1235 - Maximum Profit in Job Scheduling (Hard)

We have n jobs, where every job is scheduled to be done from startTime[i]
to endTime[i], obtaining a profit of profit[i].

You're given the startTime, endTime and profit arrays, return the maximum
profit you can take such that there are no two jobs in the subset with
overlapping time range.

If you choose a job that ends at time X, you can start another job that
starts at time X.

Input:  startTime: List[int], endTime: List[int], profit: List[int]
Output: int

Examples:
  Input:  startTime = [1,2,3,3], endTime = [3,4,5,6], profit = [50,10,40,70]
  Output: 120

  Input:  startTime = [1,2,3,4,6], endTime = [3,5,10,6,9], profit = [20,20,100,70,60]
  Output: 150

  Input:  startTime = [1,1,1], endTime = [2,3,4], profit = [5,6,4]
  Output: 6

Constraints:
  - 1 <= startTime.length == endTime.length == profit.length <= 5 * 10^4
  - 1 <= startTime[i] < endTime[i] <= 10^9
  - 1 <= profit[i] <= 10^4
"""

from typing import List


def jobScheduling(startTime: List[int], endTime: List[int], profit: List[int]) -> int:
    # your code here
    pass


# --- Tests ---
if __name__ == "__main__":
    assert jobScheduling([1,2,3,3], [3,4,5,6], [50,10,40,70]) == 120
    assert jobScheduling([1,2,3,4,6], [3,5,10,6,9], [20,20,100,70,60]) == 150
    assert jobScheduling([1,1,1], [2,3,4], [5,6,4]) == 6
    assert jobScheduling([1], [2], [5]) == 5
    print("All passed!")
