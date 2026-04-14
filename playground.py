"""
LC 2463 - Minimum Total Distance Traveled (Hard)

There are some robots and factories on the X-axis. You are given an integer
array `robot` where robot[i] is the position of the i-th robot. You are also
given a 2D integer array `factory` where factory[j] = [position_j, limit_j]
indicates that position_j is the position of the j-th factory and that it
can repair at most limit_j robots.

The positions of each robot are unique. The positions of each factory are
also unique. Note that a robot can be at the same position as a factory.

All robots are initially broken; they keep moving in one direction. The
direction can be the negative or positive direction of the X-axis. When a
robot reaches a factory that did not run out of limits, it will be repaired
there and will not move any further. Everything happens at the same time,
you can assume that each robot chooses its moving direction before any
repair happens.

Return the minimum total distance traveled by all the robots. The test
cases are generated such that all robots can be repaired.

Notes:
  - All robots move at the same speed.
  - If two robots move in the same direction, they will never collide.
  - If two robots move in opposite directions and they meet at some point,
    they do not collide; they cross each other.
  - If a robot passes by a factory that reached its limits, it crosses it
    as if it does not exist.
  - If the robot moved from a position x to a position y, the distance it
    moved is |y - x|.

Input:  robot: List[int], factory: List[List[int]]
Output: int

Examples:
  Input:  robot = [0,4,6], factory = [[2,2],[6,2]]
  Output: 4
  Explanation:
    - Robot at 0 moves to factory at 2: distance 2
    - Robot at 4 moves to factory at 2: distance 2
    - Robot at 6 moves to factory at 6: distance 0
    Total = 4

  Input:  robot = [1,-1], factory = [[-2,1],[2,1]]
  Output: 2
  Explanation:
    - Robot at 1 moves to factory at 2: distance 1
    - Robot at -1 moves to factory at -2: distance 1
    Total = 2

Constraints:
  - 1 <= robot.length, factory.length <= 100
  - factory[j].length == 2
  - -10^9 <= robot[i], position_j <= 10^9
  - 0 <= limit_j <= robot.length
  - The input will be generated such that it is always possible to repair
    every robot.
"""

from typing import List


def minimumTotalDistance(robot: List[int], factory: List[List[int]]) -> int:
    # your code here
    # sort robots and factory first.
    # if each robot's moving direction firm, the result is determinstic. but how can i get this result fast?
    # 100 robot, each robot has two choice, the combibations would be 2^100, that's way too much
    # i need dp
    # if one robot need to go left 3, but factory was occupied by B who go right 6. two cases: B should actually go left
    pass


# --- Tests ---
if __name__ == "__main__":
    assert minimumTotalDistance([0, 4, 6], [[2, 2], [6, 2]]) == 4
    assert minimumTotalDistance([1, -1], [[-2, 1], [2, 1]]) == 2
    # single robot, single factory
    assert minimumTotalDistance([5], [[3, 1]]) == 2
    # factory limit forces some robots to a farther factory
    assert minimumTotalDistance([0, 1, 2], [[0, 1], [10, 2]]) == 19
    # all robots at same position picking nearest factory with enough capacity
    assert minimumTotalDistance([9, 11, 99, 101], [[10, 1], [7, 1], [14, 1], [100, 1]]) == 6
    print("All passed!")
