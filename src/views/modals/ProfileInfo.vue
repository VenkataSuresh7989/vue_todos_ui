<template>
    <Modal>
      <ModalHeader>
        <h6 class="modal-title"><strong>Profile</strong></h6>
        <div>
            <button class="btn cus_btn" @click="dismiss('Modal dismissed');">
                <font-awesome-icon :icon="['fas', 'xmark']" />
            </button>
        </div>
      </ModalHeader>
      <ModalBody>
        <div class="container-fulid profinfo">
        <form>
          <div class="form-group">
            <label for="formGroupExampleInput1">User Name</label>
            <input type="text" class="form-control" id="formGroupExampleInput1" v-model="info.username" @change="handleChange($event,'username')">
          </div>
          <div class="form-group">
            <label for="formGroupExampleInput2">Full Name</label>
            <input type="text" class="form-control" id="formGroupExampleInput2" v-model="info.full_name" @change="handleChange($event,'full_name')">
          </div>
          <div class="form-group">
            <label for="formGroupExampleInput3">Email</label>
            <input type="text" class="form-control" id="formGroupExampleInput3" v-model="info.email" @change="handleChange($event,'email')">
          </div>
          <div class="form-group">
            <label for="formGroupExampleInput4">Password</label>
            <input type="text" class="form-control" id="formGroupExampleInput4" v-model="info.hashed_password" @change="handleChange($event,'hashed_password')">
          </div>
        </form>
        </div>
      </ModalBody>
      <ModalFooter class="justify-content-center">
        <button @click="btnUpdate" class="btn cus_btn" style="min-width:65px"> Update </button>
        <button @click="dismiss('Modal dismissed')" class="btn cus_btn" style="min-width:65px"> Close </button>
      </ModalFooter>
    </Modal>
  </template>
  <script>
  import Modal from "../../modules/modals/components/ModalView.vue";
  import ModalHeader from "../../modules/modals/components/ModalHeader.vue";
  import ModalFooter from "../../modules/modals/components/ModalFooter.vue";
  import ModalBody from "../../modules/modals/components/ModalBody.vue";
  import ModalMixin from "../../modules/modals/mixins/ModalMixin";
import { chgDataValidation, displayPageInfo } from '@/assets/scripts/common';
import { eventBus } from '@/main';
  // import ModalService from "../../modules/modals/services/modal.service";
  // import { displayPageInfo } from '@/assets/scripts/common';
  // import InformationMessage from '../../views/modals/InformationMessage.vue';

  export default {
    name: "ProfileInfo",
    components: { Modal, ModalHeader, ModalBody, ModalFooter },
    mixins: [ModalMixin],
    data() {
      return {
        info: JSON.parse(localStorage.getItem("user_info" + sessionStorage.getItem("auth_token").toString())),
        chgData : {}
      };
    },
    methods: {
      btnUpdate: function() {
        let chgResp = chgDataValidation('user_info',this.chgData);
        displayPageInfo("post", "/updateuser?id="+this.info.id + "&data=" + JSON.stringify(chgResp)).then(response => {
          if (response.status == 200) {
            chgResp.forEach(newData => {
              const existingObject = JSON.parse(localStorage.getItem("user_info" + sessionStorage.getItem("auth_token").toString()));
              if (existingObject) {
                Object.assign(existingObject, newData);
              }
              localStorage.setItem("user_info" + sessionStorage.getItem("auth_token").toString(), JSON.stringify(existingObject));
            });
            eventBus.$emit("isSignout");
          }
        })
        .catch(error => {
          this.$store.state.gblConsolePrints.push(error);
        });

      },
      handleChange: function(event,key) {
        this.chgData[key] = {"key" : key, "value" : event.target.value};
      }
    }
  };
  </script>