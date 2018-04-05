<template>
  <div>
    <div class="container-fluid">
      <app-header :site="site" :loggedIn="loggedIn"></app-header>
    </div>
    <div class="container">
      <keep-alive>
        <!-- Don't kill components on route changes -->
        <router-view :loggedIn="loggedIn"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
export default {
  data: function() {
    return {
      loggedIn: false,
      site: {
        title: "Froogl"
      }
    };
  },
  created: function() {
    this.$cognitoAuth.isAuthenticated((err, loggedIn) => {
      if (err) {
        console.err("App: Couldn't get the session:", err, err.stack);
        return;
      }
      this.loggedIn = loggedIn;
    });
    this.$cognitoAuth.onChange = loggedIn => {
      this.loggedIn = loggedIn;
    };
  },
  components: {
    "app-header": Header
  }
};
</script>

<style>
.container-fluid {
  padding: 0 0;
}

</style>
