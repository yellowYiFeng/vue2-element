<template>
    <div>
        <ul class="shop_ul">
            <router-link :to="{path: 'shop', query:{geohash, id: item.id}}" :key="item.id" class="shop_li" v-for="(item,index) in shopListArr" tag="li">
                <section>
                    <img :src="imgBaseUrl+item.image_path" alt="" class="shop_img">
                </section>
                <hgroup>
                    <header class="shop_header">
                        <h4>品牌<span>{{item.name}}</span></h4>
                        <ul class="detail_ul">
                            <li v-for="item in item.supports">{{item.icon_name}}</li>
                        </ul>
                    </header>
                    <div class="shop_star ml20">
                        <section>
                            <section>
                                <div class="detail_star">
                                    <group>
                                        <cell>
                                            <rater :font-size="15" v-model="data4" disabled></rater>
                                        </cell>
                                    </group>
                                </div>
                                <span class="orange">4.7</span>
                            </section>
                            <section>月售<span class="mt2">{{item.recent_order_num}}</span>单</section>
                        </section>
                        <section class="">
                            <span class="delivery_style delivery_left" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>
                            <span class="delivery_style delivery_right" v-if="zhunshi(item.supports)">准时达</span>
                        </section>
                    </div>
                    <div class="delivery_time ml20">
                        <div class="delivery_time_left">
                            <span>￥<span>{{item.float_minimum_order_amount}}</span>起送/</span><span>{{item.piecewise_agent_fee.tips}}</span>
                        </div>
                        <div class="delivery_time_right">
                            <span>{{item.distance}}/</span><span>{{item.order_lead_time}}</span>
                        </div>
                    </div>
                </hgroup>
            </router-link>
        </ul>
    </div>
</template>

<script>
// import {mapState} from 'vuex'
export default {
    data(){
        return{
            offset:0,
            imgBaseUrl:this.store.state.imgBaseUrl,
            data4:3,//星星数量
            shopListArr:[],//店铺列表
            latitude:this.store.state.latitude,
            longitude:this.store.state.longitude,

        }
    },
    mounted(){
        this.getAllShopArr();
    },
    props: ['restaurantCategoryId', 'restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect', 'geohash'],
    computed:{

    },
    methods:{
        getAllShopArr:function(){
            this.$axios.get('/shopping/restaurants?latitude='+this.latitude+'&longitude='+this.longitude+'&offset='+this.offset).then(res=>{
                this.shopListArr = res.data;
            })
        },
          // 是否准时达
        zhunshi:function(supports){
            let isZhun = false;
            if(supports&&supports.length>0){
                for(var key in supports){
                    if(supports[key].icon_name === '准'){
                        isZhun = true; 
                    }
                }
            }
            return isZhun;
        }
    },
  

}
</script>

<style lang="scss">
    @import '../assets/css/shoplist';
</style>