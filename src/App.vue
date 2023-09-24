<template>
  <div>
    <router-view />   
    <ModalRoot />
    <ModalChild />
    <ModalSubChild /> 
  </div>
</template>
<script>
import ModalRoot from './modules/modals/components/ModalRoot.vue';
import ModalChild from './modules/modals/components/ModalChild.vue';
import ModalSubChild from './modules/modals/components/ModalSubChild.vue';
export default {
  name:"App",
  components:{ModalRoot, ModalChild, ModalSubChild},
}
</script>
