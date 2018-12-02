<template>
  <div class="searchID" v-if="all_show">
    <h3>搜索结果:</h3>
    <table v-show="!data_show">
      <thead><th>头像</th><th>用户名</th><th>状态</th></thead>
      <tr class="tab-tr">
        <td class="tab-td">
          <img :src="user_img_show(data.phonenum)" style="width: 50px;height: 50px">
        </td>
        <td class="tab-td">
          <span>{{data.name}}</span>
        </td>
        <td class="tab-td">
          <el-switch
            v-model="data.isban"
            @change="change(data.id,data.isban)"
            active-text="封号"
            active-color="rgb(148,148,148)"
            inactive-text="解封">
          </el-switch>
        </td>
        <td class="tab-td">
          <el-button type="primary" icon="el-icon-message" @click="chat_show">发送信息</el-button>
        </td>
      </tr>
    </table>

    <div v-show="data_show">未能找到该用户</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {get,set,cl} from '../../../commons/js/cookie'
  export default{
    props:{
      id:"",
    },
    data(){
      return{
        data:[],
        data_show:false,
        all_show:false
      }
    },
    methods:{
      //查询用户
      search_user(id){
        const that = this;
        const params = new URLSearchParams()
        params.append("phonenum",id)
        this.axios.post("/api/txzh/getUser",params).then(function (response) {
          that.data=response.data;
          if(that.data.isban){
            that.data.isban=true
          }else {
            that.data.isban=false
          }
          //返回有数据就显示div 空就显示找不到用户
          that.is_div_show();
        }).catch(function (error) {
          console.log(error)
        })

      },
      is_div_show(){
        if(this.data){
          //有数据则展示
          this.all_show=true;
          this.data_show=false;
        }else{
          //无数据则展示找不到用户
          this.all_show=true;
          this.data_show=true;
        }
      },
      user_img_show(val){
        if(this.data){
          return "/api/txzh/pic/"+val+".jpeg"
        }
        return
      },
      hide_all_show(){
        this.all_show=false;
      },
      change(id,isban){
        //向数据库发送禁止某个用户
        //封号
        const that = this;
        if(isban){
          var params = new URLSearchParams();
          params.append("userid",id)
          params.append("adminid",get("phone"))
          params.append("adminpassword",get("pw"))
          this.axios.post("/api/txzh/BanUser",params).then(function (resoponse) {
            console.log(resoponse.data);
          }).catch(function (error) {
            console.log(error);
          })
        }
        else{
          //解封
          var params = new URLSearchParams();
          params.append("userid",id)
          params.append("adminid",get("phone"))
          params.append("adminpassword",get("pw"))
          this.axios.post("/api/txzh/UnBanUser",params).then(function (resoponse) {
            console.log(resoponse.data);
          }).catch(function (error) {
            console.log(error);
          })
        }
      },
      chat_show(){
        this.$router.push({path:"wechat"})
      },
    },
    computed:{

    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .searchID
    .tab-tr
      height 100px
      width 300px
      .tab-td
        text-align center
        border 1px solid rgb(148,148,148)
        width 300px

</style>
