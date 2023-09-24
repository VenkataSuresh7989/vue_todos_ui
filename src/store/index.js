import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

// var baseIP = "127.0.0.1";
var baseIP = "192.168.0.106";
axios.defaults.baseURL = 'http://'+ baseIP + ':8000';
// axios.defaults.baseURL = "https://ecommerce-k4ny.onrender.com";

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    popupName:'',
    gblConsolePrints:[],
    todos:require("../assets/images/todos.jpg")
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
