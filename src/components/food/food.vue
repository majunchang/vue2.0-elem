<template>
  <transition name='fade'>
    <div class="food" v-show='showFlag'>
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="">
          <div class="back" @click='hide'>
            <i class="iconfont icon-weibiaoti6-copy"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating"> 好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartControl-wrapper">
            <cartControl :food=food></cartControl>
          </div>
          <transition name='buy'>
            <div class="buy" @click.stop.prevent='addFirst' v-show="!food.count || food.count === 0">
              加入购物车
            </div>
          </transition>
        </div>
        <split v-show='food.info'></split>
        <div class="info" v-show='food.info'>
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect :ratings='food.ratings' :select-type='selectType' :only-content='onlyContent' :desc='desc'
                        @increment='incrementotal'></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType, rating.text)" class="rating-item border-1px"
                  v-for="rating in food.ratings">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img width="12" height="12" :src=rating.avatar alt="" class="avatar">
                </div>
                <div class="time">{{rating.rateTime | formatDate }}</div>
                <p class="text">
                  <i class="iconfont"
                     :class="{'icon-damuzhi':rating.rateType === 0,'icon-down':rating.rateType === 1,}"></i>
                  {{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || food.ratings.length === 0"></div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import BScroll from 'better-scroll'
  // 引入 购物车的控制组件
  import cartControl from '../cartControl/cartControl.vue'
  import Vue from 'vue'
  // 引入 间隙组件
  import split from '../split/split'
  // 引入rating组件
  import ratingselect from '../ratingselect/ratingselect.vue'
  import {formatDate} from '../../common/js/date'
  const ALL = 2;
  export default{
    props: {
      food: {
        type: Object
      }
    },
    data(){
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    methods: {
      show(){
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = false;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$el, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
        console.log('应该支持滑动效果');
      },
      hide(){
        this.showFlag = false;
      },
      addFirst(event){
        if (!event._constructed) {
          return
        }
        console.log(event.target);
        Vue.set(this.food, 'count', 1);
        this.$emit('increment', event.target);
      },
      incrementotal(type, typeNumber){
        console.log('majunchang');
        if(type=='onlyContent'){
            typeNumber = !this.onlyContent
        }
        this[type] = typeNumber;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      needShow(type,text){
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
    },
    filters:{
      formatDate (time){
            let date = new Date(time);
            return formatDate(date,'yyyy年MM月dd hh:mm');
        }
    },
    components: {
      cartControl,
      split,
      ratingselect
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "food.styl";
</style>
