<template>
  <div>
    <NavbarComponent />
    <div class="p-3">
      <div class="container">
        <div class="p-3">
          <div>        
            <div class="card mb-2 text-left">
              <form>
                <div class="row align-items-end">
                <div class="col-8 text-left">
                  <label for="inputEmail1" class="form-label">Name</label>
                  <input type="text" v-model="txtName" class="form-control" id="inputEmail1" required> 
                </div>
                <div class="col-4 text-left">
                  <button type="button" @click="btnAdd" class="btn btn-primary">Add</button>
                </div>
              </div>
              </form>
            </div>
          </div>
          <div class="mt-3">
            <div class="card">
              <div class="table-container">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody v-if="getInfoStatus">
                  <tr v-for="(data, idx) in info" :key="idx">
                    <th scope="row">{{ idx + 1 }}</th>
                    <td v-if="isEditIcon && (selIdx == idx)"><input type="text" v-model="data.name" class="form-control"></td>
                    <td v-else>{{ data.name }}</td>
                    <td>
                      <div>                        
                        <!-- <span class="mr-2" v-if="getSelIdx(data.id)" @click="btnEdit(idx,data.id,data.name)"><font-awesome-icon :icon="['fas', 'check']" /></span>

                        <span :class="(getDisableClass(data.id)) ? 'disabled-span' : ''"  class="mr-2" v-else @click="btnEdit(idx,data.id)"><font-awesome-icon :icon="['fas', 'pen-to-square']" /></span>
                        
                        
                        <span v-if="(getDisableClass(data.id) || getSelIdx(data.id)) ? 'disabled-span' : ''" @click="btnDelete(data.id)"><font-awesome-icon :icon="['far', 'circle-xmark']" /></span>
                        <span v-if="!(getDisableClass(data.id) || getSelIdx(data.id)) ? 'disabled-span' : ''" @click="btnDelete(data.id)"><font-awesome-icon :icon="['fas', 'trash']" /></span>
                       -->
                                             
                      <!-- <span>{{selIdx }} , {{ idx }}</span> -->

                      <div v-if="isEditIcon && (selIdx == idx)">
                        <span @click="btnSet('update',data,idx)"><font-awesome-icon :icon="['fas', 'check']" /></span>                      
                        <span @click="btnSet('replace',data,idx)"><font-awesome-icon :icon="['far', 'circle-xmark']" /></span>
                      </div>

                      <div v-else>
                        <span :id="'editIcon' + idx" @click="btnSet('edit',data,idx)"><font-awesome-icon :icon="['fas', 'pen-to-square']" /></span>
                        <span :id="'deleteIcon' + idx" @click="btnSet('remove',data,idx)"><font-awesome-icon :icon="['fas', 'trash']" /></span>
                      </div>
                      </div>
                    </td>
                  </tr>                
                </tbody>
                <tbody v-else>
                  <tr >
                    <td colspan="4" class="text-center text-danger"><strong>No data found</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalService from '../modules/modals/services/modal.service';
import ConfirmationMessage from "../views/modals/ConfirmationMessage.vue";
import InformationMessage from '../views/modals/InformationMessage.vue';
import NavbarComponent from "../components/NavbarComponent.vue";
import { displayPageInfo } from '../assets/scripts/common';
import { eventBus } from '../main';

export default {
  name:"HomeView",
  data() {
    return {
      isCheck:false,
      txtName:"",
      txtCustomersCount:0,
      info : [],
      selIdx:null,
      isEditIcon:false,
    }
  },
  created() {
    this.getProductsInfo();
  },
  mounted(){
    eventBus.$on("isRefresh",()=>{
      this.getProductsInfo();
    });
    eventBus.$on("deleteName",(resp)=>{
      this.isDelete(resp.idx);
    });
  },
  destroyed(){
    eventBus.$off("isRefresh");
    eventBus.$off("deleteName");
  },
  computed: {
    getInfoStatus: function() {
      return (Object.keys(this.info).length > 0) ? true : false;
    },
  },  
  components: { NavbarComponent },
  methods: {
    btnSet: function(key,chgData,idx) {
      this.selIdx = idx;
      switch (key) {
        case "edit":
        {
          this.isEditIcon = !this.isEditIcon;
          for(let i=0;i<parseInt(this.txtCustomersCount);i++) {
            if(i != idx) {
              document.getElementById('editIcon'+i).classList.add('disabled-span');
              document.getElementById('deleteIcon'+i).classList.add('disabled-span');       
            }
          }         
        }
        break;
        case "update":
        {
          this.isEditIcon = !this.isEditIcon;
          this.removeClass();

          this.btnEdit(idx,chgData) // btnEdit(idx,data.id,data.name)

        }
        break;
        case "replace":
        {
          this.isEditIcon = !this.isEditIcon;
          this.removeClass();
          let getAuthKey = sessionStorage.getItem("auth_token");
          let getInfo = JSON.parse(localStorage.getItem('getInfo' + getAuthKey.toString()));
          this.info = getInfo;
        }
        break;
        case "remove":
        {
          ModalService.open(ConfirmationMessage, [{ msgTitle: "", msgInfo: "Are you sure you want to delete selected name?", nameValues:[{'idx':chgData.id}] }]);
        }
        break;
        default:
        {
          this.isEditIcon = !this.isEditIcon;
        }
        break;
      }
    },
    removeClass: function() {
      for(let i=0;i<parseInt(this.txtCustomersCount);i++) {
        let editIcon = document.getElementById('editIcon'+i);
        let deleteIcon = document.getElementById('deleteIcon'+i);

        if((editIcon != undefined && editIcon != null) && ((deleteIcon != undefined && deleteIcon != null))) {
          editIcon.classList.remove("disabled-span");
          deleteIcon.classList.remove("disabled-span");
        }
      }
    },
    getSelIdx(idx) {
      return ((idx !== undefined) && (idx !== null) && (this.isCheck) && (this.selIdx === idx));
    },
    getDisableClass(idx) {
      return ((idx !== undefined) && (idx !== null) && (this.isCheck) && (this.selIdx !== idx));
    },
    async getProductsInfo() {
      try {
        const response = await displayPageInfo("get", "/getallproducts");
        if (response.status === 200) {
          let getAuthKey = sessionStorage.getItem("auth_token");
          this.txtCustomersCount = Object.keys(response.data).length;
          localStorage.setItem('getInfo' + getAuthKey.toString(), JSON.stringify(response.data));
          this.info = response.data;
        } else {
          ModalService.open(InformationMessage, [{msgTitle: "Information Message", msgIcon: 'warning', msgInfo: response.data}]);
        }
      } catch (error) {
        this.$store.state.gblConsolePrints.push(error);
      }
    },
    btnAdd() {
      this.txtName = this.txtName.trim();
      if (this.txtName === "") {
        ModalService.open(InformationMessage, [{msgTitle: "Information Message", msgIcon: 'warning', msgInfo: "Name field cannot be empty."}]);
      } else {
        displayPageInfo("post", "/createproduct?name="+this.txtName).then(response => {
          if (response.status == 200) {
            this.txtName = "";
            this.getProductsInfo();
          }
        })
        .catch(error => {
          this.$store.state.gblConsolePrints.push(error);
        });
      }
    },
    btnEdit: function(idx,chgData) {
      this.selIdx = chgData.id;

      if (!this.isCheck && chgData.name === undefined) {
        this.isCheck = !this.isCheck;
      } else {
        if (chgData.name !== "") {
          
          let getAuthKey = sessionStorage.getItem("auth_token");
          let getInfo = JSON.parse(localStorage.getItem('getInfo' + getAuthKey.toString()));

          if(getInfo[idx]['name'] != chgData.name)
          {
            this.isCheck = !this.isCheck;
            displayPageInfo("post", "/updateproduct?id="+parseInt(chgData.id)+"&name="+chgData.name).then(response => {
              if (response.status == 200) {
                this.getProductsInfo();
              }
            })
            .catch(error => {
              this.$store.state.gblConsolePrints.push(error);
            });
          }
          else
            this.isCheck = !this.isCheck;
        } else {
          ModalService.open(InformationMessage, [{msgTitle: "Information Message", msgIcon: 'warning', msgInfo: "Name field cannot be empty."}]);
        }
      }
    },
    isDelete(id) {
      displayPageInfo("post", "/deleteproduct?id="+id).then(response => {
        if (response.status == 200) {
          this.txtName = "";
          this.getProductsInfo();
        }
      })
      .catch(error => {
        this.$store.state.gblConsolePrints.push(error);
      });
    },
  },
}
</script>
