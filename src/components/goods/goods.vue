<template>
  <div class="good">
    <div class="menu-wrapper" ref='menuWrapper'>
      <ul>
        <!--使用计算属性为菜单栏添加类名-->
        <li v-for='(item,index) in goods' class='menu-item border-1px' :class="{'current':currentIndex === index}"
            @click="selectMenu(index, $event)">
            <span class='text'>
              <span class='icon' v-show='item.type>0' :class='classMap[item.type]'></span>{{ item.name }}
            </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref='foodWrapper'>
      <ul>
        <li v-for='item in goods' class='food-list food-list-hook'>
          <h1 class='title'>{{item.name}}</h1>
          <ul>
            <li v-for='food in item.foods' class='food-item' @click='selectFood(food, $event)'>
              <div class='icon'>
                <img :src="food.icon" alt="" width='57'>
              </div>
              <div class='content'>
                <h2 class='name'>{{food.name}}</h2>
                <p class='desc'>{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span>
                  <span class="count">好评{{food.rating}}</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span class="old"
                                                                v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartControl-wrapper">
                  <cartControl :food='food' @increment='incrementTotal'>

                  </cartControl>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div>
      <shopcart ref='shopcart' :select-foods='selectFoods' :delivery-price='seller.deliveryPrice'
                :min-price='seller.minPrice'>

      </shopcart>
      <food :food='selectedFood' @increment='incrementTotal' ref='food'></food>
    </div>
  </div>
</template>

<script>
  // 引入滚动插件
  import BScroll from 'better-scroll'
  import shopcart from '../shopcart/shopcart'
  import cartControl from '../cartControl/cartControl'
  import food from '../food/food.vue'

  const ok_code = 0;
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data(){
      return {
        goods: [],
        listHeight: [],
        scrolly: 0,
        selectedFood: {}
      }
    },
    created(){
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.error_code === ok_code) {
          this.goods = response.data;
          this.$nextTick(() => {
            this.initScroll();
            this.calculateHeight();
          });
        }
      });
    },
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
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        // 如果这里给了返回值  那么子组件中的 默认值就会失效
        //return [{price: 20, count: 2}];
        return foods;
      }
    },
    methods: {
      initScroll(){
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodScroll = new BScroll(this.$refs.foodWrapper, {
          probeType: 3,// 实时派发scroll事件
          click: true
        });
        console.log('初始化页面');
        // 拿到食物栏滚动的距离
        this.foodScroll.on('scroll', (pos) => {
          this.scrolly = Math.abs(Math.round(pos.y));
        });
      },
      //将页面中的dom（食物的高度）添加进一个数组之中
      calculateHeight(){
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
        let DomHeight = 0;
        this.listHeight.push(DomHeight);
        for (var i = 0; i < foodList.length; i++) {
          DomHeight += foodList[i].clientHeight;
          this.listHeight.push(DomHeight);
        }
      },
      selectMenu(index, event){
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
      incrementTotal(target){
        // 通过这个去让shopcart组件 响应这个事件去\
        console.log('incre');
        this.$refs.shopcart.drop(target)
      },
      selectFood(food,event){
        if(!event._constructed){
          return
        }
        this.selectedFood = food;
        this.$refs.food.show();
        console.log('点了了food');
      }
    },
    components: {
      shopcart,
      cartControl,
      food
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "goods.styl"
</style>
