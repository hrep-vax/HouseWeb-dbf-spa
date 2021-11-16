<template>
  <card>
    <h5 slot="header" class="title">Check Issuances</h5>
    <form>
      

      <div class="row">

        <div class="col-md-6">
          <base-input
            type="text"
            label="Employee ID"
            placeholder="Emp ID"
            v-model="emp_id"
          >
          </base-input>
        </div>
        <div class="col-md-6">
          <base-input
            type="text"
            label="Payee Name"
            placeholder="Name"
            v-model="payee1"
          >
          </base-input>
        </div>
      </div>
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

      
      <base-button native-type="submit" type="primary" class="btn-fill" @click="submitForm">
        Search
      </base-button>
    </form>
  </card>
</template>
<script>
import Vue from 'vue'
import {mapActions} from 'vuex'
import { handleVuexApiCall } from 'src/util/helper'
export default {
  data() {
    return {
      //user: {
        emp_id: '01789',
        code: '',
        amount:'',
        che_date:'',
        payee1: ''
        
      //}
    };
  },
  // methods: {
  //   updateProfile() {
  //     alert('Your data: ' + JSON.stringify(this.user));
  //   }
  // }

  methods: {
     ...mapActions([
      'handleCheckShow',
    
    ]),
     async submitForm() {
       //alert('method');
       console.log('method');
      const payload = {
        //"code": this.code
        "emp_id": this.emp_id
      }
        const result = await handleVuexApiCall(this.handleCheckShow, payload)

       if (result.success) {
         var length = result.data.check.length
        this.count = length
                
        var payee1 = result.data.check[0].payee1;
        this.checkarray = result.data.check
       
         
        this.payee1 = payee1;
       
      } 
       else Vue.$toast.open({ message: result.error.message, type: result.error.type })    
    
    }
  }
};
</script>
<style></style>
