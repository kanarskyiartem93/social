<template>
    <div>
        <div class="alert" v-if="invalidCredentials">
            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
            {{invalidCredentials}}
        </div>
        <validation-errors v-if="validationErrors" :errors="validationErrors"></validation-errors>
        <div class="reset-page">
            <form class="form">
                <my-input type="text" placeholder="email address" v-model="user.email"/>
                <my-input type="text" placeholder="your new password" v-model="user.password"/>
                <my-input type="text" placeholder="confirm your new password" v-model="user.password_confirmation"/>
                <my-button @click.prevent="sendResetPassword" type="submit">Send email</my-button>
                <router-link to="/login"><p class="message">Go to login page <a href="#">Sign in</a></p></router-link>
            </form>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
    name: "ResetPassword",
    data: () => ({
        user: {
            email: "",
            password: "",
            password_confirmation: "",
        }
    }),
    created() {
        this.checkUserState()
    },
    computed: {
        ...mapGetters({
            invalidCredentials: 'auth/invalidCredentials',
            validationErrors: 'auth/errors'
        }),
    },
    methods: {
        ...mapActions({
            checkUserState: 'auth/setLoggedInstate',
            resetPassword: 'auth/resetPassword'
        }),
        sendResetPassword() {
            const token = this.$route.params.token;
            this.resetPassword({...this.user, token})
            window.location.replace('/login')
        }
    }
}
</script>

<style lang="scss">
.reset-page {
    width: 360px;
    padding: 8% 0 0;
    margin: auto;
    display: flex;
}
.alert {
    padding: 20px;
    background-color: #f44336;
    color: white;
    margin-bottom: 15px;
}
</style>
