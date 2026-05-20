# Bit Manipulation — 經典題速查

## LC 136. Single Number

**範例：** `nums = [4,1,2,1,2]` → `4`

給定陣列中除了 1 個數只出現一次以外，其餘都出現兩次，找出那個只出現一次的數。要求線性時間、常數空間。

**關鍵洞察**：XOR 會把成對元素抵消掉，因為 `a ^ a = 0`，而 `0 ^ x = x`。

```python
def singleNumber(nums: list[int]) -> int:
    ans = 0
    for num in nums:
        ans ^= num
    return ans
```

---

## LC 137. Single Number II

**範例：** `nums = [2,2,3,2]` → `3`，`nums = [-2,-2,-2,-7]` → `-7`

給定陣列中除了 1 個數只出現一次以外，其餘都出現三次，找出那個只出現一次的數。要求線性時間、常數空間。

**關鍵洞察**：XOR 只會處理「出現 2 次抵消」，這題要改成 **每個 bit 分開看**。第 `i` bit 上所有數字的 1 總數對 3 取模，剩下的就是答案在第 `i` bit 是否為 1。

```python
def singleNumber(nums: list[int]) -> int:
    ans = 0
    for i in range(32):
        bit_count = 0
        for num in nums:
            bit_count += (num >> i) & 1
        if bit_count % 3:
            ans |= 1 << i

    if ans >= 1 << 31:
        ans -= 1 << 32
    return ans
```

- **為什麼 Python 負數還能這樣做：** 這裡只看固定 32 個 bit，`(num >> i) & 1` 等價於取 32-bit two's complement 的第 `i` 位。
- **最後要轉回 signed：** 若第 31 位被設成 1，`ans` 目前是 unsigned 視角，要做 `ans -= 2^32`。
- **常見錯法：**
  - 以為這題還能直接 XOR。
  - 用 `while num:` 拆 bit，負數會被 Python 的無限長 signed int 搞壞。
  - 忘記最後把 32-bit unsigned 轉回 signed。

---

## LC 338. Counting Bits

**範例：** `n = 5` → `[0,1,1,2,1,2]`

給定 `n`，回傳 `0..n` 每個數字的二進位表示中有幾個 `1`。

**關鍵洞察**：`i >> 1` 等於把最低位拿掉，所以 `bits[i] = bits[i >> 1] + (i & 1)`。

```python
def countBits(n: int) -> list[int]:
    bits = [0] * (n + 1)
    for i in range(1, n + 1):
        bits[i] = bits[i >> 1] + (i & 1)
    return bits
```
