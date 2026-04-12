---
topic: Segment Tree + GCD — Good Subsequence Queries
review_after: 2026-04-20
status: 待學習
---

# Good Subsequence Queries — Segment Tree + GCD

## 題目

給 array nums、整數 p、一堆 queries。每次 query 更新一個元素後，判斷是否存在長度 < n 且 GCD = p 的 subsequence。

## 核心觀察

1. 只關心能被 p 整除的元素，除以 p 得到 vals
2. 需要 vals 的某個非空子集 GCD = 1，且大小 < n
3. 不能整除的元素存 0（GCD 的單位元，不影響計算）

## 三種判斷

- `GCD(全部 vals) != 1` → 不存在（子集 GCD ≥ 全集 GCD > 1）
- 能被 p 整除的元素 < n 個 → 存在（全部拿來，大小 < n）
- 全部 n 個都整除 → 檢查能不能去掉一個元素，GCD 仍為 1

## Segment Tree 的角色

- 存 GCD 而非 sum，結構完全一樣，`+` 換成 `math.gcd`
- 支援 O(log n) 單點更新 + 區間 GCD 查詢
- 去掉元素 i：`gcd(query(0, i-1), query(i+1, n-1))`

## 關鍵技巧

- `gcd(0, x) = x`：0 是 GCD 的單位元，用來代表「不參與」
- Segment Tree 不只能存 sum，任何滿足結合律的操作都能用（sum, min, max, gcd, xor...）

## 完整解法

```python
import math

class GCDSegTree:
    def __init__(self, nums):
        self.n = len(nums)
        self.tree = [0] * (2 * self.n)
        for i in range(self.n):
            self.tree[self.n + i] = nums[i]
        for i in range(self.n - 1, 0, -1):
            self.tree[i] = math.gcd(self.tree[2 * i], self.tree[2 * i + 1])

    def update(self, idx, val):
        idx += self.n
        self.tree[idx] = val
        idx //= 2
        while idx:
            self.tree[idx] = math.gcd(self.tree[2 * idx], self.tree[2 * idx + 1])
            idx //= 2

    def query(self, l, r):
        res = 0
        l += self.n
        r += self.n + 1
        while l < r:
            if l & 1:
                res = math.gcd(res, self.tree[l])
                l += 1
            if r & 1:
                r -= 1
                res = math.gcd(res, self.tree[r])
            l //= 2
            r //= 2
        return res

def goodSubsequenceQueries(nums, p, queries):
    n = len(nums)
    def to_val(x):
        return x // p if x % p == 0 else 0

    vals = [to_val(x) for x in nums]
    divisible_count = sum(1 for v in vals if v != 0)
    st = GCDSegTree(vals)
    result = 0

    for ind, val in queries:
        old_val = vals[ind]
        new_val = to_val(val)
        nums[ind] = val
        vals[ind] = new_val
        if old_val != 0 and new_val == 0:
            divisible_count -= 1
        elif old_val == 0 and new_val != 0:
            divisible_count += 1
        st.update(ind, new_val)

        total_gcd = st.query(0, n - 1)
        if total_gcd != 1:
            continue
        if divisible_count < n:
            result += 1
            continue
        # 全部都整除 → 試著去掉一個
        for i in range(n):
            g = 0
            if i > 0:
                g = math.gcd(g, st.query(0, i - 1))
            if i < n - 1:
                g = math.gcd(g, st.query(i + 1, n - 1))
            if g == 1:
                result += 1
                break

    return result
```

## 延伸

- Segment Tree 可存任何滿足結合律的操作：sum, min, max, gcd, xor, 乘法...
- 模板完全一樣，只改合併函式
