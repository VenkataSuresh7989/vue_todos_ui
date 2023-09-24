<template>
    <div class="loginWrap">
        <div class="container" id="container">
        <form @submit.prevent="btnResetPwd()" class="pb0">
        <div class="mb-2">
            <h1>Forgot Password</h1>
          <span>Enter your registered email to reset your password.</span>  
        </div>
        <div class="w-100">
          <div class="form-group">
            <input type="email" v-model="txtEmail" placeholder="Email" required autocomplete />  
          </div>
          <div class="form-group">
            <input type="password" v-model="txtPassword" placeholder="Password" required autocomplete />
          </div>
          <div class="d-flex justify-content-center w-100">
            <button class="mt-0 mb-3" type="submit">Reset password</button>
          </div>          
        </div>
        <p v-if="isErrMsg" :class="errClass" class="text-center mt-3">{{ errMsg }}</p>    
      </form>  
    </div>  
    </div>
</template>
<script>
export default {
    name:"ForgotPassword",
    data(){
    return {
        txtEmail:"",
        txtPassword:"",
        errMsg:"",
        errClass:'text-danger'
    }
    },
    computed:{
    isErrMsg: function() {
        return (this.errMsg == "") ? false : true;
    }
    },
    methods:{
    isSignUp: function() {        
        this.$router.push("/");
    },
    btnResetPwd: function() {
        // displayPageInfo("post", "/updatepassword?email="+this.txtEmail +"&password="+this.txtPassword).then(response => {
        // if(response.status == 200)
        // {
        //     this.txtEmail = "";
        //     this.txtPassword = "";
        //     this.errMsg = response.data;
        //     this.errClass = "text-success";
        //     setTimeout(() => {
        //     this.errMsg = "";
        //     this.$router.push("/");
        //     }, 3000);          
        // }
        // else
        // {
        //     this.errMsg = response.data;
        //     setTimeout(() => {
        //     this.errMsg = "";
        //     }, 5000);
        // }
        // })
        // .catch(error => {
        //  this.$store.state.gblConsolePrints.push(error);
        // });
    }
    }

}
</script>