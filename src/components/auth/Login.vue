<template>
    <div class="container">
        <form @submit.prevent="login">
            <h2 class="mb-3">Login</h2>
            <div class="input">
                <label for="email">Email address</label>
                <input v-model="userName" class="form-control" type="text" name="email" placeholder="email@adress.com" />
            </div>
            <div class="input">
                <label for="password">Password</label>
                <input v-model="password" class="form-control" type="password" name="password" placeholder="password123" />
            </div>
            <div class="alternative-option mt-4">
                <!-- You don't have an account? <span @click="moveToRegister">Register</span> -->
            </div>
            <button type="submit" class="mt-4 btn-pers" id="login_button">
                Login
            </button>
            <div class="alert alert-warning alert-dismissible fade show mt-5 d-none" role="alert" id="alert_1">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </form>
    </div>
</template>

<script>
//   import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { userAPI } from '@/api/user'

export default {
    name: 'login-vue',
    data() {
        return {
            userName: "",
            password: "",
        };
    },
    methods: {
        async login(submitEvent) {
            console.log(submitEvent)
            console.log(this.email, this.password)
            let res = await userAPI.login(this.userName, this.password)
            if (res.status == 200) {
                this.$store.commit('user/setShowUser', res)
                localStorage.feeUserInfo = JSON.stringify(res)
                this.$router.push('/')
            } else {
                console.log('unAuthentication')
            }

            console.log(res)
        },
        moveToRegister() {
            this.$router.push("/register");
        },
    },
};
</script>
