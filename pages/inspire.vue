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
                        <v-text-field v-model="email" :rules="emailRules" type="email" :counter="20" label="Email"
                            required>
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
            <v-chip v-if="success" class="ma-2" close color="green" outlined @click:close="success = false">
                Success
            </v-chip>
            <v-chip v-if="fail" class="ma-2" close color="red" outlined @click:close="fail = false">
                Failed
            </v-chip>
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
        success: false,
        fail: false,
        username: '',
        email: '',
        password: '',
        nameRules: [
            v => !!v || 'Name is required',
            v => v.length <= 10 || 'Name must be less than 10 characters',
        ],
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
                    email: this.email,
                    username: this.username,
                }).then((response) => {
                    console.log('Is my register successful?' + response.status)
                    if(response.status == 200){
                        this.success = true
                    }
                    else
                    {
                        this.fail = true
                    }
                })
            } catch (e) {
                console.log('Where is this?' + e.response.data.message)
                this.fail = true
            }
        }
    }
}
</script>
