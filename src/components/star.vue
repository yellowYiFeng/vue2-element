<template>
    <div>
        <section class="pa overflow" :style="'width:'+rating*2/5+'rem'">
            <i v-for="num in 5" class="iconfont icon-xingzhuang60kaobei2 orange-fill"></i>
        </section>
        <div style="width:2rem">
            <i v-for="num in 5" class="iconfont icon-xingzhuang60kaobei2 gray-fill"></i>
        </div>
        <span>{{rating}}</span>
    </div>
</template>

<script>
export default {
    props:['rating'],
    data(){
        
    }

}
</script>

<style>
.gray-fill{
    color: gray;
}
.orange-fill{
    color: orange;
}
.icon-xingzhuang60kaobei2{
    font-size: 12px!important;
}

</style>
