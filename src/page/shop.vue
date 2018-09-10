<template>
    <div class="top_nav">
        <div>
            <div class="shop_top">
            <div class="shop_top_left">
                <img src="http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg" alt="">
            </div>
            <div class="shop_top_right">
                <h2>效果演示</h2>
                <div>商家配送／分钟送达／配送费¥5</div>
                <div>公告：欢迎光临，用餐高峰请提前下单，谢谢</div>
            </div>
        </div>
        <div class="shop_bar">
            <tab :line-width=1 :scroll-threshold="4">
                <tab-item :selected="currentBar === item" v-for="(item, index) in barList" :key="index" @on-item-click="changeShowType(item)">{{item}}</tab-item>
            </tab>
        </div>
        </div>
        <div class="out_wrap" ref="out_wrap">
            <transition>
                <div class="shop_container" v-show="currentBar === '商品'">
                    <div class="content_left" ref="menuWrapper">
                        <ul>
                            <li :class="{on:menuIndex === index}" v-for="(item,index) in menuList" @click="changeMunu(index,item.id)" :key="item.id">{{item.name}}</li>
                        </ul>
                    </div>
                    <div class="content_right" ref="rightWrapper">
                            <ul class="right_ul">
                                <li v-for="(item,index) in menuList">
                                    <header>
                                        <strong>{{item.name}}</strong>
                                        <span>{{item.description}}</span>
                                    </header>
                                    <section v-for="(foodItem,index) in item.foods" class="munuContent">
                                        <router-link class="munuDetail_link" :to="{path:'/food'}" tag="div">
                                            <div>
                                                <img :src="imgBaseUrl+foodItem.image_path" alt="" />
                                            </div>
                                            <div class="">
                                                <strong>{{foodItem.name}}</strong>
                                                <div class="product">{{foodItem.description}}</div>
                                                <div class="ft12">{{foodItem.tips}}</div>
                                            </div>
                                        </router-link>
                                        <footer>
                                            <div class="orange fx1 tl">
                                                {{foodItem.specfoods[0].price}}
                                            </div>
                                            <div class="fxauto">
                                                <i class="iconfont icon-yuanquanjiahao"></i>
                                            </div>
                                        </footer>
                                    </section>
                                </li>
                            </ul>
                    </div>
                </div>
            </transition>
            <transition>
                <div class="pa shop_container" style="overflow:scroll" v-show="currentBar === '评价'" ref="evaluteWrap">
                    <div>
                        <section class="evaluate_top">
                            <div class="eva_left">
                                <p class="score orange">4.7</p>
                                <p class="zongh">综合评价</p>
                                <p class="compete">高于周边商家</p>
                            </div>
                            <div class="eva_right">
                                <p>服务态度</p>
                                <p>菜品评价</p>
                                <p>送达时间</p>
                            </div>
                        </section>
                        <section class="evaluate_content">
                            <ul class="evalute_content_ul">
                                <li v-for="(item , index) in ratingTags" :class="{tag: currentTag=== index }" @click="changeTag(index)">{{item.name}}({{item.count}})</li>
                            </ul>
                            <ul class="commentList">
                                <li class="commentList_li" v-for="(item,index) in commentList">
                                    <dl class="comment_detail_list">
                                        <dt class="w50 h50">
                                            <img :src="getImgPath(item.avatar)" alt="">
                                        </dt>
                                        <dd>
                                            <div class="time">
                                                <div>{{item.username}}</div>
                                                <div class="gray">{{item.rated_at}}</div>
                                            </div>
                                            <div>{{item.time_spent_desc}}</div>
                                            <div>
                                                <img v-if="(item_img.image_hash)" v-for="(item_img,index) in item.item_ratings" class="w60 h60" :src="getImgPath(item_img.image_hash)" alt="">
                                            </div>
                                            <div>
                                                <div v-for="(item_img,index) in item.item_ratings" class="wellTag ellipsis">{{item_img.food_name}}</div>
                                            </div>
                                        </dd>
                                    </dl>
                                </li>
                            </ul>
                        </section>
                    </div>
                   
                </div>
            </transition>
            <div class="loading_container" v-if="show_load_img">
                <div  class="load_img" :style="{backgroundPositionY: -(positionY%7)*2.5 + 'rem'}"></div>
                <svg class="load_ellipse" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <ellipse cx="26" cy="10" rx="26" ry="10" style="fill:#ddd;stroke:none;"></ellipse>
                </svg>
            </div>
            <section class="animation_opactiy  shop_back_svg_container" v-if="show_shop_back">
                <img src="../assets/img/shop.png" alt="">
            </section>

        </div>
        <div class="buy_cart_container">
            <div class="cart_left">
                <div class="cart_icon">
                    <i class="iconfont icon-gouwuche"></i>
                </div>
                <div>
                    <div class="ft20">￥20.00</div>
                    <div class="ft12">配送费</div>
                </div>
            </div>
            <div class="cart_right">
                <span class="ft20">去结算</span>
            </div>
        </div>
        

    </div>
</template>

<script>
import BScroll from "better-scroll";
import {mixnis} from '../util/utils.js'
export default {
  data() {
    return {
      currentBar: "商品",
      barList: ["商品", "评价"],
      menuList:[],//左边导航栏列表
      scroll: null,
      scroll2:null,
      scroll3:null,
      menuIndex:0,
      shopId : '',//商店id
      imgBaseUrl:this.store.state.imgBaseUrl,
      heightList:[],//滚动条高度
      ratingTags:[],//评价标签
      currentTag:0,
      commentList:[],//商品评价列表
      top:'',
      positionY:0,
      timer:null,
      show_shop_back:false,//背景图片
      show_load_img:false,//图片
    };
  },
  updated:function(){
    this.getScrollHeight();
  },
  mixins:[mixnis],
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.scroll2 = new BScroll(this.$refs.rightWrapper, {
        click: true
      });
    //   this.scroll3 = new BScroll(this.$refs.evaluteWrap, {
    //     click: true
    //   });
    this.timer = setInterval(() => {
        this.positionY ++;
    }, 600);
    window.addEventListener('scroll',function(){
        debugger
    })
      
    });
    this.shopId = this.$route.query.id;
    this.getMenuList();
    this.getTags();
    this.getcommentList();
    window.addEventListener('scroll',this.handleScroll)
    this.top = this.$refs.out_wrap.offsetTop;
  },
  methods: {
      changeMunu(index,id){
          this.menuIndex = index;
          this.scroll2.scrollTo(0, -this.heightList[index], 400);


      },
      getMenuList(){
          this.$axios.get('shopping/v2/menu?restaurant_id='+this.shopId,).then(res=>{
              this.menuList = res.data;
              

          })
      },
      getScrollHeight(){
          var doms = this.$refs.rightWrapper;
          var arrlist = Array.from(doms.children[0].children);
          for(var key in arrlist){
            this.heightList[key] = arrlist[key].offsetTop;
          }
        //   console.log(this.heightList);
      }, 
    //商品、评价切换
      changeShowType(item){
          this.currentBar = item;
          this.scroll2.on('scroll',(pos) =>{
              debugger
          })
      },
      //获取评价标签
      getTags(){
          this.$axios.get('ugc/v2/restaurants/'+this.shopId+'/ratings/tags').then(res=>{
              this.ratingTags = res.data;
          })
      },
    //   切换评价标签
      changeTag(index){
          this.currentTag = index;

      },
      //商品评价列表
      getcommentList(){
          this.$axios.get('ugc/v2/restaurants/'+this.shopId+'/ratings').then(res=>{
              this.commentList = res.data;
          })
      },
      //监听浏览器滚动条滚动
      handleScroll(){
           var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            // console.log(scrollTop)   
      },
   
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/shop.scss";
@keyframes load {
    0%{transform: translateY(0px)}
    50%{transform: translateY(50px)}
    100%{transform: translateY(100px)}
}
@keyframes ellipse{
    0%   {transform: scale(1);}
    50%  {transform: scale(0.3);}
    100% {transform: scale(1);}
}
.load_img{
     width: 100%;
     height: 100%;
     background: url('../assets/img/icon_loading.png');
     background-size: 2.5rem auto;
     transform: translateY(0px);
     animation: load .6s infinite ease-in-out;
     position: relative;
 }
 .load_ellipse{
     position: absolute;
     width: 2.6rem;
     height: 2rem;
     top: 6.2rem;
     left: 0.25rem;
     animation: ellipse .6s infinite ease-in-out;

 }
</style>
