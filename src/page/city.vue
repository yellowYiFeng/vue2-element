<template>
    <div>
        <x-header :left-options="{backText: ''}" slot="header" :right-options="{showMore:'true'}" :title='cityname' class="header-top" @on-click-more="changeCity">
        </x-header>
        <group>
            <x-input text="text" v-model="positionName" placeholder='输入学校、商务楼、地址' @on-focus='clearPosition'></x-input>
        </group>
        <x-button class="mt15" @click.native='getPosition'>提交</x-button>
        <cell-box v-if="noposition&positionName!=''" class="">
            <div>很抱歉！无搜索结果</div>
        </cell-box>
        <section>
            <group v-for="(item,index) in positions" @click.native="nextpage(index, item.geohash)" style="text-align:left">
                <cell :title='item.name' :inline-desc='item.address'></cell>
            </group>
        </section>
        <section v-if="positionName == ''&&historyPositions.length!=0">
            <div class="history_tip">搜索历史</div>
            <group v-for="(item,index) in historyPositions" style="text-align:left" @click.native="nextpage(index, item.geohash)"> 
                <cell :title='item.name' :inline-desc='item.address'></cell>
            </group>
            <x-button class="mt15" @click.native='clearhistory'>清空历史记录</x-button>
        </section>
    </div>
</template>

<script>
export default {
  data() {
    return {
      cityid: "",
      cityname: "",//当前城市名字
      positionName: "",
      noposition: false, // 搜索无结果，显示提示信息
      positions : [],//搜索结果
      historyPositions : JSON.parse(this.util.getStore('history'))? JSON.parse(this.util.getStore('history')) : [],//历史查找结果
    };
  },
  mounted() {
    this.cityid = this.$route.params.cityid;
    this.getCurName();
    console.log(this.util);
    
  },
  methods: {    
    changeCity() {
      this.$router.push("/");
    },
    getCurName() {
      this.$axios.get("/v1/cities/" + this.cityid).then(res => {
        this.cityname = res.data.name;
      });
    },
    //搜索城市
    getPosition() {
      if (this.positionName) {
        this.$axios
          .get(
            "/v1/pois?type=search&city_id=" +
              this.cityid +
              "&keyword=" +
              this.positionName
          )
          .then(res => {
            if (res.data.length == 0) {
              this.noposition = true;
              this.positions = [];
            } else {
                this.positions = res.data;
                this.noposition = false;
            }
          });
      }
    },
    //清空数据
    clearPosition() {
      if(this.noposition){
          this.positions = [];
      }
    },
    //获取历史搜索记录
    nextpage(index,geohash){
        let history = this.util.getStore('history');
        let place = this.positions[index];
        if(history){
            let checkrepeat = false;
            this.historyPositions.forEach(item=>{
                if(item.geohash == geohash){
                  checkrepeat = true;
                }
            })
            if(!checkrepeat){
              this.historyPositions.push(place);
            }

        }else{
            this.historyPositions.push(place);
        }
        this.util.setStore('history',this.historyPositions);
        this.$router.push({path:'/msite',query:{geohash}})
    },
    //清空历史记录
    clearhistory(){
      this.util.deleteStore('history');
      this.historyPositions = []
    },
  }
};
</script>

<style lang="scss" scoped>
@import url("../assets/css/city.scss");
</style>
