<template>
  <Modal>
    <ModalHeader>
      <h6 class="modal-title"><strong>About</strong></h6>
      <div>
        <button class="btn cus_btn" @click="dismiss('Modal dismissed')">
          <font-awesome-icon :icon="['fas', 'xmark']" />
        </button>
      </div>
    </ModalHeader>
    <ModalBody>
      <div>
        <div class="row">
          <div class="col-lg-12 text-center">
            <img :src="$store.state.todos" width="190" />
          </div>
        </div>
        <div class="text-center">
          <p class="mb-0" style="font-size: 15px; font-weight: 500">
            Vue version: <strong id="oneappver"> {{ appVersion.version }}</strong>
          </p>
          <hr color="#003399" size="2" style="margin: 5px 0" />
          <p class="mb-0" style="font-size: 14px; font-weight: 500">
            © {{ new Date().getFullYear() }} All rights reserved.
          </p>
        </div>
      </div>
    </ModalBody>
    <ModalFooter class="justify-content-center">
      <button @click="dismiss('Modal dismissed')" class="btn cus_btn" style="min-width: 65px"> OK </button>
    </ModalFooter>
  </Modal>
</template>
  <script>
import Modal from "../../modules/modals/components/ModalView.vue";
import ModalHeader from "../../modules/modals/components/ModalHeader.vue";
import ModalFooter from "../../modules/modals/components/ModalFooter.vue";
import ModalBody from "../../modules/modals/components/ModalBody.vue";
import ModalMixin from "../../modules/modals/mixins/ModalMixin";
import version from "../../../package.json";
export default {
  name: "AboutUs",
  components: { Modal, ModalHeader, ModalBody, ModalFooter },
  mixins: [ModalMixin],
  data() {
    return {
      appVersion: version,
    };
  },
};
</script>