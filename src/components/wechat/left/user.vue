<template>
  <div class="users">
    <div class="header">
      <div class="title">
        <img src= "static/img/p2.jpeg" width="50px" height="50px">
        <span class="txt">{{Own.user_name}}</span>
        <i class="el-icon-tickets" >
          <i class="el-icon-caret-left" @click="back_manager">返回管理页面</i>
        </i>
      </div>

      <div class="middle">
        <el-input v-model="input" prefix-icon="el-icon-search" placeholder="搜索"></el-input>
      </div>

      <div class="main">
        <ul class="main_ul">
          <li class="tab-item">
            <router-link  to="/wechat/page1" >
              <i class="el-icon-phone-outline"></i>
            </router-link>
          </li>
          <li class="tab-item">
            <router-link  to="/wechat/page2">
              <i class="el-icon-star-off"></i>
            </router-link>
          </li>
          <li class="tab-item">
            <router-link  to="/wechat/page3">
              <i class="el-icon-location-outline"></i>
            </router-link>
          </li>
        </ul>
      </div>

        <!--router展示区域-->
      <router-view v-on:val="val">

      </router-view>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import router from "../../../router/index"
  export default{
    data(){
      return{
        input:'',
        Own:{
          'user_name':'HLG',
          'user_img':'static/img/p2.jpeg'
        }
      }
    },
    mounted(){
      this.$nextTick(()=> {
        this.$emit("Own",this.Own)
      });
    },
    methods:{
      val(targe){
        console.log(targe+"------");
        this.$emit("mm",targe);
      },
      back_manager(){
        console.log("进来")
        this.$router.push({path:"/manager"})
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .users
    padding 10px
    background-color rgb(46,50,56)
    .header
      .title
        position  relative
        margin-bottom 20px
        image
          margin-right 10px
        .txt
          color: #fff
          font-size 20px
        .el-icon-tickets
          position absolute
          right 10px
          line-height 50px
          font-size 20px
          color rgb(119,119,119)
          .el-icon-caret-left
            font-size 10px
      .main
        display flex
        height  50px
        .main_ul
          display flex
          width 100%
          margin-top 10px
          .tab-item
            flex 1
            text-align center
            line-height 50px
            i
              font-size 25px
              color: rgb(245,245,246)





</style>

