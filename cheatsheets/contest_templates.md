# Contest Templates — 比賽專用模板

> 面試不需要背這些，純粹為了 contest 速度。

## Combination + MOD

```python
MOD = 10**9 + 7
fact = [1] * (n + 1)
for i in range(1, n + 1):
    fact[i] = fact[i-1] * i % MOD
inv = [1] * (n + 1)
inv[n] = pow(fact[n], MOD - 2, MOD)  # Fermat's little theorem
for i in range(n - 1, -1, -1):
    inv[i] = inv[i+1] * (i+1) % MOD

def C(a, b):
    if b < 0 or b > a: return 0
    return fact[a] * inv[b] % MOD * inv[a-b] % MOD
```

## 快速 IO（大量輸入時）

```python
import sys
input = sys.stdin.readline
```

## Vandermonde's Identity

`Σ C(m, i) * C(n, k-i) = C(m+n, k)`

當你看到兩邊分別選然後加總，直接化簡成一個 C。
