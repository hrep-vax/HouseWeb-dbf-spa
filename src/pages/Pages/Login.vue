<template>
  <div class="container">
    <div class="col-lg-4 col-md-6 ml-auto mr-auto">
      <ValidationObserver ref="loginForm">
        <form >
          <card class="card-login card-white">
            <template slot="header">
              <img src="img/card-primary.png" alt="" />
              <h1 class="card-title">Log in</h1>
            </template>

            <div>
              <ValidationProvider
                name="email"
                rules="required|email"
                v-slot="{ passed, failed, errors }"
              >
              <base-input
                required
                v-model="email"
                type="email"
                placeholder="Email"
                addon-left-icon="tim-icons icon-email-85"
                :error="errors[0]"
                :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
              </base-input>
             </ValidationProvider>

             <ValidationProvider
               name="password"
               rules="required|min:5"
               v-slot="{ passed, failed, errors }"
             >
             <base-input
               required
               v-model="password"
               placeholder="Password"
               addon-left-icon="tim-icons icon-lock-circle"
               type="password"
               :error="errors[0]"
               :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
             </base-input>
            </ValidationProvider>
            </div>

            <div slot="footer">
              <base-button native-type="submit" type="primary" class="mb-3" size="lg" @click="submit" block>
                Login
              </base-button>
              <div class="pull-left">
                <h6>
                  <router-link class="link footer-link" to="/register">
                    Create Account
                  </router-link>
                </h6>
              </div>

              <div class="pull-right">
               
              </div>
            </div>
          </card>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { extend } from "vee-validate";
import { required, email, min } from "vee-validate/dist/rules";
import {mapActions} from 'vuex'
import { handleVuexApiCall } from 'src/util/helper'
extend("email", email);
extend("min", min);

extend("required", required);

export default {
  data() {
    return {
      email: "",
      password: "",
      subscribe: true
    };
  },
  methods: {
    ...mapActions(['handleLogin']),
   async submit() {
     
          const valid = await this.$refs.loginForm.validate()
      if (!valid) return

      this.isLoading = true
      const result = await handleVuexApiCall(this.handleLogin, {email: this.email, password: this.password})

      if (result.success) this.$router.push({name: 'Pages'}).catch(err => err)
      else Vue.$toast.open({ message: result.error.message, type: result.error.type })
    }
  }
};
</script>
<style>
.navbar-nav .nav-item p {
  line-height: inherit;
  margin-left: 5px;
}
</style>
