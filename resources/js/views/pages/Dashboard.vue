<template>
    <div>
        <nav>
            <ul class="navigation">
                <router-link to="/userprofile">
                    <li><a href="">Profile</a></li>
                </router-link>
                <router-link to="/settings">
                    <li><a href="">Settings</a></li>
                </router-link>
                <li><a href="">My Book</a></li>
            </ul>
            <div class="buttons">
                <my-button @click="logout" v-if="loggedIn">Logout</my-button>
            </div>
        </nav>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
    name: "Dashboard",
    data: () => ({}),
    created() {
        this.checkUserState()
    },
    mounted() {
        this.$store.dispatch('auth/currentUser')
    },
    computed: {
        ...mapGetters({
            loggedIn: 'auth/loggedIn'
        })
    },
    methods: {
        ...mapActions({
            logout: 'auth/logout',
            checkUserState: 'auth/setLoggedInstate'
        })
    }

}
</script>

<style lang="scss">
nav {
    margin: 30px;
    background-color: var(--color-gray-dark);
}

.navigation {
    list-style: none;
    float: left;

    li {
        display: inline-block;
        margin-left: 30px;

        &:first-child {
            margin: 0;
        }
    }
}

.buttons {
    float: right;
}

</style>
