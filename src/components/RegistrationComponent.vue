<template>
    <form @submit.prevent="btnRegister()">
      <div class="mb-2">
        <h1>Create Account</h1>
        <span>or use your email for registration</span>
      </div>
      <div class="w-98">
        <div class="form-group">
          <input type="text" v-model="txtName" placeholder="Name" required autocomplete />
        </div>
        <div class="form-group">
          <input type="email" v-model="txtEmail" placeholder="Email" required autocomplete />
        </div>
        <div class="form-group">
          <input type="password" v-model="txtPassword" placeholder="Password" required autocomplete />
        </div>
        <div>
          <p @click="isLogin" class="visible-sm">
            <a href="#"> Login already a member</a>
          </p>
          <button type="submit">Sign Up</button>
        </div>
      </div>
      <p v-if="isErrMsg" class="text-danger text-center mt-3">{{ errMsg }}</p> 
    </form>
  </template>
  
  <script>
  import { displayPageInfo } from '../assets/scripts/common';
  export default {
    name: "RegisterComponent",
    data(){
      return {
        txtName:"",
        txtEmail:"",
        txtPassword:"",
        errMsg:"",
      }
    },
    computed:{
      isErrMsg: function() {
        return (this.errMsg == "") ? false : true;
      }
    },
    methods: {
      isLogin: function() {
        if(document .getElementById("container") != undefined && document .getElementById("container") != null)
          document .getElementById("container").classList.remove("right-panel-active");
      },
      btnRegister: function() {
        displayPageInfo("post", "/register?username="+ this.txtName +"&email="+this.txtEmail +"&password="+this.txtPassword).then(response => {
          if(response.status == 200)
          {
            this.txtName = "";
            this.txtEmail = "";
            this.txtPassword = "";
            this.isLogin();
          }
          else
          {
            this.errMsg = response.data;
            setTimeout(() => {
              this.errMsg = "";
            }, 5000);
          }
        })
        .catch(error => {
          this.$store.state.gblConsolePrints.push(error);
        })
      }
    },
  };
  </script>