<template>
    <h1>Settings</h1>
    <div class="container">
        <div>
            <nav>
                <ul class="navigation">
                    <router-link to="/userprofile">
                        <li><a href="">Profile</a></li>
                    </router-link>
                    <router-link to="/settings">
                        <li><a href="">Settings</a></li>
                    </router-link>
                    <li><a href="#"> My Book</a></li>
                </ul>
                <div class="buttons">
                    <my-button @click="logout" v-if="loggedIn">Logout</my-button>
                </div>
            </nav>
        </div>

        <div class="settings-page">
            <form class="form">
                <div class="card-title">User Details</div>
                <my-input type="text" placeholder="name" v-model="user.name"/>
                <my-button @click.prevent="changeDetails" type="submit">Save</my-button>
            </form>
        </div>
        <validation-errors v-if="validationErrors" :errors="validationErrors"></validation-errors>

        <div class="settings-page">
            <form class="form">
                <div class="card-title">Change Password</div>
                <my-input type="text" placeholder="old password" v-model="user.old_password"/>
                <my-input type="text" placeholder="new password" v-model="user.new_password"/>
                <my-input type="text" placeholder="new password confirmation" v-model="user.new_password_confirmation"/>
                <my-button @click.prevent="changePassword" type="submit">Change password</my-button>
            </form>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "Settings",
    data() {
        return {
            user: {
                name: '',
                old_password: '',
                new_password: '',
                new_password_confirmation: ''
            }
        }
    },
    created() {
        this.$store.dispatch('auth/currentUser')
        this.checkUserState()
    },

    methods: {
        ...mapActions({
            logout: 'auth/logout',
            checkUserState: 'auth/setLoggedInstate'
        }),

        changePassword() {
            this.$store.dispatch('auth/changePassword', this.user)
        },
        changeDetails() {
            this.$store.dispatch('auth/updateDetails', this.user)
        }
    },

    computed: {
        ...mapGetters({
            loggedIn: 'auth/loggedIn',
            invalidCredentials: 'auth/invalidCredentials',
            validationErrors: 'auth/errors'
        }),
        currentUser: {
            get() {
                return this.$store.state.auth.userDetails
            }
        }
    }
}
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Vidaloka|Oswald:400,300);

.container {
    height: 100vh;
    width: 100%;
    overflow: auto;
}

.card-title {
    color: var(--color-gray-dark);
    font-weight: 700;
    text-align: center;
    font-size: 25px;
    text-shadow: 0 5px 8px rgba(0, 0, 0, .65);
    transform: translateZ(0px);
    overflow: hidden;
    margin: 0;
    width: 100%;
}

nav {
    ul {
        background: var(--color-gray-dark-2);
        list-style-type: none;
        text-align: left;

        .name {
            text-align: left;
            color: white;
        }
    }

    li {
        display: inline-block;
    }

    a {
        color: white;
        display: inline-block;
        padding: 15px 15px;
    }

    a:hover {
        background: var(--color-gray-dark);
    }
}

</style>
