<template>
  <div class='header'>
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="" width='64' height='64'>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliverTime}}分钟送达
        </div>
        <div v-if='seller.supports' class='support'>
          <span class='icon' :class='classMap[seller.supports[0].type]'></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click='showDetail'>
        <span class="count">{{seller.supports.length}}个</span>
        <i class='icon iconfont icon-zuoyoujiantou'></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click='showDetail'>
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon iconfont icon-zuoyoujiantou"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" class="" width="100%" height="100%">
    </div>
    <transition name='fade'>
      <div class="detail" v-show='detailShow' @click='hideDetail'>
        <div class="detail-wrapper clearFix">
          <div class="detail-main">
            <h1 class='name'>{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size=48 :score='seller.score'></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if='seller.supports' class="supports">
              <li class='support-item' v-for='(item,index) in seller.supports' track-by='$index'>
                <span class='icon' :class='classMap[seller.supports[index].type]'></span>
                <span class='text'>{{ seller.supports[index].description }}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class='content'>{{ seller.bulletin }}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="iconfont icon-cha"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  // 将星星封装为一个组件 在这里进行引入
  import star from '../star/star'
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data(){
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      hideDetail(){
        this.detailShow = false;
      }
    },
    created(){
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components:{
      star
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "header.styl"
</style>
