<template>
  <div class="loginWrap">
      <div class="container" id="container">
        <div>
          <div class="form-container sign-up-container">
            <Register />
          </div>
          <div class="form-container sign-in-container">
            <Login />
          </div>
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <font-awesome-icon style="font-size: 30px;" :icon="['fas', 'cart-plus']"/>
              <h1 class="text-center" style="color: #000">eCommerce</h1>
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button class="ghost" id="signIn" @click="isLogin">Sign In</button>
            </div>
            <div class="overlay-panel overlay-right">
              <font-awesome-icon style="font-size: 30px;" :icon="['fas', 'cart-plus']"/>
              <h1 class="text-center" style="color: #000">eCommerce</h1>
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button @click="isSignUp" class="ghost" id="signUp">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
  </div>  
</template>
<script>
import Login from "../components/LoginScreen.vue";
import Register from "../components/RegistrationComponent.vue";
export default {
  name: "MainLayout",
  components: {
    Login,
    Register,
  },
  methods: {
    isLogin: function () {
      document.getElementById("container").classList.remove("right-panel-active");
    },
    isSignUp: function () {
      document.getElementById("container").classList.add("right-panel-active");
    },
  },
};
</script>