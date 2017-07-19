<template>
<div>
  <div class="shopcart">
    <div class="content" @click='toggleList'>
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <i class='iconfont icon-gouwuche'
               :class="{'highlight':totalCount>0}"></i>
          </div>
          <div class="num" v-show='totalCount>0'>
            {{totalCount}}
          </div>
        </div>
        <div class="price" :class="{'highlight': totalPrice > 0}">
          ￥{{totalPrice}}
        </div>
        <div class="desc">
          另需配送费￥{{deliveryPrice}}元
        </div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass" @click.stop.prevent='pay'>
          {{payDesc}}
        </div>
      </div>
      <div class="ball-container">
        <div v-for='ball in balls'>
          <transition name='drop' @before-enter='beforeEnter' @enter='enter' @afterEnter='afterEnter'>
            <div v-show='ball.show' class='ball'>
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <transition name='fade'>
      <div class="shopcart-list" v-show='listShow'>
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click.stop='empty'>清空</span>
        </div>
        <div class="list-content" ref='listContent'>
          <ul>
            <li class="shopcart-food" v-for='food in selectFoods'>
              <span class='name'>{{food.name}}</span>
              <div class="price"><span>￥{{food.price * food.count}}</span></div>
              <div class="cartControl-wrapper">
                <cartControl :food="food"></cartControl>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
    <transition name='fade'>
      <div class="list-mask" v-show='listShow' @click='hideList()'></div>
    </transition>

</div>

</template>

<script>
  // 引入cartControl组件
  import cartControl from '../cartControl/cartControl.vue';
  // 引入 移动端的滚动插件
  import BScroll from 'better-scroll';
  export default {
    props: {
      selectFoods: {
        type: Array,
        // 如果 type是一个对象或者数组 那个他的默认值 就需要以函数的形式去展现
        default(){
          return [{price: 20, count: 2}];
        }
      },
      deliveryPrice: {
        type: Number,
        defalut: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data(){
      return {
        balls: [{show: false}, {show: false}, {show: false}, {show: false}, {show: false}],
        dropBalls: [],
        fold: true
      }
    },
    computed: {
      // 总价格 是你选择是饭量与饭的价格的成绩
      totalPrice(){
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total;
      },
      totalCount(){
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        })
        return count;
      },
      payDesc(){
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        } else {
          return '去结算';
        }
      },
      payClass(){
        if (this.totalPrice < this.minPrice) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      },
      listShow(){
        if (!this.totalCount) {
          this.fold = true;
          return false
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            }else {
                this.scroll.refresh();
            }
          });
        }
        return show;
      }
    },
    methods: {
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
      toggleList(){
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold;
        console.log(this.fold);
      },
      empty(){
        this.selectFoods.forEach((food)=>{
            food.count = 0;
        })
      },
      hideList(){
        this.fold = true;
        console.log('hide');
      },
      pay(){
        if(this.totalPrice < this.minPrice){
            return;
        }
        window.alert(`支付${this.totalPrice}元`);
      }
    },
    components: {
      cartControl
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "shopcart.styl";
</style>
