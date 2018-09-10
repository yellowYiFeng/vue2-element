<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url('./assets/css/common.scss');
@import url('./libs/iconfont/iconfont.css');
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
html,body{
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background: #F5F5F5
}
/* html{font-size: calc((100vw/320))*20} */
html{font-size: 25px}
ul li{list-style: none}
body, div, span, header, footer, nav, section, aside, article, ul, dl, dt, dd, li, a, p, h1, h2, h3, h4, h5, h6, i, b, textarea, button, input, select, figure, figcaption{
    list-style: none;
    margin: 0;
    padding: 0;
    font-style: normal;
    font-weight: normal
}
a:-webkit-any-link{
  text-decoration:none
}
</style>
