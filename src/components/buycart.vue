<template>
    <div>
        <div class="fxauto ">
            <i class="iconfont icon-yuanquanjiahao" @click="additem"></i>
        </div>
        <!-- <ul class="shop">
            <li v-for="item in items">
                <span>{{item.text}}</span>
                <span>{{item.price}}</span>
                <button @click="additem">添加</button>
            </li>
        </ul> -->
        <div v-for="ball in balls">
            <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
                <div class="ball" v-show="ball.show">
                    <div class="inner inner-hook"></div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            count: 0,
            balls: [ //小球 设为3个
                {
                    show: false
                },
                {
                    show: false
                },
                 {
                    show: false
                },
            ],
            dropBalls:[],
            ball:{
                show:false
            },
        }
    },
    methods:{
         //添加商品到购物车
      addfood(event){
          let eleft = event.target.getBoundingClientRect().left;
          let ebottom = event.target.getBoundingClientRect().bottom;
          this.dotArr.push(true)
          this.$emit('dotclick',this.dotArr,eleft,ebottom); 

      },
      additem(event){
                this.drop(event.target)
                this.count++;
            },
            drop(el){
                for(var i=0;i<this.balls.length;i++){
                    let ball = this.balls[i];
                    if(!ball.show){
                        ball.el = el;
                        ball.show = true;
                        this.dropBalls.push(ball); 
                        break;
                    }
                }
                this.$emit('downball',this.balls)
                        
            },
            beforeDrop(el) {/* 购物车小球动画实现 */
                let count = this.balls.length;
                while (count--) {
                    let ball = this.balls[count];
                    if (ball.show) {
                        let rect = ball.el.getBoundingClientRect(); //元素相对于视口的位置
                        let x = rect.left-100//window.innerWidth/2;//- 32;
                        let y = rect.bottom - window.innerHeight;
                        el.style.display = '';
                        el.style.transform = 'translate3d(0,'+y+'px,0)';
                        let inner = el.getElementsByClassName('inner-hook')[0];
                        inner.style.transform = 'translate3d('+x+'px,0,0)';
                    }
                }
            },
            dropping(el, done) { /*重置小球数量  样式重置*/
                let rf = el.offsetHeight;
                el.style.transform = 'translate3d(0,0,0)';
                let inner = el.getElementsByClassName('inner-hook')[0];
                inner.style.transform = 'translate3d(0,0,0)';
                el.addEventListener('transitionend', done);
            },
            afterDrop(el) { /*初始化小球*/
                let ball = this.dropBalls.shift();  
                if (ball) {
                ball.show=false;
                el.style.display = 'none';
            }
        }
    }
};


</script>

<style>
.shop_ball{
    position: fixed;
    top: 300px;
    left: 40px;
 }
 .ball{
     position: fixed;
     left: 32px;
     bottom: 22px;
     z-index: 200;
     transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41); /*贝塞尔曲线*/
 }
 .inner{
     width: 16px;
     height: 16px;
     border-radius: 50%;
     background-color: rgb(0,160,220);
     transition: all 0.4s linear;
}
</style>
