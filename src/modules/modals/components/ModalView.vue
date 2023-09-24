<template>
  <div class="modal">
    <div class="modal-dialog" v-bind:class="(this.dialogName != '') ? this.dialogSize : ''">
      <div class="modal-content">
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
import {store} from "../../../store/index"
export default ({  
  name:"ModalView",
  data(){
    return{
      dialogName: store.popupName,
      dialogSize:'',
    }   
  },  
  created(){    
    var dlgName = this.dialogName;    
    var psize = '';    
    switch (dlgName) {      
        case "1": { psize = "win-100"; } break;
        case "2": { psize = "win-150"; } break;
        case "UploadPackage": { psize = "win-350 modal-dialog-centered"} break;
        case "AboutUs": { psize = "win-350 modal-dialog-centered"} break;
        case "ProfileRename": { psize = "win-350 modal-dialog-centered"} break;        
        case "TrunkingpadChangeConfirmation":
        case "TrunkLevelPadValueConfirmation": { psize = "win-450 modal-dialog-centered"} break;
        case "Loader": { psize = "win-auto modal-dialog-centered loaderPopup"} break;
        case "WiFiConfig":
        case "FirmwareUpgrade": { psize = "win-400 modal-dialog-centered"} break;        
        case "ConfirmationMessage":
        case "InformationMessage": { psize = "win-400 modal-dialog-centered"} break;
        case "18": { psize = "win-950"; } break;
        case "19": { psize = "win-1000"; } break;
        case "20": { psize = "win-1050"; } break;
        case "25": { psize = "win-1300"; } break;
        case "26": { psize = "win-1350"; } break;        
        default: { psize = "win-400"; } break;
    }
    this.dialogSize = psize;    
  }
})
</script>
<style scoped>   
      
</style>