# vue2.0 项目---饿了吗

> ### 本项目使用vue-cli+webpack 构建 

> ### 本项目使用了 vue+vue-resource+vue-router 使用webpack作为打包模板

1. 在dev-server.js 中   对于假数据  使用这样的方式去处理

```
var app = express()
// 在这里增加自己的代码
var appData = require('../data.json');
var goods = appData.goods;
var seller = appData.seller;
var ratings = appData.ratings;

// http://www.expressjs.com.cn/4x/api.html#router
var appRoute = express.Router();
appRoute.get('/goods',function (req,res) {
  res.json({
    error_code:0,
    data:goods
  })
})
appRoute.get('/seller',function (req,res) {
  res.json({
    error_code:0,
    data:seller
  })
})
appRoute.get('/ratings',function (req,res) {
  res.json({
    error_code:0,
    data:ratings
  })
})

app.use('/api',appRoute);
```
2. 使用了better-scroll作为滑动插件 进行了组件化的处理 组件之间使用props和$emit进行通信


---

###  项目运行方式 

   ### 克隆项目地址以后  npm install 
   ###  安装好相关依赖   执行 npm run dev 
   
## 系统截图

---
### 项目预览图1
   ![mark](http://oneg19f80.bkt.clouddn.com/blog/20170719/163909413.gif)
   
### 项目预览图2
   ![mark](http://oneg19f80.bkt.clouddn.com/blog/20170719/221612461.gif)
###  git不定期更新 对于项目中的疑问 欢饮留言 或者联系我的qq  2471978285
