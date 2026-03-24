# Cheat Sheet — 面試前速查

> 這裡的每一條都來自你個人踩過的坑。面試前 30 分鐘掃一遍。

## Two Pointers

- **相向指標正確性論證：** 每次移動都排除一個不可能更優的配對，所以不會漏答案。
- **Trapping Rain Water 核心：** 每個位置的水量 = `min(leftMax, rightMax) - height[i]`。Two pointer 版本：**max 小的那邊水量已確定**（另一邊一定 ≥ 它），所以先處理小的那邊、移動指標。先移指標再更新 max，確保差值 ≥ 0。
- **讀寫指標口訣：** read 掃全部，write 只在該放東西時往前。兩者的差距就是被過濾掉的元素。

## Binary Search

- **只記一個模板：** `while left < right`，`condition(mid)` 成立 → `right = mid`，不成立 → `left = mid + 1`。結束時 `left == right` 就是答案。
- **找右邊界？** 不用另一個模板。反轉 condition，例如「最後一個 ≤ 3」=「第一個 > 3 的位置 - 1」。
- **口訣：** 誰不動（不 ±1）就往誰的反方向取整。`right = mid` → 向下取整。
- **Binary Search on Answer：** 搜尋空間是答案的值域，不是 array index。寫一個 `feasible(mid)` 判斷，套同一個模板。
- **整數 ceiling 技巧：** `(a + b - 1) // b` 等價於 `ceil(a / b)`，避免浮點數精度問題。面試時優先用這個。
- **Rotated Sorted Array 找最小值：** 跟 `nums[right]` 比。`nums[mid] > nums[right]` → 斷點（最小值）在右半，否則在左半（含 mid）。
