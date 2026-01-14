import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { fetchUsers, findUser, loginUser, searchUsers, createUser } from './../gql/userQuery.js'

const { VITE_POST_URL } = import.meta.env;

const callServer = async (query, variables = null) => {
    return await axios.post(`${VITE_POST_URL}/graphql`, {
        query,
        variables,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache"
        },
    })
    .then(response => {
        return response.data.data;
    })
    .catch(error => {
        console.log('-- callServer error: ', error);
    });
}

export const useUserStore = defineStore('user', () => {

    const users = ref([]);
    const loggedInUser = ref(null);

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

    async function handleLogin(username, password) {
        const data = await callServer(loginUser, { username, password });

        console.log('data returned: ', data);

        if (data.loginUser) {
            loggedInUser.value = data.loginUser;
            return true;
        }
        return false;
    }

    async function handleRegister(input) {
        const findUserCall = await callServer(findUser, {query: `username='${input.username}`});
        debugger;

        if (findUserCall.user !== null) return 'already registered';
        else {
            const data = await callServer(createUser, { input: input });

            if (data.createUser) {
                loggedInUser.value = data.createUser;
                return 'successful';
            }
            return false;
        }
    }

    return { users, loggedInUser, allUsers, fetchAllUsers, fetchUser, handleLogin, handleRegister };
});