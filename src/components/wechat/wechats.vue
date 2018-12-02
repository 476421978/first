<template>
  <div class="chats">
   <el-container>
      <el-container>
        <el-aside width="350px" class="left">
          <div style="color: white" @click="login">登陆</div>
          <div style="color: white" @click="send">测试</div>

          <div class="title">
            <img :src= "user_img_show()"  style="width: 50px; height: 50px;" >
            <span class="txt">管理员</span>
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
          <router-view>
          </router-view>
        </el-aside>
        <el-main class="right">

          <div class="title">
            <span>{{$store.state.user_chat.m_name}}</span>
          </div>
          <div class="content" ref="content">
            <div>
              <ul class="tab-ul">
                <div class="time">时间</div>
                <!--消息展示区域 需要跟当亲对话的用户ID对应方才显示消息-->
                <li
                    v-for="(item,index) in showChat()"
                    :class="{'tab_item2':item.m_from!=123}"
                    class="tab_item food-list-hook"
                   >
                  <div class="div_img">
                    <img :src="select_img(item)" class="img_show">
                  </div>
                  <span class="txt">{{item.m_content}}</span>
                </li>

              </ul>
            </div>
          </div>

          <div class="send_div">
            <div class="header">
              <i class="el-icon-edit"></i>
              <i class="el-icon-share"></i>
              <i class="el-icon-delete"></i>
            </div>
            <div class="main">
              <input type="text" class="send_input" v-model="input_send">
            </div>
            <div class="send">
              <span>按下alt+enter换行</span>
              <el-button @click="send()">发送</el-button>
            </div>
          </div>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import store from '../../vuex/store'
  import {get,set,cl} from '../../commons/js/cookie'
  export default{
    data(){
      return{
        input:'',
        input_send:'',
        user : '',
        message_arr:[],
        mesaage_one:{//聊天信息
          m_content:"",//聊天内容
          m_count:"",//信息数量
          m_from:"",//来自
          m_to:"",//目标
          m_read:""//是否已经读取
        },
        isShow:false,
        from_username:"123",
        currentUserpwd:"123",
        isClass:'',
      }
    },
    created(){
      this.$nextTick(()=>{
        this._initScroll();
      });

    },
    methods:{
      _initScroll(){
        this.ChatScroll = new BScroll(this.$refs.content,{
          click:true,
          probeType: 3
          //有时候我们需要知道滚动的位置。
          // 当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；
          // 当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；
          // 当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。
        });

        //实时监听scroll的位置获取Y的坐标
        this.ChatScroll.on('scroll',(pos)=>{
          this.scrollY  = Math.abs(Math.round(pos.y));
        });
      },
      showScroll(){
        let foodlist = this.$refs.content.getElementsByClassName('food-list-hook');
        let el = foodlist[foodlist.length];
        this.ChatScroll.scrollToElement(el,300)
      },
      back_manager(){
        this.$router.push({path:"/manager"})
      },
      message_show(){//更新消息窗口

      },
      clear_message(){
    /*    const ul = document.getElementsByClassName("tab-ul")[0];
        const lis = ul.getElementsByTagName("li");
        console.log(lis.length)
        for(var i=0;i<lis.length;i++){
          ul.removeChild(lis[i]);
        }*/
      },
      login(){
        const that = this;//保存this 能找到data中的数据
        this.$imoption.user = this.from_username
        this.$imoption.pwd = this.currentUserpwd
        this.$imconn.open(this.$imoption)
        this.$imconn.listen({
          onOpened: function (message) {
            console.log('用户已上线')
          },
          onClosed: function (message) {
            console.log('用户已下线')
          },
          onTextMessage:function (message) { //收到文本消息
            //console.log("Type:"+message.type+"/n谁发来:"+message.from + "/n内容:"+ message.data + "/n发给谁:" + message.to);
            /*store.state.chat_list.m_content = message.data;
            store.state.chat_list.m_from = message.from;
            store.state.chat_list.m_to = message.to;*/
            const mesaage_one = {};
            mesaage_one.m_content = message.data;
            mesaage_one.m_from = message.from;
            mesaage_one.m_to = message.to;
            mesaage_one.m_count="1";
            mesaage_one.m_read="未读取";
            //聊天信息 放到vuex的库中
            store.state.state_arr.push(mesaage_one);
          }
        })
      },
      send(){/* 自己发送信息 信息展示到面板上*/
        if(this.input_send==""){
          return;
        }
        const that = this;
        // 单聊发送文本消息
        var id = this.$imconn.getUniqueId();     // 生成本地消息id
        var msg = new WebIM.message('txt', id);      // 创建文本消息
        msg.set({
          msg: that.input_send,       // 消息内容
          to: store.state.user_chat.m_phone,           // 接收消息对象（用户id）
          roomType: false,
          success: function (id, serverMsgId) {//发送消息成功 清空文本
            console.log('send private text Success'+"---"+store.state.user_chat.m_phone);
            //我方发送的信息也要更新到UI上面
            const mesaage_one = {};
            mesaage_one.m_content = that.input_send;
            mesaage_one.m_from = get("account");
            mesaage_one.m_to = store.state.user_chat.m_phone;
            mesaage_one.m_count="1";
            mesaage_one.m_read="未读取";

            store.state.state_arr.push(mesaage_one);

            //清空发送内容
            that.input_send="";
            /*that.showScroll();*/
          },
          fail: function(e){
            console.log("Send private text error");
          }
        });
        msg.body.chatType = 'singleChat';
        this.$imconn.send(msg.body);
      },
      showChat(){//根据当前聊天的ID 来确认显示消息的用户
        const messages=[];
        for(var i=0;i<store.state.state_arr.length;i++ ){
          //显示对话信息 就是返回我俩对话的信息
          if(
            (
              store.state.state_arr[i].m_from==store.state.user_chat.m_phone &&
              store.state.state_arr[i].m_to==get("account")
            )
            ||
            (
              store.state.state_arr[i].m_from==get("account")&&
              store.state.state_arr[i].m_to==store.state.user_chat.m_phone
            )
            ){
            messages.push(store.state.state_arr[i])
          }

        }
        return messages;
      },
      select_img(val){//返回聊天信息的头像
        if(val.m_from==get("account")){
          return "/api/txzh/pic/"+get("pic")+".jpeg"
        }else{
          return store.state.user_chat.m_img
        }
      },
      user_img_show(){//返回管理员头像
        return "/api/txzh/pic/"+get("pic")+".jpeg"
      }
    },
    computed:{
      isChat(){

      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  *{
    margin 0
    padding 0
  }
  .chats
    .el-container
      margin 0 100px
    .el-aside
      background-color: #333;
      color: #333;
    .el-main
      background-color: rgb(238,238,238);
      color: #333;
      padding 0
  /*--------------布局-------------------*/
    .left
      padding 10px
      height 700px
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



    .right
      padding 10px
      .title
        height 50px
        background-color rgb(238,238,238)
        line-height 50px
        text-align center
      .content
        height 490px
        border-bottom 1px solid rgb(214,214,214)
        border-top 1px solid rgb(214,214,214)
        overflow hidden
        .tab-ul
          .tab_item
            position relative
            display: flex;
            align-items: flex-start
            min-height 50px
            margin-bottom  30px
            .div_img
            .img_show
              width:50px
              height: 50px
            .txt
              line-height 50px
              max-width 300px
              word-break: break-all
              white-space: normal
            .div_img2
              position absolute
              right 0px
            .txt2
              position absolute
              top 10px
              right  60px
              max-width 350px
              word-break: break-all;
              white-space: normal;

          .tab_item2
            position relative
            display: flex;
            flex-direction:row-reverse
            align-items flex-start
            min-height 50px
            margin-bottom  30px
            .div_img
            .img_show
              width:50px
              height: 50px
            .txt
              line-height 50px
              margin-right 10px
              max-width 300px
              word-break: break-all
              white-space: normal
            .div_img2
              position absolute
              right 0px
            .txt2
              position absolute
              top 10px
              right  60px
              max-width 350px
              word-break: break-all;
              white-space: normal;

          .time
            height 50px
            line-height 50px
            text-align center
            color: rgb(142,143,143)
      .send_div
        height 210px
        .header
          padding 10px 5px
          i
            font-size 25px
            margin-left 10px
        .main
          height 100px
          padding-left 10px
          background-color rgb(238,238,238)
          .send_input
            width 100%
            height 100px
            color: black
            border none
            outline none
            background-color rgb(238,238,238)
        .send
          text-align right
          vertical-align middle

</style>
