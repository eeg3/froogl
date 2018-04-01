<template>
  <div>
    <h2>Dashboard</h2>
    <p>
      Welcome, {{ user.username }}!
    </p>
    <hr>
    <h5>Token: </h5><textarea rows="14" cols="100" v-model="token"></textarea>
    <hr>
    <h5>Decoded Token: </h5><blockquote>{{ decodedToken }}</blockquote>
  </div>
</template>

<script>
import jwtDecode from "jwt-decode";
export default {
  data() {
    return {
      decodedToken: "Loading token..",
      token: "Loading token...",
      user: {}
    };
  },
  created() {
    this.$cognitoAuth.getIdToken((err, jwtToken) => {
      if (err) {
        console.log("Dashboard: Couldn't get the session:", err, err.stack);
        return;
      }
      this.token = jwtToken;
      this.decodedToken = jwtDecode(jwtToken);
      this.user = this.$cognitoAuth.getCurrentUser();
    });
  }
};
</script>
