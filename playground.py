"""
LC 139 - Word Break (Medium)

Given a string s and a dictionary of strings wordDict, return true if s
can be segmented into a space-separated sequence of one or more dictionary
words.

Note that the same word in the dictionary may be reused multiple times in
the segmentation.

Input:  s: str, wordDict: List[str]
Output: bool

Examples:
  Input:  s = "leetcode", wordDict = ["leet","code"]
  Output: True          # "leet code"

  Input:  s = "applepenapple", wordDict = ["apple","pen"]
  Output: True          # "apple pen apple"

  Input:  s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
  Output: False

Constraints:
  - 1 <= len(s) <= 300
  - 1 <= len(wordDict) <= 1000
  - 1 <= len(wordDict[i]) <= 20
  - s and wordDict[i] consist of only lowercase English letters
  - All strings of wordDict are unique
"""

from typing import List


def wordBreak(s: str, wordDict: List[str]) -> bool:
    # your code here
    pass


# --- Tests ---
if __name__ == "__main__":
    assert wordBreak("leetcode", ["leet", "code"]) == True
    assert wordBreak("applepenapple", ["apple", "pen"]) == True
    assert wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"]) == False
    assert wordBreak("a", ["a"]) == True
    assert wordBreak("ab", ["a"]) == False
    assert wordBreak("aaaaaaa", ["aaa", "aaaa"]) == True
    assert wordBreak("cars", ["car", "ca", "rs"]) == True
    print("All passed!")
