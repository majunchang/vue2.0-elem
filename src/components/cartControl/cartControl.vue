<template>
  <div class="cartControl">
    <transition name='fade'>
      <div class="cart-decrease" v-show="food.count>0"  @click.stop.prevent='decreaseCart($event)'>
        <transition name='inner'>
          <span class="inner iconfont icon-jian" ></span>
        </transition>
      </div>
    </transition>

    <span class="cart-count" v-show="food.count > 0 ">
      {{food.count}}
    </span>
    <span class="iconfont icon-jia cart-add" @click.stop.prevent="addCart($event)"></span>
  </div>
</template>

<script>
import Vue from 'vue'
  export default{
    props: {
      food: {
        type: Object
      }
    },
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
      decreaseCart(event){
          if(!event._constructed){
              return
          }
          this.food.count--;
      }
    }
  }
</script>

<style   lang="stylus" rel="stylesheet/stylus">
  @import "cartControl.styl";
</style>
