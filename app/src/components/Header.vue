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
                        <router-link to="/" exact class="dropdown-item"><a>Home</a></router-link>
                        <router-link v-if="loggedIn" to="/profile" class="dropdown-item"><a>Profile</a></router-link>
                        <router-link v-if="loggedIn" to="/change_password" class="dropdown-item"><a>Change Password</a></router-link>
                        <router-link v-if="loggedIn" to="/logout" class="dropdown-item"><a>Log out</a></router-link>
                        <router-link v-if="!loggedIn" to="/login" class="dropdown-item"><a>Log in</a></router-link>
                        <router-link v-if="!loggedIn" to="/signup" class="dropdown-item"><a>Sign Up</a></router-link>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
  props: ["site", "loggedIn"]
};
</script>

<style>

</style>