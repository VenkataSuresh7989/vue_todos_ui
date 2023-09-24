<template>
    <form @submit.prevent="btnLogin()">
      <div class="mb-2">
        <h1>Sign in</h1>
        <span>or use your account</span>
      </div>
      <div class="w-98">
        <div class="form-group">
          <input type="email" v-model="txtEmail" placeholder="Email" required autocomplete />  
        </div>
        <div class="form-group">
          <input type="password" v-model="txtPassword" placeholder="Password" required autocomplete />
        </div>
        <div class="d-flex justify-content-between w-100">
          <a @click="isSignUp" class="mt-0 mb-3 visible-sm">Sign up</a>
          <a href="/forgotpwd" class="mt-0 mb-3">Forgot your password?</a>
        </div>    
        <button type="submit">Sign In</button>
      </div> 
      <p v-if="isErrMsg" class="text-danger erMsg text-center mt-3">{{ errMsg }}</p>
    </form>
  </template>
    
  <script>
  import axios from 'axios';
  
  export default {
    name: "LoginScreen",
    data(){
      return {
        txtEmail:"suresh@gmail.com",
        txtPassword:"suresh",
        errMsg:"",
      }
    },
    computed:{
      isErrMsg: function() {
        return (this.errMsg == "") ? false : true;
      }
    },
    methods: {   
      isSignUp: function() {
        if(document .getElementById("container") != undefined && document .getElementById("container") != null)
          document.getElementById("container").classList.add("right-panel-active");
      },
      btnLogin() {
        const formData = new FormData();
        formData.append('username', this.txtEmail);
        formData.append('password', this.txtPassword);
        
        axios.post(axios.defaults.baseURL.toString() + '/token', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          if(response.status == 200)
          {
            sessionStorage.setItem("auth_token",Date.now());
            localStorage.setItem("username" + sessionStorage.getItem("auth_token").toString(),this.txtEmail);
            localStorage.setItem("user_info" + sessionStorage.getItem("auth_token").toString(),JSON.stringify(response.data.user_info));
            localStorage.setItem("auth_token" + sessionStorage.getItem("auth_token").toString(),response.data.access_token);
            this.txtEmail = "";
            this.txtPassword = "";
            this.$router.push("/dashboard");
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
          console.error('Error:', error);
        });
      },
    },
  };
  </script>