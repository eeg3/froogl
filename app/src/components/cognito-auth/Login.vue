<template>
  <div class="container">
    <div class="col-sm-6 col-sm-offset-3">
      <h2>Log In</h2>
      <p>
        <!-- <p v-if="$route.query.redirect"> -->
        Log in to your account.
      </p>
      <div class="alert alert-danger" v-if="error">
        <p v-if="error" class="error">{{ error.message }}</p>
      </div>
      <form @submit.prevent="login">
        <div class="form-group">
          <input id="inputUsername" type="text" class="form-control" placeholder="Enter your username" v-model="username" required>
        </div>
        <div class="form-group">
          <input id="inputPassword" type="password" class="form-control" placeholder="Enter your password" v-model="pass" required>
        </div>
        <button class="btn btn-outline-success">Login</button>
      </form>
      <div class="row mt-2">
        <p>
          <router-link to="/signup">Create an Account</router-link> or
          <router-link to="/reset_password">Reset Password</router-link>.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      pass: "",
      error: null
    };
  },
  methods: {
    login() {
      this.$cognitoAuth.signin(this.username, this.pass, (err, result) => {
        if (err) {
          this.error = err;
          console.error(err);
        } else {
          this.$router.replace(this.$route.query.redirect || "/");
        }
      });
    }
  }
};
</script>

<style>
.error {
  color: red;
}
</style>
