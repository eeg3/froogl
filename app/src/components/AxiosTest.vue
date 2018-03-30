<template>
    <div>
        <button @click="query()" class="btn btn-primary">Query</button>
        Result: {{ result }}
    </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["token"],
  data: function() {
    return {
      result: "test",
      user: {}
    };
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

