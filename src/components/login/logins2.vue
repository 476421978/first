<template>
  <div class="login">
    <div class="login_main">
      <h3>天下纵横后台管理</h3>
      <hr width="100%" style="color:rgb(160,177,196);">
      <el-input
        placeholder="请输入手机号"
        suffix-icon="el-icon-phone"
        v-model="input_phone">
      </el-input>

      <el-input
        placeholder="请输入密码"
        suffix-icon="el-icon-view"
        v-model="input_pw">
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
  import {get,set,clrean} from '../../commons/js/cookie'
  export default{
    data(){
      return{
        input_phone:'',
        input_pw:'',
        checked:false,
        mm:[],
        dd:{
          Type:String
        }
      }
    },
    mounted(){
      //判断是否已经登陆 检查cookie信息
   /*   if(!get("phone")==""){
        this.$router.push({path:"manager"})
      }*/

    },
    computed:{

    },
    methods:{
      toEqual(val){
        if(val.match("成功")){
          return true
        }
        return false
      },
      login(){
        const that = this;
        //简单判断
        if(this.input_phone==""||this.input_pw==""){
          this.$message({
            showClose: true,
            message: '账号或密码不能为空',
            type: 'error'
          });
          return
        }

        //访问数据库 验证用户登陆信息
        var params = new URLSearchParams();
        params.append('account',this.input_phone);
        params.append('password',this.input_pw);
        this.axios.post('/api/txzh/adminLogin', params).then(function (response) {
          /*登陆成功 保存用户信息*/
          that.mm=(response.data);
          console.log(response.data)
          for(var i in that.mm){
            if(i==="message"){
              const message = that.mm[i];
              if(that.toEqual(that.mm[i])){
                //保存账号密码到cookie中
                  set("id",that.mm["id"],"1");
                  set("account",that.mm["account"],"1")
                  set("phone",that.input_phone,"1");
                  set("pw",that.input_pw,"1");
                  set("pic",that.mm["pic"],"1");
                  that.$router.push({path:"manager"})
              }else{
                that.$message({
                  //账号错误
                  //密码错误
                  showClose: true,
                  message:message,
                  type: 'error'
                });
              }
              return
            }
          }
        }).catch(function (error) {
          console.log(error)
        });
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .login
    width 100%
    height 100%
    .ke_li
      width 100%
      height 100%
      background-image url("./bg.jpg")
    .login_main
      position absolute
      background-color rgba(255,255,255,0.85)
      padding 58px
      right  10%
      top 10%
      color rgb(51,51,51)
      border-radius 5px
      border 1px solid rgb(160,177,196)
      margin-right 10%
      height 300px
      width auto
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
