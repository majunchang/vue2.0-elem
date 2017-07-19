<template>
  <div class="ratings">
    <div class="rating-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class='title'>送达时间</span>
            <span class='delivery'>{{ seller.deliveryTime }}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect @increment="incrementotal" :select-type="selectType" :only-content="onlyContent"
                    :ratings="ratings"></ratingselect>
      <div class="rating-wrapper border-1px">
        <ul>
          <li v-for='rating in ratings' class='rating-item' v-show='needShow(rating.rateType,rating.text)'>
            <div class="avatar">
              <img :src="rating.avatar" alt="" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">
                {{rating.deliveryTime}}
              </span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend &&rating.recommend.length">
                <i class="iconfont"
                   :class="{'icon-damuzhi':rating.rateType === 0,'icon-down':rating.rateType === 1,}"></i>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import star from '../star/star.vue'
  import split from '../split/split.vue';
  import ratingselect from '../ratingselect/ratingselect.vue';
  import BSscroll from 'better-scroll'
  import {formatDate} from '../../common/js/date'

  const ALL = 2
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data(){
      return {
        ratings: [],
        showFlag: false,
        selectType: ALL,
        onlyContent: true
      };
    },
    created() {
      // 通过请求 去获得相关的数据 插件的名称是vue-resource
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.error_code === 0) {
          this.ratings = response.data;
          this.$nextTick(() => {
            this.scroll = new BSscroll(this.$el, {
              click: true
            })
          })
        }
      });
    },
    methods: {
      needShow(raingType, text){
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        }else {
            return raingType === this.selectType;
        }
      },
      incrementotal(type,data){
          if(type === 'onlyContent'){
              data = !data
          }
          this[type] = data;
          this.$nextTick(()=>{
              this.scroll.refresh();
          })
      },
    },
    filters: {
      formatDate(time){
          let date = new Date(time);
          return formatDate(date,'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      star,
      split,
      ratingselect
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "ratings.styl"
</style>
