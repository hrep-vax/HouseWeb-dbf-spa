<template>
  <div class="profile mt-4 sm:mt-14 mb-8 mx-auto border max-w-4xl rounded-xl shadow-lg overflow-hidden p-8">
    <div class="md:col-span-1">
      <div class="mb-5 sm:mb-0">
        <h3 class="text-xl font-semibold leading-6 text-message font">CHECK</h3>
        <p class="mt-1 text-md text-message-lighter">CHECK Record</p>
      </div>
    </div>
    <div class="hidden sm:block" aria-hidden="true">
      <div class="py-5">
        <div class="border-t border-gray-200"/>
        
      </div>
      <div>
        <div class="grid grid-cols-4 gap-4 mb-4 sm:mb-4">
          <label for="profile-first-name" class="text-medium font-medium text-message my-auto"> Employee Id:</label>
          <div class="col-span-2">
            <!--<app-text-input v-model="code" id = "code" name="code" rules="required|max:5"/>-->    
            <app-text-input v-model="emp_id" id = "emp_id" name="emp_id" rules="required|max:5"/>      
          </div>         
        </div>

        <!--<div class="grid grid-cols-4 gap-4 mb-4 sm:mb-4">
          <label for="profile-first-name" class="text-medium font-medium text-message my-auto"> Record count:</label>
          <div class="col-span-2">
            {{count}}  -  {{payee1[0]}}
          </div>  
        </div>-->
        <div class="grid grid-cols-4 gap-4 mb-4 sm:mb-4">
          <label for="profile-first-name" class="text-medium font-medium text-message my-auto"> Name:</label>
          <div class="col-span-2">
           {{ payee1 }}

           <!--2 {{ checkname }}-->
          </div>  
        </div>

   <!-- <p>{{message}}</p> -->
        <!--<div class="grid grid-cols-4 gap-4 mb-4 sm:mb-4">
          <label for="profile-first-name" class="text-medium font-medium text-message my-auto"> Check Array:</label>
          <div class="col-span-2">
            {{checkarray}}
            <tr v-for="row in checkarray" :key="row.code">
              
                
                 <td>{{ row.amount }} - {{ row.che_date }}</td>
                    
                </tr>
          </div>  
        </div>-->
        
         
      
        <!--<div class="grid grid-cols-4 gap-4 mb-4 sm:mb-4">
        <div class="col-span-2">
        <h3 class="p-3 text-center">List of Checks</h3>
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Amount</th>
                    <th></th>
                    <th>Check Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="index in count" :key="index">
                    <td>{{ amount[index-1] }}</td>
                    <td></td>
                    <td>{{ che_date[index-1] }}</td>
                </tr>
            </tbody>
        </table>
        </div>
        </div>--> 

        <div class="grid grid-cols-4 gap-4 mb-4 sm:mb-4">
        <div class="col-span-2">
        <h3 class="p-3 text-center">List of Checks</h3>
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Amount</th>
                    <th></th>
                    <th>Check Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in checkarray" :key="row.code">
                    <td>{{ row.amount }}</td>
                    <td></td>
                    <td>{{ row.che_date }}</td>
                </tr>
            </tbody>
        </table>
        </div>
        </div> 


      </div>
        
           <div class="grid justify-items-end">
            <button
                id="profile-submit-btn"
                type="button"
                :disabled="isLoading"
                @click="submitForm"
                class="
                disabled:opacity-50 disabled:cursor-not-allowed
                group
                relative
                flex
                py-2
                px-5
                border border-transparent
                text-sm
                font-medium
                rounded-md
                text-white
                bg-success-darker
                hover:bg-success
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-success-darker
              "
            >
              <svg
                  v-if="isLoading"
                  class="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p v-else>Search</p>
            </button>
          </div>
    </div>
    

  </div>
</template>

<script>
import TextInput from '../components/TextInput.vue'
import Vue from 'vue'
import {mapActions} from 'vuex'
import {handleVuexApiCall} from '../util/helper'
export default {
  components: {
     appTextInput: TextInput
   
  },
  data() {
    return{
       code: '',
       count:'',
      //  message:'',
      // check:'',
       amount:'',
       che_date:'',
       payee1:'',
       isLoading: false
    }
    
  },
  methods: {
     ...mapActions([
      'handleCheckShow',
    
    ]),
     async submitForm() {
      const payload = {
        //"code": this.code
        "emp_id": this.emp_id
      }
        const result = await handleVuexApiCall(this.handleCheckShow, payload)

       if (result.success) {
         var length = result.data.check.length
         this.count = length
        //const code = [];
        //const amount = [];
        //const che_date = [];
        //const payee1 = [];
        
        var payee1 = result.data.check[0].payee1;
       this.checkarray = result.data.check
       //this.checkname = result.data.check
        //for (let i = 0 ; i < length ;i++) {
        //var check = result.data.check[i]
        // code[i]  = check.code
        // amount[i]  = check.amount
        // che_date[i]  = check.che_date
        // payee1  = check.payee1
         
         
        //}      
        ///payee1 = check.payee1
        //this.code = code;
        //this.amount = amount;
        //this.che_date = che_date;
        this.payee1 = payee1;
        
            

      } 
       else Vue.$toast.open({ message: result.error.message, type: result.error.type })    
    
    }
  }
}
</script>
