<template>
    <div>
        <div class="nav-footer">
            <dl :class="currentTab==1 ? 'currentTab':''" @click="changeTab(1)">
                <dt><i class="iconfont icon-changyonglogo40"></i></dt>
                <dd><span>外卖</span></dd>
            </dl>
            <dl :class="currentTab==2 ? 'currentTab':''" @click="changeTab(2)">
                <dt><i class="iconfont icon-sousuo_1"></i></dt>
                <dd><span>搜索</span></dd>
            </dl>
            <dl :class="currentTab==3 ? 'currentTab':''" @click="changeTab(3)">
                <dt><i class="iconfont icon-icon-"></i></dt>
                <dd><span>订单</span></dd>
            </dl>
            <dl :class="currentTab==4 ? 'currentTab':''" @click="changeTab(4)">
                <dt><i class="iconfont icon-wode"></i></dt>
                <dd><span>我的</span></dd>
            </dl>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            currentTab:1,
        }
    },
    methods:{
        changeTab:function(index){
            this.currentTab = index;  
        },
    },

}
</script>

<style lang="scss" scoped>
    @import url('../assets/css/footer.scss');
</style>
