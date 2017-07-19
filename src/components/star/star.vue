<template>
  <div class="star">
    <div class="star-item" :class='starType'>
      <span v-for='itemClass in  itemClasses' :class='itemClass' class='star-item-span'>

      </span>
    </div>
  </div>
</template>

<script>
  const len = 5;
  const cls_on = 'on';
  const cls_half = 'half';
  const cls_off = 'off';

  export default{
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size;
      },
      itemClasses(){
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1 !== 0;
        let integer = Math.floor(score);
        // 对类名 进行拼接 并添加到数组中
        for (var i = 0; i < integer; i++) {
          result.push(cls_on);
        }
        if (hasDecimal) {
          result.push(cls_half)
        }
        while (result.length < len) {
          result.push(cls_off);
        }
        return result;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "star.styl"
</style>
