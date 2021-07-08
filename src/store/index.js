import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        userid: "",
        userInfo: "",
        lineid: [],
        today: ""
    },

    getters: {
        getuserid: function (state) {
            return state.userid
        },
        getlineid: function (state) {
            return state.lineid
        },
        gettoday:function(state){
            return state.today
        }
    },
    mutations: {
        getuserid(state, newval) {//存储用户ID
            state.userid = newval;

            var params = {
                mode: "GetLogin",
            };
            getuserinfo(params)
                .then(function (response) {
                    console.log(response.data);
                    state.userInfo = response.data;
                })
                .catch(function (error) {
                    that.$message.error(error);
                });

        },
        outlogin(state) {//清除用户信息
            state.userid = "";
            state.userInfo = "";
        },
        setlineid(state, newval) {
            state.lineid = newval;
        },
        settoday(state,newval){
            
            console.log(newval);
            state.today=newval;
        }
    },
    actions: {
        getuseridfun(context, newval) {
            context.commit("getuserid", newval);
        },
        outloginfu(context) {
            context.commit("outlogin", "");
        },
        setlineid(context, newval) {
            context.commit("setlineid", newval)
        },
        settoday(context,newval){
            context.commit("settoday",newval)
        }
    }
});

export default store;