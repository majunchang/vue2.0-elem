<template>
  <div class="ratingselect">
    <div class="rating-type">
    <span class='block positive' @click="select(2, $event)" :class="{'active': selectType === 2}">{{desc.all}}
      <span class='count'>{{ratings.length}}</span>
    </span>
      <span class="block positive" @click="select(0, $event)" :class="{'active': selectType === 0}">{{desc.positive}}
      <span class='count'>{{positives.length}}</span>
    </span>
      <span class="block negative" @click="select(1, $event)" :class="{'active': selectType === 1}">{{desc.negative}}
      <span class='count'>{{negatives.length}}</span>
    </span>
    </div>
    <div class="switch" :class="{'on':onlyContent}" @click="toggleContent($event)">
      <i class="iconfont icon-gou"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 0;
  export default{
    props: {
      ratings: {
        type: Array,
        default(){
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '吐槽'
          };
        }
      }
    },
    computed: {
      positives(){
        return this.ratings.filter((ratings) => {
          return ratings.rateType === POSITIVE;
        });
      },
      negatives(){
        return this.ratings.filter((ratings) => {
          return ratings.rateType === NEGATIVE;
        })
      }
    },
    methods: {
      select(typeNumber, event){
        if (!event._constructed) {
          return
        }
        console.log('liuyifei');
        /*
         用的原理是  刚开始 food组件 传递给 rat组件一个selectType  然后 rat组件的3个块里面 每个都有一个点击事件
         你点击了以后 再将这个selectType传递给父组件 父组件在给子组件  这样
         */
        //this.selectType = typeNumber;
        /*
         通过emit触发父组件的方法increment  还可以传递参数
         第二个参数及以后的参数 会被传递
         */
        this.$emit('increment', 'selectType', typeNumber);
      },
      toggleContent($event){
        if (!$event._constructed) {
          return
        }
        //this.onlyContent = !this.onlyContent;
        this.$emit('increment', 'onlyContent', this.onlyContent)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "ratingselect.styl";
</style>
