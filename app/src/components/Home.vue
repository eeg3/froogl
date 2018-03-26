<template>
  <div>
    <h3>Welcome</h3>
    <p>
      Total Additions: {{totalAdditions}}
    </p>
    <hr>
    <app-grid class="mt-3" :totalAdditions="totalAdditions" @itemAdded="itemAdded"></app-grid>
  </div>
</template>

<script>
import Grid from "../components/Grid.vue";

export default {
  data: function() {
    return {
      totalAdditions: 0
    };
  },
  methods: {
    itemAdded: function(event) {
      this.totalAdditions++;
      console.log("Added: " + event);
    }
  },
  components: {
    "app-grid": Grid
  }
};
</script>