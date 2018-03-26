<template>
  <div class="container">
    <div clas="row">
      <div class="col">
        <app-header :site="site"></app-header>
        <keep-alive>
          <!-- Don't kill components on route changes -->
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
export default {
  data: function() {
    return {
      site: {
        title: "Froogl"
      }
    };
  },
  components: {
    "app-header": Header
  }
};
</script>

<style>

</style>
