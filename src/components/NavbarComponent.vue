<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Todos</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item @click="btnRefresh">Refresh</b-nav-item>
          <b-nav-item @click="btnAbout">About</b-nav-item>
          <b-nav-item-dropdown right>
            <template #button-content>
              <em>{{ getUserName }}</em>
            </template>
            <b-dropdown-item @click="btnProfile">Profile</b-dropdown-item>
            <b-dropdown-item @click="btnSignOut">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import { eventBus } from "../main";
import ModalService from "../modules/modals/services/modal.service";
import ConfirmationMessage from "../views/modals/ConfirmationMessage.vue";
import Aboutus from '../views/modals/AboutUs.vue';
import Profileinfo from '../views/modals/ProfileInfo.vue';

// import InformationMessage from '../views/modals/InformationMessage.vue';

export default {
  name: "NavbarComponent",
  computed: {
    getUserName: function () {
      let usNrame = localStorage.getItem(
        "username" + sessionStorage.getItem("auth_token").toString()
      );
      let emailWithoutDomain = usNrame.replace("@gmail.com", "");
      usNrame =
        emailWithoutDomain.charAt(0).toUpperCase() +
        emailWithoutDomain.slice(1);
      return usNrame.replace("", "");
    },
  },
  mounted() {
    eventBus.$on("isSignout", () => {
      Object.keys(localStorage).forEach((itemId) => {
        let resp = itemId
          .toString()
          .includes(sessionStorage.getItem("auth_token").toString());
        if (resp) localStorage.removeItem(itemId.toString());
      });
      sessionStorage.clear();
      window.location.reload();
    });
  },
  destroyed() {
    eventBus.$off("isSignout");
  },
  methods: {
    btnRefresh: function() {
      eventBus.$emit("isRefresh");
    },
    btnAbout: function() {
      ModalService.open(Aboutus);
    },
    btnProfile: function() {
      ModalService.open(Profileinfo);
    },
    btnSignOut: function () {
      ModalService.open(ConfirmationMessage, [{ msgTitle: "", msgInfo: "Are you sure you want to Logout?" }]);
    },
  },
};
</script>
