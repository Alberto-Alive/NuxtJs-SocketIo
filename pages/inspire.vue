<template>
    <v-container>
        <v-form v-model="valid" @submit.prevent="register">
            <v-container>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="username" :rules="nameRules" :counter="10" label="Username" required>
                        </v-text-field>
                    </v-col>

                    <v-col cols="12" md="6">
                        <v-text-field v-model="password" :rules="nameRules" type="password" :counter="10"
                            label="Password" required>
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <v-btn block @click="register()" style="color:yellow; background-color: green;">
                Register User
            </v-btn>
        </v-form>
        <ul v-for="({ username, id }, index) in users" :key="`Whatever-${index}`">
            <li> {{ username }} - {{ id }}</li>
        </ul>
    </v-container>
</template>
<script>
export default {
    /* ✓ GOOD */
    name: 'inspire-app',
    data: () => ({
        users: [],
        valid: false,
        username: '',
        password: '',
        nameRules: [
            v => !!v || 'Name is required',
            v => v.length <= 10 || 'Name must be less than 10 characters',
        ],
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
    }),
    async fetch() {
        await this.$axios.$get('all_users').then((response) => {
            console.log("We called axios for all_users")
            this.users = response.data
        })
    },

    methods: {
        async register() {
            try {
                await this.$axios.post('register', {
                    password: this.password,
                    username: this.username,
                }).then((response) =>{
                    console.log(response.data)
                })
            } catch (e) {
                console.log(e.response.data.message)
            }
        }
    }
}
</script>
