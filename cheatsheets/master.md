# Cheat Sheet — 面試前速查

> 這裡的每一條都來自你個人踩過的坑。面試前 30 分鐘掃一遍。

## Two Pointers

- **相向指標正確性論證：** 每次移動都排除一個不可能更優的配對，所以不會漏答案。
- **Trapping Rain Water 核心：** 每個位置的水量 = `min(leftMax, rightMax) - height[i]`。Two pointer 版本：**max 小的那邊水量已確定**（另一邊一定 ≥ 它），所以先處理小的那邊、移動指標。先移指標再更新 max，確保差值 ≥ 0。
- **讀寫指標口訣：** read 掃全部，write 只在該放東西時往前。兩者的差距就是被過濾掉的元素。
