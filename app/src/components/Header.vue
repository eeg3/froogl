<template>
    <nav class="navbar navbar-expand-sm navbar-light bg-light mb-3">
        <router-link to="/" class="navbar-brand ml-3">
            <i class="fas fa-lg fa-hand-holding-usd logo"></i> {{site.title}}</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">

            <!-- View when  Non-collapsed -->
            <ul class="navbar-nav ml-auto d-none d-sm-flex">
                <div class="d-none d-sm-inline">
                    <a href="http://www.twitter.com/earlg3" class="header-link">
                        <i class="btn fab fa-sm my-2 fa-twitter"></i>
                    </a>
                    <a href="https://github.com/eeg3/froogl" class="header-link">
                        <i class="btn fab fa-sm my-2 fa-github"></i>
                    </a>
                    <router-link to="/">
                        <span class="btn btn-sm btn-outline-success mr-1 my-2 my-sm-0">Home</span>
                    </router-link>
                </div>

                <li class="nav-item dropdown">
                    <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">
                        <span class="fa fa-user fa-sm"></span>
                        <span class="d-sm-none">User</span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right">
                        <router-link v-if="loggedIn" to="/profile" class="dropdown-item">
                            <a>Profile</a>
                        </router-link>
                        <router-link v-if="loggedIn" to="/change_password" class="dropdown-item">
                            <a>Change Password</a>
                        </router-link>
                        <router-link v-if="loggedIn" to="/logout" class="dropdown-item">
                            <a>Log out</a>
                        </router-link>
                        <router-link v-if="!loggedIn" to="/login" class="dropdown-item">
                            <a>Log in</a>
                        </router-link>
                        <router-link v-if="!loggedIn" to="/signup" class="dropdown-item">
                            <a>Sign Up</a>
                        </router-link>
                    </div>
                </li>
            </ul>

            <!-- View when Collapsed -->
            <ul class="navbar-nav ml-auto d-inline d-sm-none">
                <router-link v-if="loggedIn" to="/" class="dropdown-item mt-2">
                    <a>Home</a>
                </router-link>
                <router-link v-if="loggedIn" to="/profile" class="dropdown-item">
                    <a>Profile</a>
                </router-link>
                <router-link v-if="loggedIn" to="/change_password" class="dropdown-item">
                    <a>Change Password</a>
                </router-link>
                <router-link v-if="loggedIn" to="/logout" class="dropdown-item">
                    <a>Log out</a>
                </router-link>
                <router-link v-if="!loggedIn" to="/login" class="dropdown-item">
                    <a>Log in</a>
                </router-link>
                <router-link v-if="!loggedIn" to="/signup" class="dropdown-item">
                    <a>Sign Up</a>
                </router-link>
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
.dropdown-item.active,
.dropdown-item:active {
  background-color: #28a745;
}

.logo {
  color: #28a745;
}

.header-link {
  color: rgba(0, 0, 0, 0.5);
}
</style>