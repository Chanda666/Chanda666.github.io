# 计算机网络

计算机网络核心知识点整理，涵盖 OSI 模型、TCP/IP 协议栈、HTTP、DNS 等。

## OSI 七层模型

| 层号 | 名称 | 功能 | 典型协议 |
|------|------|------|---------|
| 7 | 应用层 | 为用户提供网络服务 | HTTP, FTP, SMTP, DNS |
| 6 | 表示层 | 数据格式转换、加密解密 | SSL/TLS, JPEG, ASCII |
| 5 | 会话层 | 建立、管理、终止会话 | NetBIOS, RPC |
| 4 | 传输层 | 端到端可靠传输 | TCP, UDP |
| 3 | 网络层 | 路由选择与转发 | IP, ICMP, OSPF |
| 2 | 数据链路层 | 帧同步、差错控制 | Ethernet, PPP, MAC |
| 1 | 物理层 | 比特流传输 | RJ45, 光纤, 无线电 |

### TCP/IP 四层模型

```
应用层    →  HTTP / FTP / DNS / SMTP
传输层    →  TCP / UDP
网络层    →  IP / ICMP / ARP
网络接口层 →  Ethernet / Wi-Fi
```

## TCP 与 UDP

### TCP（传输控制协议）

- **面向连接**：通信前需要三次握手建立连接
- **可靠传输**：确认应答、超时重传、流量控制、拥塞控制
- **面向字节流**

```
三次握手：
Client → SYN → Server
Client ← SYN+ACK ← Server
Client → ACK → Server
```

```
四次挥手：
Client → FIN → Server
Client ← ACK ← Server
Client ← FIN ← Server
Client → ACK → Server
```

### UDP（用户数据报协议）

- **无连接**：直接发送，不建立连接
- **不可靠**：不保证送达，不保证顺序
- **面向报文**
- 适用于实时应用（视频通话、直播、DNS 查询）

### TCP vs UDP 对比

| 特性 | TCP | UDP |
|------|-----|-----|
| 连接 | 面向连接 | 无连接 |
| 可靠性 | 可靠 | 不可靠 |
| 速度 | 较慢 | 较快 |
| 头部开销 | 20 字节 | 8 字节 |
| 适用场景 | 网页、文件传输、邮件 | 视频流、DNS、VoIP |

## HTTP 协议详解

### HTTP 请求方法

| 方法 | 作用 | 幂等 | 安全 |
|------|------|------|------|
| GET | 获取资源 | ✓ | ✓ |
| POST | 创建资源 | ✗ | ✗ |
| PUT | 更新资源（全量） | ✓ | ✗ |
| PATCH | 更新资源（部分） | ✗ | ✗ |
| DELETE | 删除资源 | ✓ | ✗ |
| HEAD | 获取响应头 | ✓ | ✓ |

### HTTP 状态码

- **1xx**：信息响应
- **2xx**：成功（200 OK, 201 Created, 204 No Content）
- **3xx**：重定向（301 永久, 302 临时, 304 Not Modified）
- **4xx**：客户端错误（400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found）
- **5xx**：服务端错误（500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable）

### HTTP/1.1 vs HTTP/2 vs HTTP/3

| 版本 | 特点 |
|------|------|
| HTTP/1.1 | 文本协议，Keep-Alive 连接复用，队头阻塞 |
| HTTP/2 | 二进制分帧，多路复用，头部压缩（HPACK），服务器推送 |
| HTTP/3 | 基于 QUIC（UDP），0-RTT 连接，无队头阻塞 |

## DNS 解析过程

### 递归查询 + 迭代查询

1. 浏览器缓存 → 2. 操作系统缓存（hosts 文件）→ 3. 本地 DNS 服务器
4. 根域名服务器 → 5. 顶级域名服务器 → 6. 权威 DNS 服务器

### DNS 记录类型

| 类型 | 含义 |
|------|------|
| A | IPv4 地址 |
| AAAA | IPv6 地址 |
| CNAME | 别名（规范名称） |
| MX | 邮件服务器 |
| NS | 域名服务器 |
| TXT | 文本记录（常用于验证） |

## 参考资料

- 《计算机网络：自顶向下方法》
- RFC 文档（RFC 793 - TCP, RFC 2616 - HTTP/1.1, RFC 7540 - HTTP/2）