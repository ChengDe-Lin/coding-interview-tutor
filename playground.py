"""
There are n cities numbered from 0 to n-1. You are given a 2D array edges
where edges[i] = [fromi, toi, weighti] represents a bidirectional weighted
edge between cities fromi and toi.

You are also given an integer distanceThreshold.

Return the city with the smallest number of cities that are reachable through
some path with total distance at most distanceThreshold. If there are multiple
such cities, return the city with the greatest number.

Example:
  Input: n=4, edges=[[0,1,3],[1,2,1],[1,3,4],[2,3,1]], distanceThreshold=4
  Output: 3
  Explanation:
    City 0 -> [1,3] (2 cities reachable)
    City 1 -> [0,2,3] (3 cities)
    City 2 -> [1,3] (2 cities)
    City 3 -> [1,2] (2 cities)
    Cities 0, 2, 3 all have 2 reachable. Return greatest number = 3.

Constraints:
  - 2 <= n <= 100
  - 1 <= edges.length <= n*(n-1)/2
  - 0 <= fromi, toi < n
  - fromi != toi
  - 1 <= weighti <= 10^4
  - 1 <= distanceThreshold <= 10^4
  - All (fromi, toi) pairs are distinct
"""

from typing import List
import heapq
from collections import defaultdict

def find_the_city(n: int, edges: List[List[int]], distanceThreshold: int) -> int:
  graph = defaultdict(list)
  for u, v, w in edges:
    graph[u].append((v, w))
    graph[v].append((u, w))
  reachableCities = [0] * n
  for city in range(n):
    visited = [0] * n
    visited[city] = 1
    heap = [(0, city)]
    while heap:
      d, u = heapq.heappop(heap)
      visited[u] = 1
      if d > distanceThreshold:
        break
      for v, w in graph[u]:
        if not visited[v]:
          heapq.heappush(heap, (d + w, v))
    reachableCities[city] = sum(visited) - 1
  targetCount = min(reachableCities)
  ans = 0
  for city in range(n):
    if reachableCities[city] == targetCount:
      ans = city
  return ans

# --- Tests ---
if __name__ == "__main__":
    assert find_the_city(4, [[0,1,3],[1,2,1],[1,3,4],[2,3,1]], 4) == 3
    assert find_the_city(5, [[0,1,2],[0,4,8],[1,2,3],[1,4,2],[2,3,1],[3,4,1]], 2) == 0
    assert find_the_city(3, [[0,1,1],[1,2,1],[0,2,3]], 1) == 2
    print("All passed!")
