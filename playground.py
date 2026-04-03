"""
LC 10 - Regular Expression Matching (Hard)

Given an input string s and a pattern p, implement regular expression matching
with support for '.' and '*' where:

  - '.' Matches any single character.
  - '*' Matches zero or more of the preceding element.

The matching should cover the entire input string (not partial).

Input:  s: str, p: str
Output: bool

Examples:
  Input:  s = "aa", p = "a"
  Output: False
  Explanation: "a" does not match the entire string "aa".

  Input:  s = "aa", p = "a*"
  Output: True
  Explanation: '*' means zero or more of the preceding element, 'a'.
               Therefore, by repeating 'a' once, it becomes "aa".

  Input:  s = "ab", p = ".*"
  Output: True
  Explanation: ".*" means "zero or more (*) of any character (.)".

Constraints:
  - 1 <= s.length <= 20
  - 1 <= p.length <= 20
  - s contains only lowercase English letters
  - p contains only lowercase English letters, '.', and '*'
  - It is guaranteed for each appearance of the character '*', there will be
    a previous valid character to match
"""


def isMatch(s: str, p: str) -> bool:
    # your code here
    pass


# --- Tests ---
if __name__ == "__main__":
    assert isMatch("aa", "a") == False
    assert isMatch("aa", "a*") == True
    assert isMatch("ab", ".*") == True
    assert isMatch("aab", "c*a*b") == True
    assert isMatch("mississippi", "mis*is*ip*.") == True
    assert isMatch("mississippi", "mis*is*p*.") == False
    assert isMatch("", ".*") == True
    assert isMatch("", "") == True
    assert isMatch("a", "") == False
    assert isMatch("ab", ".*c") == False
    assert isMatch("aaa", "a*a") == True
    print("All passed!")
