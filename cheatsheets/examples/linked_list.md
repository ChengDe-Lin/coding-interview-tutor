# Linked List Techniques — 經典題速查

## Dummy Node + 穿針引線

### LC 21 Merge Two Sorted Lists

給兩條已排序的 linked list，合併成一條排序的 linked list 並回傳。
節點數 0 ~ 50，值域 -100 ~ 100。

**關鍵洞察**：用 dummy node 避免 head 特判，每次比較兩條的當前節點，較小者接上去。

```python
def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
    dummy = curr = ListNode(0)
    while list1 and list2:
        if list1.val <= list2.val:
            curr.next = list1
            list1 = list1.next
        else:
            curr.next = list2
            list2 = list2.next
        curr = curr.next
    curr.next = list1 or list2
    return dummy.next
```

---

## Reverse Linked List

### LC 206 Reverse Linked List

給一條 singly linked list，原地反轉後回傳新的 head。
節點數 0 ~ 5000。

**關鍵洞察**：三指標 `prev, curr, nxt`，每步先存 next、把 curr 指回 prev、兩者前進。迴圈結束時 prev 就是新 head。

```python
def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
    prev, curr = None, head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev
```

---

## Reverse in K-Group

### LC 25 Reverse Nodes in k-Group (Hard)

給一條 linked list 和整數 k，每 k 個節點一組做反轉。
剩餘不足 k 個的尾段保持原序。要求 O(1) 額外空間。

**關鍵洞察**：先數 k 個確認夠不夠，夠就反轉該段並把前一組尾巴接上新 head。用 dummy node 統一處理第一組。

```python
def reverseKGroup(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
    dummy = ListNode(0, head)
    group_prev = dummy

    while True:
        # 檢查剩餘節點是否 >= k
        kth = group_prev
        for _ in range(k):
            kth = kth.next
            if not kth:
                return dummy.next

        group_next = kth.next  # 下一組的起點
        # 反轉 group_prev.next ~ kth 這段
        prev, curr = group_next, group_prev.next
        for _ in range(k):
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt

        tmp = group_prev.next  # 反轉後這段的尾巴
        group_prev.next = prev  # 接上新 head (= kth)
        group_prev = tmp  # 移到這段尾巴，準備處理下一組
```

---

## 快慢指標找中點 + 合併

### LC 148 Sort List (Medium)

給一條 linked list，用 O(n log n) 時間排序。Follow-up 要求 O(1) 空間。
節點數 0 ~ 50000，值域 -10⁵ ~ 10⁵。

**關鍵洞察**：快慢指標找中點切成兩半，遞迴 merge sort。合併用 dummy node 串接兩條已排序鏈表。

```python
def sortList(self, head: Optional[ListNode]) -> Optional[ListNode]:
    if not head or not head.next:
        return head
    # 快慢指標找前半段尾巴
    slow, fast = head, head.next
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    mid = slow.next
    slow.next = None  # 斷開
    left = self.sortList(head)
    right = self.sortList(mid)
    # 合併
    dummy = curr = ListNode(0)
    while left and right:
        if left.val <= right.val:
            curr.next = left
            left = left.next
        else:
            curr.next = right
            right = right.next
        curr = curr.next
    curr.next = left or right
    return dummy.next
```

---

## Copy with Random Pointer

### LC 138 Copy List with Random Pointer (Medium)

深拷貝一條 linked list，每個節點有 `next` 和 `random` 兩個指標。
`random` 可指向任意節點或 null。節點數 0 ~ 1000。

**關鍵洞察**：Hash map `{原節點: 複製節點}` 第一遍建所有新節點，第二遍接 next 和 random。或用 interleave 技巧（原→複製→原→複製）省掉 hash map。

```python
def copyRandomList(self, head: Optional['Node']) -> Optional['Node']:
    if not head:
        return None
    old_to_new = {}
    curr = head
    while curr:
        old_to_new[curr] = Node(curr.val)
        curr = curr.next
    curr = head
    while curr:
        old_to_new[curr].next = old_to_new.get(curr.next)
        old_to_new[curr].random = old_to_new.get(curr.random)
        curr = curr.next
    return old_to_new[head]
```

---

## 常見陷阱

- **忘記 dummy node 導致 head 特判一堆**：只要結果的 head 不確定是哪個節點，就用 dummy node，最後回傳 `dummy.next`。
- **Reverse 時忘記先存 next 導致斷鏈**：`curr.next = prev` 之前一定要先 `nxt = curr.next`，否則 curr 的下一個節點就丟了。
- **快慢指標找中點：偶數節點時 slow 停的位置不同**：`while fast and fast.next` → slow 停在後半段第一個（偏右）；`while fast.next and fast.next.next` → slow 停在前半段最後一個（偏左）。Merge sort 切割要用偏左版本，否則兩個節點時切不開會無限遞迴。
- **改完指標忘記斷舊連結，造成 cycle**：例如找到中點後忘記 `slow.next = None`，導致前半段仍連著後半段，merge sort 會無限遞迴或結果錯誤。
