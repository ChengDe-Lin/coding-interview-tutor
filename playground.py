"""
LC 208 - Implement Trie (Prefix Tree) (Medium)

A trie (pronounced as "try") or prefix tree is a tree data structure used to
efficiently store and retrieve keys in a dataset of strings. There are various
applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:
  - Trie() Initializes the trie object.
  - void insert(String word) Inserts the string word into the trie.
  - boolean search(String word) Returns true if the string word is in the
    trie (i.e., was inserted before), and false otherwise.
  - boolean startsWith(String prefix) Returns true if there is a previously
    inserted string word that has the prefix prefix, and false otherwise.

Input/Output:
  Input:
    ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
    [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
  Output:
    [null, null, true, false, true, null, true]

Constraints:
  - 1 <= word.length, prefix.length <= 2000
  - word and prefix consist only of lowercase English letters
  - At most 3 * 10^4 calls in total will be made to insert, search, startsWith
"""


class Node:
    def __init__(self, c):
        self.isWord = False
        self.char = c
        self.child = {}


class Trie:
    def __init__(self):
        self.root = Node("*")

    def insert(self, word: str) -> None:
        root = self.root
        for c in word:
            if c not in root.child:
                root.child[c] = Node(c)
            root = root.child[c]
        root.isWord = True

    def search(self, word: str) -> bool:
        root = self.root
        for c in word:
            if c not in root.child:
                return False
            root = root.child[c]
        return root.isWord

    def startsWith(self, prefix: str) -> bool:
        root = self.root
        for c in prefix:
            if c not in root.child:
                return False
            root = root.child[c]
        return True


# --- Tests ---
if __name__ == "__main__":
    t = Trie()
    t.insert("apple")
    assert t.search("apple") == True
    assert t.search("app") == False
    assert t.startsWith("app") == True
    t.insert("app")
    assert t.search("app") == True

    t2 = Trie()
    t2.insert("hello")
    assert t2.search("hell") == False
    assert t2.search("helloa") == False
    assert t2.search("hello") == True
    assert t2.startsWith("hell") == True
    assert t2.startsWith("helloa") == False

    print("All passed!")
