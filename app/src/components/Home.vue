<template>
  <div>
    <h3>Welcome</h3>
    <p>
      Total Additions: {{totalAdditions}}
    </p>
    <hr>
    <app-grid class="mt-3" :totalAdditions="totalAdditions" :token="token" @itemAdded="itemAdded"></app-grid>
    <app-axiostest :token="token"></app-axiostest>
  </div>
</template>

<script>
import Grid from "../components/Grid.vue";
import AxiosTest from "../components/AxiosTest.vue";
import jwtDecode from 'jwt-decode'

export default {
  data: function() {
    return {
      totalAdditions: 0,
      token: null,
      user: null,
      decodedToken: null
    };
  },
  created: function() {
    this.$cognitoAuth.getIdToken((err, jwtToken) => {
      if (err) {
        console.log("Dashboard: Couldn't get the session:", err, err.stack);
        return;
      }
      this.token = jwtToken;
      this.decodedToken = jwtDecode(jwtToken);
      this.user = this.$cognitoAuth.getCurrentUser();
    });
  },
  methods: {
    itemAdded: function(event) {
      this.totalAdditions++;
      console.log("Added: " + event);
    }
  },
  components: {
    "app-grid": Grid,
    "app-axiostest": AxiosTest
  }
};
</script>