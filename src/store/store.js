import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userImg: "http://localhost:8080/static/img/userDefault.png",
    queryBuyMovieList: [],
    newUserName: "",
    vipDate: "2022-1-15 到期"
  },
  mutations: {
    showPeople(state, msg) {
      state.userImg = msg;
    },
    queryMovieFun(state, msg) {
      state.queryBuyMovieList = msg;
    },
    newUserNameFun(state, msg) {
      state.newUserName = msg;
    },
    vipDateFun(state, msg) {
      state.vipDate = msg;
    }
  }
});

export default store;
