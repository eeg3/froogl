<template>
    <div>
        <p>Please Signin</p>
        <button @click="navigateToHome" class="btn btn-primary">Go Home</button>
    </div>
</template>

<script>
export default {
  methods: {
    navigateToHome() {
      this.$router.push({ name: "home" });
    }
  }
};
</script>
