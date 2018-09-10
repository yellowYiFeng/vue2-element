<template>
    <div>
        <swiper ref="swiper" :aspect-ratio="500/800" @on-index-change="onSwiperItemIndexChange" v-model="swiperItemIndex"  dots-position="center">
            <swiper-item v-for="(item,index) in list" class="swiper-demo-img" :key="index">
              <div class="item_content">
                  <router-link class="item_wrap" v-for="(item_i,index) in item" :to="{path:'food',query:{geohash,id:item_i.id,title:item_i.title}}" :tag="div">
                    <img :src="imgBaseUrl + item_i.image_url" />
                    <div class="title_text">{{item_i.title}}</div>
                  </router-link>
              </div>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
export default {
  data() {
    return {
      swiperItemIndex: 1,
      geohash:this.util.getStore('geohash',this.geohash),
      fooeLength:'',
      foodTypes :[],
      list:[],//swiper分组,
      imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
    };
  },
  mounted(){
    this.getFoodType();
    this.$refs.swiper.xheight="200px";
  },
  methods: {
    onSwiperItemIndexChange (index) {
      console.log('demo item change', index)
    },
    //获取导航栏食品类型
    getFoodType(){
      this.$axios.get('/v2/index_entry',{geohash:this.geohash,group_type: '1','flags[]': 'F'}).then(res=>{
        this.fooeLength = res.data.length;
        let resArr = res.data;
        let foodArr = [];
        this.foodTypes = resArr;
        for(var i=0;i<res.data.length;i+=8){
            this.list.push(res.data.slice(i,i+8));
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import url('../assets/css/swiper.scss');
</style>
