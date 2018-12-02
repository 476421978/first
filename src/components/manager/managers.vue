<template>
  <div>
    <div class="m_hread">
      <div class="hread_left">天下纵横后台管理</div>
      <div class="hread_right">
        <div class="right_1">
          <el-radio-group v-model="isCollapse">
            <i :class="isCollapse ? 'el-icon-caret-left' : 'el-icon-caret-right' "
               style="font-size: 30px; line-height: 30px" @click="menu_show" ></i>
          </el-radio-group>
        </div>
        <div class="right_2">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link message_img" style="color: white">
                {{user_name}}<img :src="user_pic"  class="hread_img">
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1" >我的消息</el-dropdown-item>
                <el-dropdown-item command="2">设置</el-dropdown-item>
                <el-dropdown-item divided></el-dropdown-item>
                <el-dropdown-item command="3">退出登陆</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </div>
      </div>
    </div>
    <div class="manager">
      <div class="manager_left">
        <div class="copys">
          <el-row class="tac">
            <el-col :span="12" class="tab_ul">
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo "
                @open="handleOpen"
                @close="handleClose"
                :collapse="isCollapse">
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导航一</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="1-1" @click="change_div(1)" :class="{'active':div1}"  class="ul_li">用户管理</el-menu-item>
                    <el-menu-item index="1-2" @click="change_div(2)"  :class="{'active':div2}"  class="ul_li">群组管理</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="2"  @click="change_div(3)"  :class="{'active':div3}">
                  <i class="el-icon-menu"></i>
                  <span slot="title">广播</span>
                </el-menu-item>
                <el-menu-item index="3">
                  <i class="el-icon-document"></i>
                  <span slot="title">日志</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <i class="el-icon-setting"></i>
                  <span slot="title">设置</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="manager_right">
        <div class="manager_user" v-show="div1" >
          <h2>用户管理</h2>
          <div class="search">
            <el-input
              v-model="input1"
              @clear="search_clrean"
              clearable
              placeholder="请输入待搜索用户ID"
              prefix-icon="el-icon-search">
            </el-input>
            <el-button type="primary" icon="el-icon-search" @click="searchId()">搜索</el-button>
          </div>
          <v-search ref="search"></v-search>
          <div class="tab">
            <h3>用户表</h3>
            <v-table :data="data"  :number_li="number_li" :number_i="number_i"></v-table>
          </div>
          <!--分页-->
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[1, 2, 3, 4, 5,6,7,8,9,10]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="Object.keys(data).length">
            </el-pagination>
          </div>
        </div>

        <div class="manager_chats" v-show="div2" >
          <h2>群组管理</h2>
          <div class="search">
            <el-input
              v-model="input2"
              placeholder="请输入待搜索群组ID"
              prefix-icon="el-icon-search">
            </el-input>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
          </div>
          <div class="tab">
            <h3>群组表</h3>
            <table>
              <tr class="tab-tr">
                <td class="tab-td">
                  <img src="./p1.jpeg" style="width: 50px;height: 50px">
                  <span>HLG</span>
                </td>
                <td class="tab-td">
                  <el-switch
                    v-model="switch1"
                    active-text="封群"
                    active-color="rgb(148,148,148)"
                    inactive-text="解封">
                  </el-switch>
                </td>
                <td class="tab-td">
                  <el-button type="primary" icon="el-icon-message">发送信息</el-button>
                </td>
              </tr>
            </table>
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[1, 2, 3, 4]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="Object.keys(data).length">
              </el-pagination>
            </div>
          </div>
        </div>

        <div class="manager_send" v-show="div3" >
          <h2>发送广播</h2>
          <div class="tab">
            <table>
              <tr class="tab-tr">
                <td class="tab-td">
                  <img src="./p1.jpeg" style="width: 50px;height: 50px">
                  <span>全体用户</span>
                </td>
                <td class="tab-td">
                  <el-button type="primary" icon="el-icon-message">发送信息</el-button>
                </td>
              </tr>
              <tr class="tab-tr">
                <td class="tab-td">
                  <img src="./p1.jpeg" style="width: 50px;height: 50px">
                  <span>全体群聊</span>
                </td>
                <td class="tab-td">
                  <el-button type="primary" icon="el-icon-message">发送信息</el-button>
                </td>
              </tr>
            </table>
          </div>

          <h2>广播记录</h2>
          <div class="tab">
            <table>
              <tr class="tab-tr">
                <td class="tab-td">
                  <img src="./p1.jpeg" style="width: 50px;height: 50px">
                  <span>全体用户</span>
                </td>
                <td class="tab-td">
                  <span>广播时间</span>
                </td>

                <td class="tab-td">
                  <span>广播对象</span>
                </td>
              </tr>
            </table>
          </div>

          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[1, 2, 3, 4]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="Object.keys(data).length">
            </el-pagination>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import table from './table_show/table.vue';
  import search from './table_show/searchID.vue';
  import router from '../../router/index'
  import {get,set,cl} from '../../commons/js/cookie'
  import ElDropdown from '../../../node_modules/element-ui/packages/dropdown/src/dropdown'
  import eltable from './table_show/elTable.vue';
  export default{
    data(){
      return{
        input1:'',
        input2:'',
        input3:'',
        switch1:false,
        switch2:false,
        switch3:false,
        div1:true,
        div2:false,
        div3:false,
        currentPage: 5,
        number_li:'1',
        number_i:'5',
        user_name:'',
        user_pw:'',
        user_pic:"",
        user_id:"",
        isCollapse: true,
        data_show:"",
        data:[],
      }
    },
    created(){
      if(get("phone")===""){
        this.$router.push({path:"login"})
      }
      this.user_name = get("phone")
      this.user_pw = get("pw")
      this.user_pic=get("pic")
      this.user_id = get("id");
      //请求访问本地数据
   /*   this.axios.get('./static/test.json').then(response => {
          this.data_show = response.data.title
          console.log("请求"+this.data_show+"---");
      });*/
      //得到所以用户信息
      this.seach_all();
      //得到管理员头像
      this.seach_img();
    },
    computed:{
      //每一个用户是否封号
      is_close(value){
        if(value){
          return true
        }
        return false
      },
      get_name(){
        return get("phone");
      }
    },
    methods:{
      change_div(i){
        if(i===1){
          this.div_hide()
          this.div1=true;
        }else
        if(i===2){
          this.div_hide()
          this.div2=true;
        }else
        if(i===3){
          this.div_hide()
          this.div3=true;
        }
      },
      div_hide(){
        this.div1=false;
        this.div2=false;
        this.div3=false;
      },
      handleSizeChange(val) {
        //规定每页展示多少人
        this.number_i = val
      },
      handleCurrentChange(val) {
        //比如每页展示两人  当前页展示的数据应该是 开头:当前页数*每页人数
        this.number_li = val;
      },
      searchId(){
        //点击搜索显示搜索结果
        if(this.input1===""){
          this.$message({
            showClose: true,
            message: '查询内容不能为空',
            type: 'error'
          });
        }else{
          //调用子组件的查找方法
          this.$refs.search.search_user(this.input1);
        }
      },
      login_out(){
        //清除Cookie 返回到登陆页面
        cl("phone");
        this.$router.push({path:"login"})
      },
      handleOpen(key, keyPath) {

      },
      handleClose(key, keyPath) {

      },
      menu_show(){
        this.isCollapse = !this.isCollapse;
      },
      search_clrean(){
        //在点击由 clearable 属性生成的清空按钮时触发
        this.$refs.search.hide_all_show();
      },
      handleCommand(command) {
        switch(command){
          case "1":
            this.$message('消息界面');
            this.$router.push({path:"wechat"})
            break;
          case "2":
            break;
          case "3":
            this.$message('退出登陆成功');
            this.login_out();
            break;
        }
      },
      seach_img(){//根据登陆用户拿到头像
        this.axios .get("/api/txzh/pic/"+this.user_pic+".jpeg").then(response =>{
            this.user_pic = "/api/txzh/pic/"+this.user_pic+".jpeg"
        });
      },
      seach_all(){//获取所有用户信息
        const that = this;
        var params = new URLSearchParams();
        params.append('adminid',this.user_id);
        params.append('adminpassword',this.user_pw);
        this.axios.post("/api/txzh/getUserList",params).then(function (response) {
          that.data=response.data;
          console.log(that.data)
        }).catch(function (error) {
          console.log(error)
        })
      }
    },
    components:{
      ElDropdown,
      'v-table':table,
      'v-search':search,
      'v-eltable':eltable
    }
  }
</script>



<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  html,body{
    width: 100%;
    height: 100%;
    font-family "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
  }
  *{
    margin 0;
    padding 0;
  }

  .m_hread
    color white
    height 60px
    width 100%
    background-color #20a0ff
    line-height 60px;
    display flex
    .hread_left
      height 100%
      width 250px
      border-right 1px solid #52b3e5
      display inline-block
      text-align center
    .hread_right
      display flex
      flex 1
      .right_1
        width 100px;
        display inline-block
        text-align center
      .right_2
        flex 1
        display inline-block
        text-align right
        margin-right 50px
        .message_img
          line-height 50px
          .hread_img
            position absolute
            right 50px
            width 50px
            height 50px
            border-radius 90px
  .manager
    width 100%
    height auto
    display flex
    .manager_left
      width 250px
      flex 1
      text-align center
      .txt
        font-size 15px
        color #fff
        width 100px
        background-color rgb(148,148,148)
        border-radius 5px
        margin 20px auto
      .tac
        width 250px;
        height auto
        .tab_ul
          height 800px
          width 250px
          ul
            height 100%
            background-color #eef1f6
            .ul_li
              height 100%
              background-color #e4e8f1

    .manager_right
      flex 5
      .manager_user
        position: absolute
        height auto
      .manager_chats
        height 100%
      .search
        margin-top 50px
        padding 0 50px
        .el-input
          width 400px
      .block
        position absolute
        bottom -50px
        text-align left
        .el-pagination
          width 78%
          background-color rgba(236,237,239,0.3)
          .number
            background-color rgba(236,237,239,0.3)
          li
            width 100px
          button
            background-color rgb(236,237,239)
      .manager_send
        .block
          text-align center
          .el-pagination
            width 78%
            background-color rgba(236,237,239,0.3)
            .number
              background-color rgba(236,237,239,0.3)
            li
              width 100px
            button
              background-color rgb(236,237,239)





</style>
