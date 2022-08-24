<template>
<v-container>
    <v-form v-model="valid">
        <v-container>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field v-model="firstname" :rules="nameRules" :counter="10" label="First name" required>
                    </v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field v-model="lastname" :rules="nameRules" :counter="10" label="Last name" required>
                    </v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                </v-col>
            </v-row>
        </v-container>
        <v-btn block @click.prevent="submit()">
            Submit user to DB
        </v-btn>
    </v-form>
    <ul v-for="({ username, id }, index) in users" :key="`Whatever-${index}`">
        <li> {{ username }} - {{ id }}</li>
    </ul>
    <pre> {{ $data | json }}</pre>
    </v-container>
</template>
<script>
export default {
    /* ✓ GOOD */
    name: 'inspire-app',
    data: () => ({
        users: [],
        valid: false,
        firstname: '',
        lastname: '',
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
    mounted(){
     this.$axios.$get('all_users').then((response) => {
            console.log("We called axios for all_users")
            this.users = response.data
        })
    },
    methods: {
        submit() {

        }
    }
}
</script>
