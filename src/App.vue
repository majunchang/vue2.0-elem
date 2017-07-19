<template>
  <div >
    <!--头部-->
    <v-header :seller='seller'></v-header>
    <!--主体切换-->
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to='/goods'>
          商品
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to='/ratings'>
          评论
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to='/seller'>
          商家
        </router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller='seller'></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import header from './components/header/header.vue'

  const successCode = 0;
  export default {
    components: {
      'v-header': header
    },
    data(){
      return {
        seller: {}
      }
    },
    created(){
      this.$http.get('api/seller').then((response) => {
        // 此时的response 是一个对象  里面有很多属性
        // https://github.com/pagekit/vue-resource/blob/develop/docs/http.md
        var responseObj = response.body;
        if (responseObj.error_code === successCode) {
          this.seller = responseObj.data;
        }
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './common/stylus/mixin.styl';

  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
  //border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)
</style>

<!--<style>-->
<!--这是原生css版本-->
<!--.tab {-->
<!--display: flex;-->
<!--width: 100%;-->
<!--height: 40px;-->
<!--line-height: 40px;-->
<!--boder-1px(rgba(7, 17, 27, 0.1));-->
<!--}-->

<!--.tab .tab-item {-->
<!--flex: 1;-->
<!--text-align: center;-->
<!--}-->

<!--.tab .tab-item a {-->
<!--display: block;-->
<!--font-size: 14px;-->
<!--color: rgb(77, 85, 93);-->
<!--}-->

<!--.tab .tab-item .active {-->
<!--color: rgb(240, 20, 20);-->
<!--}-->
<!--</style>-->
