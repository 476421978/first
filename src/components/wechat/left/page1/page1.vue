<template>
  <div class="page_1" ref="page_1">
    <div>
      <ul>
        <li class="page-item" v-for="(item,index) in show_from_user()" @click="click_item(index,$event)">

          <div class="user_img">
            <img :src="user_img_show(item)" width="50" height="50">
            <span class="m_number" v-show="$store.state.m_count>0">数量</span>
          </div>

          <span class="name">{{item.m_from}}</span>

          <span class="content">{{item.m_content}}</span>

          <div class="time">
            <span>时间</span>
          </div>

        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Bus from '../../../../commons/js/bus.js';
  import store from '../../../../vuex/store';
  import {get,set,cl} from '../../../../commons/js/cookie'
  export default{
    data(){
      return{
        no_read:{
          m_id:"",
          m_phone:"",
          m_img:"",
          m_content:"",
          m_read:""
        }
      }
    },
    created(){
      this.$nextTick(()=> {
        this._initScroll();
      });
    },
    methods:{
      _initScroll(){
        this.meunScroll = new BScroll(this.$refs.page_1, {
          click: true
        });
      },
      show_from_user(){//处理信息 除了自己发送的 都接受 相同用户发来的信息要集合在一个li中显示
        const messages =[];
        for(var i in store.state.state_arr){
          if(store.state.state_arr[i].m_from!=get("account")){
            messages.push(store.state.state_arr[i])
          }
        }
        return messages
      },
      click_item(i,event){//点击用户打开聊天界面
//          console.log(i+"-----");
//          console.log(event.target);
        //更新现在对话的对象  获取点击的ID
/*        store.state.user_chat.m_id=store.state.all_user[i].id;
        store.state.user_chat.m_name=store.state.all_user[i].name;
   /!*     store.state.user_chat.m_img = store.state.all_user[i];*!/
        console.log(store.state.user_chat.m_id+ store.state.user_chat.m_name)*/
      },
      user_img_show(val){
        console.log(val)
        return "/api/txzh/pic/"+ val.m_from+".jpeg"
      }
    },
    computed:{//相同用户发来的信息集中显示在一个li中
      filtersMessage(){
    /*     for(var i in store.state.message_arr ){
           if(store.state.message_arr[i].m_from){

           }
         }
        return ;*/
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .page_1
    overflow hidden
    height 600px
    .page-item
      position relative
      display flex
      border-top 1px solid rgb(41,44,51)
      width 100%
      padding: 10px
      .user_img
        .m_number
          position absolute
          top 7px
          left 50px
          font-size 5px
          width 15px
          text-align center
          color: #fff
          background-color red
          border-radius 30px
      .name
        position absolute
        left 70px
        color: #fff
      .content
        position absolute
        top 30px
        left 70px
        color: rgb(142,143,143)
      .time
        color rgb(93,94,108)
        position: absolute
        top 10px
        right:20px

</style>
