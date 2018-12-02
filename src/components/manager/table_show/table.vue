<template>
  <div class="tab">
    <table style="border-collapse: collapse;">
      <thead><th>头像</th><th>用户名</th><th>状态</th></thead>
      <tr class="tab-tr" v-for="item in filtersVal()">
       <td class="tab-td">
          <img :src="user_img(item.pic)" style="width: 50px;height: 50px">
        </td>
        <td class="tab-td">
          <span>{{item.name}}</span>
        </td>
        <td class="tab-td">
          <el-switch
            @change="change(item.id,item.isban)"
            v-model="item.isban"
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

  </div>
</template>

<script type="text/ecmascript-6">
  import router from '../../../router/index'
  import {get,set,cl} from '../../../commons/js/cookie'
    export default{
      props:{
        data:{
          Type:Array
        },
        number_li:{//页数
          Type:Number,
        },//每页展示的数量
        number_i:{
          Type:Number
        },
      },
      methods:{
        chat_show(){
          this.$router.push({path:"wechat"})
        },
        change(id,isban){
          //switch 改变 向数据库更新用户状态
          //向数据库发送禁止某个用户
          //封号
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
        filtersVal(){
         //筛选数据
          const data_s=[];
          //规定每页展示4 从哪里开始
          //第一页 li = 1;   i: [li*num-num] - [li(num)-1]
          //第二页 li = 2;   i:4 - 7
          //第三页 li = 3;   i:8 - 11
          const i_min= this.number_li*(this.number_i)-this.number_i
          const i_max = this.number_li*(this.number_i)-1
          for(const i in this.data){
            if(i<=i_max && i>=i_min){
              data_s.push(this.data[i]);
            }
          }
          //isban 将 0 1 转换成true false
          for(const i in data_s){
            if(data_s[i].isban){
              data_s[i].isban=true
            }
            else{
              data_s[i].isban=false
            }
          }

          return data_s;
        },
        user_img(val){//拼接用户头像地址
          return "/api/txzh/pic/" + val + ".jpeg"
        },
      },
      computed:{
      },
      filters:{//过滤 li展示  只要index大于等于number_i 控制table展示数据的数目 filter
      }

    }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .tab
    height:auto
    .tab-tr
      height 100px
      width 300px
      .tab-td
        text-align center
        border 1px solid rgb(148,148,148)
        width 300px
</style>
