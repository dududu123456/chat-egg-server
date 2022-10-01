# egg-example2



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org


### 目录结构

### router
1. query/parmas
2. get/post
3. post请求需要安装egg-cors，解决csrf跨域问题
4. 配置 plugin.js、config.default.js内容（plugin似乎可以不配置）
5. post请求，使用 postman时需要使用 x-www-form-urlencoded
6. router.js路由拆分
  - 新建router目录，及其下新建xxx.js、xxx2.js等文件
  - router.js文件中使用 `...require('./router/xxx')(app)`导入



### mysql
1. 安装egg-mysql
2. 


### socket.io (https://www.eggjs.org/zh-CN/tutorials/socketio#%E4%BD%BF%E7%94%A8-egg-socketio)
1. socket.io-client 的版本不能使用最新的4.x（改成了2.3.0才行）
2. 使用高版本，一直在ping，没有执行connect的连接成功回调（使用3.x也不行，必须2.3.0？？？）
3. 服务器中 socket单独对应 app/io 文件夹，包括controller、middleware
4. middleware中的 auth.js/filter.js
    分别对应connection/packet（即config.default.js中io模块配置的 namespace 命名空间）
    connection： 在每一个客户端连接或者退出时发生作用，故而我们通常在这一步进行授权认证，对认证失败的客户端做出相应的处理
    packet: 作用于每一个数据包（每一条消息）；在生产环境中，通常用于对消息做预处理，又或者是对加密消息的解密等操作

5. 所有用户推送，只需要将join的用户加入到相同的房间名中（比如all），获得消息时将该消息推送给该房间
    

### egg-redis
1. 缓存，因 socket消息的推送需要针对对应socketId，但无法获知其他用户的id
2. 所以需要 对 socketId 和 userId 进行映射
3. 使用redis处理这个问题



