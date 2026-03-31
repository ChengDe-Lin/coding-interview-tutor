"""
You are given an m x n grid. Each cell has an integer value:
  0 — empty cell
  1 — fresh orange
  2 — obstacle (cannot pass through)

You also have a list of source coordinates. From each source, you can move
up/down/left/right to adjacent cells (not obstacles) with cost 1 per step.

Return a 2D array where ans[i][j] is the minimum distance from cell (i,j) to
its nearest source. If a cell is unreachable from any source, set it to -1.
Obstacle cells should be -1.

Example:
  grid = [[0,0,0],
          [0,2,0],
          [0,0,0]]
  sources = [(0,0), (2,2)]
  Output: [[0,1,2],
           [1,-1,1],
           [2,1,0]]

Constraints:
  - 1 <= m, n <= 100
  - 0 <= grid[i][j] <= 2
  - 1 <= len(sources) <= m*n
"""

from typing import List, Tuple


def nearest_source(grid: List[List[int]], sources: List[Tuple[int,int]]) -> List[List[int]]:
    pass


# --- Tests ---
if __name__ == "__main__":
    g1 = [[0,0,0],
          [0,2,0],
          [0,0,0]]
    assert nearest_source(g1, [(0,0),(2,2)]) == [[0,1,2],[1,-1,1],[2,1,0]]

    g2 = [[0,0],
          [0,0]]
    assert nearest_source(g2, [(0,0)]) == [[0,1],[1,2]]

    g3 = [[0,2,0]]
    assert nearest_source(g3, [(0,0)]) == [[0,-1,-1]]

    g4 = [[1]]
    assert nearest_source(g4, [(0,0)]) == [[0]]

    g5 = [[0,0,0],
          [2,2,2],
          [0,0,0]]
    assert nearest_source(g5, [(0,1)]) == [[1,0,1],[-1,-1,-1],[-1,-1,-1]]

    print("All passed!")
