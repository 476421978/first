<template>
  <div class="login">
    <h1>阿三打撒</h1>
    <div class="login_main">
      <h3>天下纵横后台管理</h3>
      <hr width="100%" style="color:rgb(160,177,196);">
      <el-input
        placeholder="请输入手机号"
        suffix-icon="el-icon-phone"
        v-model="input2">
      </el-input>

      <el-input
        placeholder="请输入密码"
        suffix-icon="el-icon-view"
        v-model="input3">
      </el-input>

      <div>
        <el-checkbox v-model="checked">下次自动登陆</el-checkbox>
      </div>


      <el-button type="primary" plain @click="login">登陆</el-button>


      <ul class="tab">
        <li class="tab-item"><a>忘记密码?</a></li>
        <li class="tab-item"><a>注册新账号</a></li>
        <li class="tab-item"><a>意见反馈</a></li>
      </ul>



    </div>
    <!--粒子效果-->
   <vue-particles
      class="ke_li"
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
  </div>
</template>

<script type="text/ecmascript-6">
  import router from '../../router/index'
  export default{
    data(){
      return{
        input2:'',
        input3:'',
        checked:false
      }
    },
    methods:{
      login(){
        /*登陆成功 保存用户信息*/
        console.log("登陆");
        this.$router.push({path:"manager"})
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .login
    width 100%
    height 100%
    border 1px solid red
    .ke_li
      background-image url("./bg.jpg")
    .login_main
      position absolute
      background-color rgba(255,255,255,0.85)
      padding 58px
      left 60%
      top 10%
      color rgb(51,51,51)
      border-radius 5px
      border 1px solid rgb(160,177,196)
      .el-input
        margin-top 10px
        width 300px
        display block
      .el-button
        width 300px
      .el-checkbox
        margin-top 15px
        margin-bottom 10px
      .tab
        display block
        margin-top 30px
        .tab-item
          float left
          height 20px
          line-height 20px
          list-style none
          margin-right 5px
          cursor:pointer





</style>
