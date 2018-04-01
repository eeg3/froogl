<template>
    <div>
        <center><img v-if="status == false" src="/assets/ajax_loader_gray_32.gif"></center>
    </div>
</template>

<script>
export default {
  props: ["status"],
  data: function() {
    return {};
  }
};
</script>

<style>

</style>
