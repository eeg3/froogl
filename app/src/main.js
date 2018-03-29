import Vue from 'vue'
import VueResource from 'vue-resource'
import router from './router'
import cognitoAuth from './cognito'
import App from './App.vue'
import axios from 'axios'

Vue.use(VueResource)

axios.defaults.baseURL = "https://kf9dip0u7c.execute-api.us-east-1.amazonaws.com/dev";

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  cognitoAuth,
  render: h => h(App)
})
