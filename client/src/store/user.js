import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

import { fetchUsers } from './../gql/userQuery.js'

const { VITE_POST_URL } = import.meta.env;

const callServer = async (query) => {
    return await axios.post(`${VITE_POST_URL}/graphql`, {
        query: fetchUsers,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache"
        },
    })
    .then(response => {
        console.log(response);
        return response.data.data;
    })
    .catch(error => {
        console.log(error);
    });
}

export const useUserStore = defineStore('user', () => {

    const users = ref([]);
    const loggedInUser = reactive();

    const allUsers = computed(() => users.value);

    async function fetchAllUsers() {
        const data = await callServer(fetchUsers);
        users.value = data.users;
    }

    function fetchUser(id) {
        let users = getters.allUsers;
        let targetUser = users.find(user => id === user.id);
        return targetUser;
    }

    function handleLogin() {
        //Find user

        //If found check the password

            //If match, return true

            //Else, return false

        //Else return false
    }

    function handleRegister() {
            //Create a new user

            //Return true or false
    }

    return { users, loggedInUser, allUsers, fetchAllUsers, fetchUser, handleLogin, handleRegister };
});