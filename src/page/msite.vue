<template>
    <div>
        <header-top></header-top>
        <nav-swiper></nav-swiper>
        <div class="shop_list_container">
            <header class="shop_header">
                <i class="iconfont icon-fujinshangjia"></i>
                <span class="sj_tit">附近商家</span>
            </header>
            <shop-list></shop-list>
        </div>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import headerTop from "../components/head";
import navSwiper from "../components/swiper";
import navFooter from '../components/footer';
import shopList from '../components/shopList';
import { msiteAddress } from "../services/getData.js";

export default {
  data() {
    return {
      geohash: "",
      cityname: "",
      msiteTitle: "",
      hasGetData: false //是否已经获取地理位置数据，成功之后再获取商铺列表信息
    };
  },
  async beforeMount() {
    if (!this.$route.params.geohash) {
      await this.$axios.get("/v1/cities?type=guess").then(res => {
        this.geohash = res.data.latitude + "," + res.data.longitude;
        this.cityname = res.data.name;
      });
    } else {
      this.geohash = this.$route.params.geohash;
    }
    this.SAVE_GEOHASH(this.geohash);
    this.util.setStore("geohash", this.geohash);
    let res = await this.$axios.get("/v2/pois/" + this.geohash);
    this.msiteTitle = res.data.name;
    this.RECORD_ADDRESS(res.data);
    this.hasGetData = true;
  },
  mounted() {},
  components: {
    headerTop,
    navSwiper,
    navFooter,
    shopList,
  },
  methods: {
    ...mapMutations(["RECORD_ADDRESS", "SAVE_GEOHASH"])
  }
};
</script>

<style lang="scss" scoped>
@import url("../assets/css/msite.scss");
</style>
