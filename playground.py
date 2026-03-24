"""
LC 236 - Lowest Common Ancestor of a Binary Tree

Input:  root: TreeNode, p: TreeNode, q: TreeNode
Output: TreeNode — the lowest common ancestor of p and q

Example:
        3
       / \
      5   1
     / \ / \
    6  2 0  8
      / \
     7   4

  p=5, q=1 → 3
  p=5, q=4 → 5

Constraints:
  - Number of nodes in [2, 10^5]
  - All node values are unique
  - p != q
  - p and q both exist in the tree
"""


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def lowest_common_ancestor(root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
    def dfs(node):
      if node.val == p.val or node.val == q.val:
        return node
      
      left = dfs(node.left)
      right = dfs(node.right)
      if left and right:
        return node
      return left or right
    return dfs(root)

# --- Tests ---
if __name__ == "__main__":
    # Build tree:       3
    #                  / \
    #                 5   1
    #                / \ / \
    #               6  2 0  8
    #                 / \
    #                7   4
    n7 = TreeNode(7)
    n4 = TreeNode(4)
    n2 = TreeNode(2, n7, n4)
    n6 = TreeNode(6)
    n5 = TreeNode(5, n6, n2)
    n0 = TreeNode(0)
    n8 = TreeNode(8)
    n1 = TreeNode(1, n0, n8)
    n3 = TreeNode(3, n5, n1)

    assert lowest_common_ancestor(n3, n5, n1) == n3
    assert lowest_common_ancestor(n3, n5, n4) == n5
    assert lowest_common_ancestor(n3, n6, n4) == n5
    assert lowest_common_ancestor(n3, n7, n8) == n3
    assert lowest_common_ancestor(n3, n0, n8) == n1

    print("All passed!")
