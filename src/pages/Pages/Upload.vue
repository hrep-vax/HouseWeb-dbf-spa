<template>
  <card>
    <h5 slot="header" class="title">Upload DBF</h5>
    <form>

    <div class="grid grid-cols-12 gap-6 mb-4 sm:mb-0">
    <div class="col-span-12">
      <div class="col-md-6">
            <!-- <h4 class="card-title">DBF Type</h4>
            <div class="row">
              <div class="col-md-6">
                <el-select
                  class="select-primary"
                  size="large"
                  placeholder="Single Select"
                  v-model="selects.simple"
                  name = "dbfType"
                 
                  
                >
                  <el-option
                    v-for="option in selects.countries"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                    
                  >
                  </el-option>
                </el-select>
              </div> -->
          
            </div>
          </div>
          <br>
    <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" v-on:vdropzone-sending="sendingEvent"></vue-dropzone>
    <!-- <button v-on:click="triggerSend()">Send images</button> -->
    <br>
     
     <div class="grid grid-cols-4 gap-4 mb-4 sm:mb-4">

          <div class="col-span-2">                
            <base-button type="info" v-on:click="triggerSend()">
               Upload and Convert
              </base-button>
          </div>         
        </div>
          
    </div>
    </div>
    </form>
  </card>
</template>
<script>
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import {Select, Option } from 'element-ui';


export default {
   data(){
     return{
       dropzoneOptions: {
          url: 'http://127.0.0.1:8000/api/dbf/dbf-upload',
          thumbnailWidth: 150,
          maxFilesize: 500,
          parallelUploads: 100,
          maxFiles: 1,
     
          headers: { Authorization: `Bearer ${localStorage.getItem('WEB_APP_KIT_TOKEN')}`},
          // params:{
          //   foldername: this.selects.simple
          // }
      },
      selects: {
        simple: '',
        countries: [
          { value: 'c_advice', label: 'c_advice' },
          { value: 'constaff', label: 'constaff' },
          { value: 'consult', label: 'consult' },
          { value: 'special', label: 'special' },
          { value: 'coterm', label: 'coterm' },
          { value: 'loyalty', label: 'loyalty' },
          { value: 'rama', label: 'rama' },
          { value: 'ramaneta', label: 'ramaneta' },
          { value: 'cont', label: 'cont' },
          { value: 'secre', label: 'secre' },
          { value: 'staff', label: 'staff' }
        ],
      },
     }     
   },
   components:{
     vueDropzone: vue2Dropzone,
      [Option.name]: Option,
    [Select.name]: Select,
   }, 
   methods: {
    triggerSend() {
      this.$refs.myVueDropzone.processQueue();
    },
    sendingEvent(file, xhr, formData) {
      console.log(formData);
      formData.append("foldername", this.selects.simple);
    },
  }
   
  }
  
</script>
<style>
.extended-forms .el-select {
  width: 100%;
  margin-bottom: 30px;

}
</style>
