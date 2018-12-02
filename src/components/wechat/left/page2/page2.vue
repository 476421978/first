<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="page_2" ref="page_2">
     <div>
        <ul class="tab-ul" v-for="(item,index) in data">
            <split></split>
            <li class="tab-item" @click="click_item(item.id,$event)">
                <img :src="user_img_show(item.pic)" class="img_show">
                <span class="name">{{item.name}}</span>
            </li>
        </ul>
     </div>
      <!--右边字母跳转-->
     <ul class="tab-az">
        <li v-for="(item,index) in group" class="za-item" @click="move_zm(index)">
            {{item}}
        </li>
      </ul>


  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Bus from '../../../../commons/js/bus.js';
  import split from '../../split/split.vue';
  import store from '../../../../vuex/store'
  import {get,set,cl} from '../../../../commons/js/cookie'


  export default{
    props:{

    },
    data(){
      return{
        group:[
          'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t',
          'u','v','w','x','y','z'
        ],
        friends:[],
        friends_img:[],
        data:[],
      }
    },
    created(){
      this.$nextTick(()=> {
        this._initScroll();
      });

      //获取所有用户信息
      this.seach_all();


    },
    methods:{
      _initScroll(){
        this.meunScroll = new BScroll(this.$refs.page_2, {
          click: true
        });
      },
      move_zm(i){
        console.log(this.group[i]+"--");
      },
      seach_all(){//获取所有用户信息
        const that = this;
        var params = new URLSearchParams();
        params.append('adminid',get("id"));
        params.append('adminpassword',get("pw"));
        this.axios.post("/api/txzh/getUserList",params).then(function (response) {
          console.log(response.data)
          that.data=response.data;
        }).catch(function (error) {
          console.log(error)
        })
      },
      click_item(i,event){//点击用户打开聊天界面
        console.log(i + event)
          //更新现在对话的对象 循环判断是哪个用户
        for(var t=0;t<this.data.length; t++){
          if(i===this.data[t].id){//保存当前聊天对象的信息
            store.state.user_chat.m_id=this.data[t].id;
            store.state.user_chat.m_phone = this.data[t].phonenum
            store.state.user_chat.m_name=this.data[t].name;
            store.state.user_chat.m_img = this.user_img_show(this.data[t].pic);
          }
        }

      },
      user_img_show(val){
        return "/api/txzh/pic/"+val+".jpeg"
      },

    },
    components:{
      split
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .page_2
    position relative
    height 600px
    overflow hidden
    .tab-ul
      width 100%
      .tab-item
        border-top 1px solid rgb(41,44,51)
        width 100%
        padding: 10px
        cursor hand
        .img_show
          width 50px
          height 50px
        .name
          font-size 10px
          color: #fff
    .tab-az
      position absolute
      top 0
      right 10px
      color: #fff
      .za-item
        list-style none
        cursor pointer



</style>
