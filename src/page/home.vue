<template>
    <div>
        <cell-box class="bg">
            <div>ele.com</div>
            <div>登陆|注册</div>
        </cell-box>
        <cell-box class="city_tip">
            <div>当前定位城市：</div>
            <div>定位不准时，请在城市列表中选择</div>
        </cell-box>
        <group>
            <cell-box class="blue" is-link :link="'city/'+currentCityId">
                苏州
            </cell-box>
        </group>
        <div>
            <group>
                <cell-box>
                    <span class="font-city">热门城市</span>
                </cell-box>
            </group>
            <ul class="hotcity">
                <router-link tag="li" v-for="item in hotcity" :to="'city/'+item.id">
                    {{item.name}}
                </router-link>
            </ul>
        </div>
        <section v-for="(itemArr,key,index) in sortAllCity">
            <group>
                <cell-box>
                    <span class="font-city">{{key}}</span>
                </cell-box>
            </group>
            <ul class="hotcity hot_color">
                <router-link  tag="li" v-for="item in itemArr" :to="'city/'+item.id">
                     {{item.name}}
                </router-link>
            </ul>
        </section>
    </div>
</template>
<script>
export default {
  data() {
    return {
        hotcity :[],//热门城市
        allCitys :[],//所有城市
        currentCity : '',//当前城市
        currentCityId : '',
    };
  },
  beforeMount(){
      
  },
  mounted(){
      //获取当前城市
      this.getCurrentCity();
      this.getHotcity();
      this.getAllcitys();
      
  },
  methods: {
       getHotcity(){
           this.$axios.get('/v1/cities?type=hot').then(res=>{
               this.hotcity = res.data
           })
       },
       //获取所有城市列表
       getAllcitys(){
           this.$axios.get('/v1/cities?type=group').then(res=>{
               this.allCitys = res.data
           })
       },
       getCurrentCity(){
           this.$axios.get('/v1/cities?type=guess').then(res=>{
               this.currentCity = res.data.name;
               this.currentCityId = res.data.id;
           })
       }
  },
  computed:{
      sortAllCity(){//给城市按A-Z排序
          let obj = {};
          for(var i=65;i<=90;i++){
              if(this.allCitys[String.fromCharCode(i)]){
                  obj[String.fromCharCode(i)] = this.allCitys[String.fromCharCode(i)]
              }
          }
          return obj

      }

  }
};
</script>
<style lang="scss" scoped> 
@import url('../assets/css/home.scss');
</style>


