---
title: JavaScript 异步编程笔记：从回调到 async/await
date: 2025-01-12
category: 编程笔记
tags: [JavaScript, 异步, Promise]
description: 把 Promise、async/await 和常见并发控制在脑子里理成一条线。
---

# JavaScript 异步编程笔记

## 回调地狱长什么样

嵌套三层以后，错误处理和阅读顺序都会失控：

```js
getUser(id, (err, user) => {
  if (err) return handle(err)
  getOrders(user.id, (err, orders) => {
    if (err) return handle(err)
    getDetail(orders[0].id, (err, detail) => {
      // 已经不想看了
    })
  })
})
```

## Promise 把嵌套拍平

```js
getUser(id)
  .then((user) => getOrders(user.id))
  .then((orders) => getDetail(orders[0].id))
  .catch(handle)
```

要点：

- `then` 里返回一个 Promise，链就会等它
- 只要有一个环节 reject，直接跳到最近的 `catch`
- `.catch` 要放在链的末尾，不要每个 `then` 后面都挂一个

## async/await 更像同步代码

```js
async function load(id) {
  try {
    const user = await getUser(id)
    const orders = await getOrders(user.id)
    return await getDetail(orders[0].id)
  } catch (err) {
    handle(err)
  }
}
```

`await` 只能写在 `async` 函数里；`async` 函数的返回值永远是一个 Promise。

## 并发：别把并行写成了串行

下面这两段代码结果一样，耗时差一倍：

```js
// 串行：一个等一个
const a = await fetchA()
const b = await fetchB()

// 并行：同时发出
const [a, b] = await Promise.all([fetchA(), fetchB()])
```

几个常用组合子：

| 方法 | 行为 |
| --- | --- |
| `Promise.all` | 全部成功才成功，一个失败就失败 |
| `Promise.allSettled` | 等全部结束，不管成败，返回每个结果 |
| `Promise.race` | 谁先结束用谁（做超时很顺手） |
| `Promise.any` | 第一个成功的胜出 |

## 超时控制的小技巧

```js
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('请求超时')), ms)
  )
  return Promise.race([promise, timeout])
}
```

## 容易踩的坑

1. **`forEach` 里 `await` 不生效**，要改用 `for...of` 或 `Promise.all`
2. **忘了 `try/catch`**，未捕获的 rejection 在 Node 里会直接终止进程
3. **在循环里串行请求**，能用 `Promise.all` 就别一个个等
4. **并发数太大**打爆接口，需要自己写一个简单的并发池限制数量

## 小结

先想清楚"这些任务之间有没有依赖"，再决定串行还是并行，
异步代码就不会写成一团乱麻。
