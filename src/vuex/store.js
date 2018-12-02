import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

/*1.state在vuex中用于存储数据*/
const state={
    all_user:[],
    user_chat:{//聊天对象的保存
      m_id:"",//id
      m_name:"",//昵称
      m_img:'',//头像
      m_phone:''//电话
    },

    state_arr:[],//全部聊天信息保存
    chat_list:{//聊天信息
      m_content:"",//聊天内容
      m_count:"",//信息数量
      m_from:"",//来自
      m_to:"",//目标
      m_read:""//是否已经读取
    },

    no_read:{//每一个用户有多少条未读信息
      m_id:"",
      m_phone:"",
      m_img:"",
      m_content:"",
      m_count:"",
      m_read:""
    },


}



/*聊天对象信息数组*/



/*2.mutations里面放的是方法，方法主要用于改变state里面的数据
 */
const mutations={
  addCount(){
    state.m_count++;
  },
  reduceCount(){

  },
  clearCount(){

  },
  messageAdd(){
   /* state.state_arr.push(state.chat_list);
    console.log(state.state_arr);
    for(var i in state.state_arr){//历遍数组对象
      console.log(i+": "+state.state_arr.m_content)
    }*/
  },

  getMessage(){


    for(var i=0;i< state.state_arr.length;i++){
      console.log(i+": "+state.state_arr[i].m_content)
    }
  }
}


const getters={
    get_message(){/*获取信息组的长度*/
      return null
    }
}


//vuex  实例化 Vuex.store
export default new Vuex.Store({
  state,
  mutations,
  getters,

});



