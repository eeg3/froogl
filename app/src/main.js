import Vue from 'vue'
import VueResource from 'vue-resource'
import router from './router'
import cognitoAuth from './cognito'
import App from './App.vue'
import axios from 'axios'

Vue.use(VueResource)

axios.defaults.baseURL = "https://qre89ln1d1.execute-api.us-east-1.amazonaws.com/dev/";
//axios.defaults.baseURL = "http://localhost:3000";


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  cognitoAuth,
  render: h => h(App)
})
