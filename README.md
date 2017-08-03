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
3. 在webpack.base.conf.js中 在alias中怎加别名
```
 'vue$': 'vue/dist/vue.esm.js',
      'src': path.resolve(__dirname, '../src'),
      'common': path.resolve(__dirname, '../src/common'),
      'components': path.resolve(__dirname, '../src/components')
```
# 技术实现点

### 技术点一：菜单栏与商品栏的联动 


 #### 实现原理：
 1. 左边是一个数组  右边是一个数组 给左边每一个菜单绑定一个点击事件 当我click的时候 调用scrollToElement实现滚动到相应的位置 
 ```
   if (!event._constructed) {
          return
        }
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodScroll.scrollToElement(el, 300);
//        $('.menu-item').removeClass('current');
//        $('.menu-item')[index].addClass()
        // 在这里有一个问题 就是 菜单栏不随之改变
//
      },
```
 2. 我们声明一个高度数组 当你滚动的时候 监听滚动事件 获取滚动的高度 将它与我们声明的高度数组作比较 得出索引 

```
// 拿到食物栏滚动的距离
        this.foodScroll.on('scroll', (pos) => {
          this.scrolly = Math.abs(Math.round(pos.y));
        });
        
     computed: {
      currentIndex() {
        // 根据scrolly的值 与高度数组做比较
        for (var i = 0; i < this.listHeight.length; i++) {
          var preH = this.listHeight[i];
          // 该数组为递增数组
          var oldH = this.listHeight[i + 1];
          // 在进行判断的时候要注意 当i为len-1的时候 是没有oldH的
          if (!oldH || (preH <= this.scrolly && oldH > this.scrolly)) {
            return i;
          }
        }
        return 0;
      },
```
### 技术点二：添加商品动画 
1.  使用$emit去触发 父组件中的方法  css部分主要是使用平移和旋转 加上vue的过渡类名  点击+号以后触发的行为  首先是触发父组件的方法 然后父组件调用shopcart组件的drop方法 
2.  shopcart组件中 对于dropBalls 数组 增加了beforeEnter enter  afterEnter事件
```
 methods: {
      addCart(event){
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          // this.food.count = 1;
        // vue中 深入响应式变化
          Vue.set(this.food,'count',1);
        } else {
          this.food.count++;
        }
        console.log('majunchang');
        console.log(event.target);
        //通过emit 去触发父组件的方法 父组件可以使用v-on
        this.$emit('increment',event.target);
      },
      },
      
      incrementTotal(target){
        // 通过这个去让shopcart组件 响应这个事件去\
        console.log('incre');
        this.$refs.shopcart.drop(target)
      },
      
      drop(el){
          console.log('drop');
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeEnter(el){
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -( window.innerHeight - rect.top - 32);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      enter(el){
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
        })
      },
      afterEnter(el){
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
```

### 技术点三：购物车部分动画
####  给父组件传入的数据中动态的增加了 一个key值 也就是count属性 我们要 这个属性；来进行累加计算总价 和 购买商品的总数 

```

```
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
