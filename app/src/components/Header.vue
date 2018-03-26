<template>
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark mb-3">
        <router-link to="/" class="navbar-brand">{{site.title}}</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
                <router-link to="/" tag="li" class="nav-item" exact>
                    <a class="nav-link">Home</a>
                </router-link>
                <li class="nav-item dropdown">
                    <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">
                        <span class="fa fa-user fa-lg"></span>
                    </a>
                    <div class="dropdown-menu">
                        <router-link to="/signin" class="dropdown-item">Sign-In</router-link>
                        <router-link to="/register" class="dropdown-item">Register</router-link>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
  props: ["site"]
};
</script>

<style>

</style>