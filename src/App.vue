<template>
  <div id="id">
    <!--<v-heard></v-heard>-->
<!--    <v-sass></v-sass>-->
    <!--<v-we-chat></v-we-chat>-->
    <!--<v-login></v-login>-->
      <!--<v-manager></v-manager>-->
    <!--<v-filter></v-filter>-->

    <!--顶部渲染出口-->
    <router-view>

    </router-view>

 <!--   <v-copy>


    </v-copy>-->

   <!-- <v-manager></v-manager>-->

  </div>
</template>

<script type="text/ecmascript-6">
  import heard from './components/heard/heard.vue';
  import sass from './components/sass/sass_show.vue';
  import weChat from './components/wechat/wechats.vue';
  import login from  './components/login/logins.vue';
  import manager from './components/manager/managers.vue';
  import filter from './components/filter/filters.vue';

  import copy from './components/manager/copy.vue';

  export default {
    components:{
      'v-heard': heard,
      'v-sass':sass,
      'v-we-chat':weChat,
      'v-login':login,
      'v-manager':manager,
      'v-filter':filter,
      'v-copy':copy
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  #id
    height 100%
    width 100%

</style>
