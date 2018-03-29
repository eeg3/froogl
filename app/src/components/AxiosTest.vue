<template>
    <div>
        <button @click="query()" class="btn btn-primary">Query</button>
        Result: {{ result }}
    </div>
</template>

<script>
import axios from "axios";
import jwtDecode from 'jwt-decode'

export default {
  data: function() {
    return {
      result: "test",
      token: "Loading token..",
      user: {}
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
    query: function() {
      let vm = this;
      axios
        .get("/hello-name?name=Goat", {
          headers: {
            Authorization: vm.token
          }
        })
        .then(function(response) {
          //console.log("response: " + JSON.stringify(response));
          vm.result = response.data.message;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style>

</style>

