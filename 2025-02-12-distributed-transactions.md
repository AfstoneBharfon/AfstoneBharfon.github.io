---
layout: post
title: "The Hidden Cost of Distributed Transactions: What Nobody Tells You"
subtitle: "After three years running distributed systems at scale, I've come to believe most teams adopt microservices before they're ready."
date: 2025-02-12
tags: [Architecture, Backend]
read_time: 8
---

The pitch for microservices is seductive: independent deployments, team autonomy, resilience through isolation. What gets mentioned less often is what you give up the moment you split a monolith across network boundaries — and chief among those things is the humble, reliable database transaction.

## The Monolith's Secret Weapon

In a monolithic application backed by a single relational database, transactions are almost too easy. You open one, do several things, and either all of them commit or none of them do. The database guarantees it. You almost never have to think about it.

This guarantee — ACID atomicity — is so fundamental that most developers don't fully appreciate it until it's gone. And it's completely gone the moment your data lives in two different services, two different databases.

```sql
-- In a monolith: trivially atomic
BEGIN;
  UPDATE accounts SET balance = balance - 100 WHERE id = $1;
  UPDATE accounts SET balance = balance + 100 WHERE id = $2;
  INSERT INTO transactions (from_id, to_id, amount) VALUES ($1, $2, 100);
COMMIT; -- Either all three happen, or none do.
```

Split this across two services and a message bus and you've just signed up for a very different kind of problem.

## What You're Actually Dealing With

There are exactly three patterns teams reach for when they need cross-service consistency, and they all come with significant tradeoffs that don't become apparent until you're on-call at 2am.

**Two-Phase Commit (2PC)** is the "correct" solution in theory. A coordinator asks all participants to prepare, then tells them to commit. The problem is that between prepare and commit, participants are in a blocked, locked state. If the coordinator dies, you have a distributed deadlock. In practice, 2PC is rarely used in modern microservice architectures for this reason.

**Sagas** are the pattern most teams land on. A saga is a sequence of local transactions, where each step publishes an event or message that triggers the next. When a step fails, you execute compensating transactions to undo previous steps. This works well — until your compensating transaction also fails.

**Eventual consistency** is what you get when you give up on strong consistency entirely. You accept that your system may be in an inconsistent state for a window of time, and you design your product and UI to tolerate this. This is often the right answer, but it requires a very deliberate product conversation that rarely happens early enough.

## The Real Problem: Operational Complexity

The theoretical challenges are manageable with enough engineering. What's harder to account for is the operational cost.

With distributed transactions, you now need to monitor saga state machines across multiple services. You need tooling to identify and manually resolve stuck sagas. You need to reason about which partial failures are safe to retry and which aren't idempotent. You need runbooks for every failure mode — and the failure modes multiply combinatorially with each service you add to a workflow.

I've seen teams spend more engineering time on their distributed transaction infrastructure than they saved by splitting the monolith in the first place.

## A Heuristic Worth Keeping

Before splitting a service boundary, ask: *"Does any business operation need to modify data on both sides of this boundary atomically?"* If the answer is yes, think very carefully. That boundary might be the wrong place to cut.

This doesn't mean microservices are wrong. It means that service boundaries should follow transaction boundaries, not team org charts or domain nouns. The data that changes together should live together — at least until you have the infrastructure and operational maturity to manage the complexity of splitting it.

The teams I've seen do this well share a common trait: they started with a modular monolith, extracted services only when they had a clear scalability or deployment justification, and moved slowly enough to feel the pain before it became a crisis.

The textbooks will tell you the patterns. Experience will tell you which one you actually want to use.
