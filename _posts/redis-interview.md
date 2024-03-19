---
title: 'Redis 缓存管理机制'
excerpt: 'Redis 缓存管理机制'
coverImage: 'https://raw.githubusercontent.com/redis/redis-io/master/public/images/redis-logo.svg'
date: '2024-03-19T04:49:15.469Z'
author:
  name: Coda
  picture: 'https://avatars.githubusercontent.com/u/23135654?v=4'
ogImage:
  url: 'https://raw.githubusercontent.com/redis/redis-io/master/public/images/redis-logo.svg'
---

## Redis

Redis 自己的定位是内存数据库并可以持久化数据到硬盘，数据以K/V形式保存。由 [Antirez](https://github.com/antirez) 创建。

> Redis is an in-memory database that persists on disk. The data model is key-value, but many different kind of values are supported: Strings, Lists, Sets, Sorted Sets, Hashes, Streams, HyperLogLogs, Bitmaps.

在没有 Redis 之前用户发送的每一次请求需要直接在数据库上做读/写操作，当用户越来越多请求也随之暴涨，而数据库的请求大多是重复查询一个东西数据库需要时间去读硬盘，后来就有了给数据库加缓存于是 Redis 就出现了。

> 固态硬盘（SSD）60-170MB/s
> 机械硬盘（HDD）150-300MB/s。
> 内存（RAM）2-50GB/s。

## RAM 清理 [Key eviction](https://redis.io/docs/reference/eviction/)

随着应用运行缓存在 Redis 的数据越来越多，需要有个清理机制来确保内存不会爆掉

### 定期删除

缓存内容由应用设置超时时间，Redis 100ms 执行一次清理过期内容，由于数据可能很多，Redis 随机选择一部分删除

### 惰性删除

查询请求过期的内容 Redis 立即删除

### 内存淘汰策略

- **noeviction**: New values aren’t saved when memory limit is reached. When a database uses replication, this applies to the primary database 返回错误，不会删除任何键值
- **allkeys-lru**: Keeps most recently used keys; removes least recently used (LRU) keys 使用LRU算法删除最近最少使用的键值
- **allkeys-lfu**: Keeps frequently used keys; removes least frequently used (LFU) keys 从所有键中删除使用频率最少的键
- **volatile-lru**: Removes least recently used keys with the expire field set to true. 使用LRU算法从设置了过期时间的键集合中删除最近最少使用的键值
- **volatile-lfu**: Removes least frequently used keys with the expire field set to true. 从配置了过期时间的键中删除使用频率最少的键
- **allkeys-random**: Randomly removes keys to make space for the new data added. 从所有key随机删除
- **volatile-random**: Randomly removes keys with expire field set to true. 从设置了过期时间的键的集合中随机删除
- **volatile-ttl**: Removes keys with expire field set to true and the shortest remaining time-to-live (TTL) value. 从设置了过期时间的键中删除剩余时间最短的键

## 缓存击穿

频繁查询不存在的数据 Redis 无法缓存导致数据库频繁操作

布隆过滤器 [bloom-filter](https://redis.io/docs/data-types/probabilistic/bloom-filter/)

## 缓存雪崩

缓存集体失效导致数据库频繁操作。

过期时间均匀分布，热点数据永不过期

## Reference

[https://redis.com/glossary/lru-cache/](https://redis.com/glossary/lru-cache/)
