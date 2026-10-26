---
title: 一些需要注意的地方
date: 2026-10-04
category: 竞赛
---

1. 树剖重儿子有没有continue
2. 结构体有没有少传参
3. 函数返回值是否正确
4. 高斯消元自由元取值不完全随意，可能会影响其他元
5. 点分治，点分树注意递归执行时，rt会变
6. 1ull<<64 a[++tot]=tot 1<<31 vector失效
7. 注意数组大小可能不一致
8. 记得写函数类型
9. 清空
10. cout注意输出顺序
11. log是ln
12. SPFA不要忘记!inq
13. 数组别给定义成char了
14. bool大小一个字节
15. 该改回来的改回来了没
16. 树剖先预处理才能调用
17. 注意输出格式
18. n,m不要写反
19. 读题读题读题！！！每个字都要读！！！！！

一些windows和linux环境不同的地方。

我怎么高二了。。。

结构体大括号别强转，该是int是int，该是longlong是longlong，该是double是double，会错的哥们！！！

```
answer.code:89:44: error: narrowing conversion of ‘1.0e+18’ from ‘double’ to ‘ll {aka long long int}’ inside { } [-Wnarrowing]
  tr[u].mn=tr[u].mnv[0]=tr[u].mnv[1]={1e18,0}; tr[u].len=r-l+1;
```

还有什么著名的

```c++
friend operator + (const Node x,const Node y) {

} 
```

恭喜你少写了返回值类型，CE了

还有什么abs(__int128)

求求你了别挂分了。。。

下辈子都调不出来代码了

经典

lower_bound(lsh+1,lsh+n+1,x)

经典ub之

1ull<<64 a[++tot]=tot 1<<31 vector失效