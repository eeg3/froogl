<template>
  <div>
    <div class="row">
      <div class="col-md-8 col-lg-9">
        <app-grid id="left-pane" class="mt-3" :totalAdditions="totalAdditions" :token="token" @itemAdded="itemAdded"></app-grid>
        <!-- <app-axiostest :token="token"></app-axiostest> -->
        <!-- Dummy component to test an API -->
      </div>
      <div class="col-md-4 col-lg-3">
        <div id="right-pane" class="card mt-3">
          <div class="card-body">
            <h4 class="card-title">Export</h4>
            <p class="card-text">Want to archive your data or simply work with it in Excel?</p>
            <a href="#" class="btn btn-success btn-block">Export Data</a>
            <hr>
            <h4 class="card-title">Reset</h4>
            <p class="card-text">Want to delete all entries and start anew?</p>
            <a href="#" class="btn btn-danger btn-block">Reset Data</a>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Grid from "../components/Grid.vue";
import AxiosTest from "../components/widgets/AxiosTest.vue";
import jwtDecode from "jwt-decode";

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

<style>
@media (min-width: 768px) {
  #right-pane {
     margin-right: 40px;
  }

  #left-pane {
    margin-left: 40px;
  }
}
</style>
