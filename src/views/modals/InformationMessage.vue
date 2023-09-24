<template>
	<Modal>
		<ModalHeader>
			<h6 class="modal-title">{{title}}</h6>
				<div>
				<button class="btn cus_btn" @click="btnOkClick"><font-awesome-icon :icon="['fas', 'xmark']" /></button>
			</div>	
		</ModalHeader>
		<ModalBody>
			<p class="mb-0 prevent-select">
				<span :class="getColor" style="font-size: 30px;position: absolute;top: 50%;transform:translateY(-40%);line-height: normal;height: 35px;">
					<font-awesome-icon :icon="['fas', 'triangle-exclamation']" />
				</span>				
				<span v-html="msgInfo" style="padding-left:38px"></span>
			</p>
		</ModalBody>
		<ModalFooter>			
			<button @click="btnOkClick" class="btn">OK</button>
		</ModalFooter>
	</Modal>
</template>
<script>
import Modal from '../../modules/modals/components/ModalView.vue';
import ModalHeader from '../../modules/modals/components/ModalHeader.vue';
import ModalFooter from '../../modules/modals/components/ModalFooter.vue';
import ModalBody from '../../modules/modals/components/ModalBody.vue';
import ModalMixin from '../../modules/modals/mixins/ModalMixin';
import {eventBus} from "@/main";
/* info,  confirmation */
export default {
    name:"InformationMessage", 
    components: { Modal, ModalHeader, ModalBody, ModalFooter },
    mixins: [ModalMixin],
    data(){
		return {
		title:"Product",
	}
    },	
	computed:{
		getColor: function() {
			let colInfo = 'blue';
			if (this.msgTitle == "Information Message") {
				colInfo = (this.msgIcon == "warninginfo") ? 'text-warning' : (this.msgIcon == "warning") ? 'text-danger' : 'text-warning';
			}
			return colInfo;
		}
	},
    mounted() {
		if (this.msgTitle != undefined && this.msgTitle == "Information Message") {
			this.title = "Todos App";
		}
	},
  methods:{
    btnOkClick: function (){
      this.dismiss('Modal dismissed')
      if (this.msgInfo == "Server Stopped, Please check...")
        window.location.href = "/login";
      if (this.msgInfo == "Device has stopped responding or has been disconnected.")
        if (this.$route.fullPath.toLowerCase().indexOf("dashboard") != -1)
          eventBus.$emit("refreshDevices");
        else
          this.$router.push("/dashboard");
    }
  },
}
</script>


