---
layout: post
title: "Computation Graphs: The Backbone of Modern ML"
date: 2026-02-15 11:14:29 -0500
categories: machine-learning fundamentals
---

If you've ever trained a neural network, you've used a computation graph, you just might not have thought about it explicitly. Let's fix that.

## What is a Computation Graph?

A computation graph is a way of representing a mathematical expression as a directed graph. There are two types of nodes: **value nodes** (variables and intermediate results) and **operation nodes** (like addition or multiplication). Edges carry values flowing from one node to the next.

Take a simple expression:

```
z = (x + y) * w
```

As a graph, this looks like:

```
[x] ─┐
     ├─► [+] ─► [x+y] ─► [*] ─► [z]
[y] ─┘                     ▲
                            │
                           [w]
```

Where `[x]`, `[y]`, `[w]`, `[x+y]`, and `[z]` are value nodes, and `[+]` and `[*]` are operation nodes. Both are first-class citizens in the graph — the values aren't just implicit labels on edges, they're nodes that can be reasoned about independently.


## Why Do We Care?

The real power shows up when you need to compute **gradients** — which is exactly what happens during neural network training.

Because the graph tracks every operation and every intermediate value, it lets us apply the chain rule systematically, working backwards from the output to each input. This is called **backpropagation**, and the computation graph is what makes it mechanical and automatable.

Crucially, **gradients live on the value nodes**. During the backward pass, each value node accumulates the gradient of the final output with respect to itself. So after backprop, `x` doesn't just hold its forward value `2.0`, it also holds `dz/dx`.

Frameworks like PyTorch and TensorFlow build this graph for you as your code runs, then traverse it in reverse to compute gradients with a single call to `.backward()`.

## A Concrete Example

```python
import torch

x = torch.tensor(2.0, requires_grad=True)
y = torch.tensor(3.0, requires_grad=True)
w = torch.tensor(4.0, requires_grad=True)

z = (x + y) * w  # z = 20.0

z.backward()

print(x.grad)  # dz/dx = w = 4.0
print(y.grad)  # dz/dy = w = 4.0
print(w.grad)  # dz/dw = (x + y) = 5.0
```

PyTorch quietly built a computation graph as you wrote `z = (x + y) * w`, tracking both the value nodes (`x`, `y`, `w`, the intermediate `x+y`, and `z`) and the operation nodes (`+` and `*`). Calling `z.backward()` walked it in reverse, depositing gradients onto each value node along the way.

## Static vs. Dynamic Graphs

There are two flavors worth knowing:

**Static graphs** (TensorFlow 1.x style) require you to define the full graph upfront before running any computation. This enables aggressive optimization but makes debugging painful.

**Dynamic graphs** (PyTorch style) build the graph on the fly as operations execute. The graph is recreated each forward pass, which makes it feel like normal Python code and much easier to reason about.

Most modern frameworks have converged toward dynamic graphs for the developer experience, while finding other ways to optimize performance.

## The Takeaway

Computation graphs aren't just an implementation detail — they're the reason automatic differentiation works at scale. Understanding them gives you better intuition for why frameworks behave the way they do, and helps when things go wrong.

Next time you call `.backward()`, you'll know what's actually happening under the hood.