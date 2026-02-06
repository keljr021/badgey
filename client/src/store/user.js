import { ref, reactive, computed, toRaw } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { fetchUsers, findUser, loginUser, searchUsers, createUser, updateUser, updatePassword, deleteUser } from './../gql/userQuery.js'

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
    const passwordModal = ref(false);

    const allUsers = computed(() => users.value);

    async function fetchAllUsers() {
        const data = await callServer(fetchUsers);
        users.value = data.users;
    }

    async function fetchUser(id) {
        const findUserCall = await callServer(findUser, { id: id });
        if (findUserCall && findUserCall.user !== null) {
            return findUserCall.user;
        }
        return null;
    }

    async function addUser(input) {
        const data = await callServer(createUser, { input });
        return data.createUser;
    }

    async function modifyUser(id, input) {
        const data = await callServer(updateUser, { id, input });
        return data.updateUser;
    }

    async function removeUser(id) {
        const data = await callServer(deleteUser, { id });
        return data.deleteUser;
    }

    async function handleLogin(username, password) {
        const data = await callServer(loginUser, { username, password });

        if (data.loginUser) {
            // normalize id (some servers return _id)
            loggedInUser.value = data.loginUser;
            loggedInUser.value.id = data.loginUser.id || data.loginUser._id || loggedInUser.value.id;
            return true;
        }
        return false;
    }

    async function handleRegister(input) {
        // check for existing user by username
        try {
            const found = await callServer(searchUsers, { query: `username='${input.username}'` });
            if (found && Array.isArray(found.searchUsers) && found.searchUsers.length > 0) {
                return 'already registered';
            }
        } catch (err) {
            console.error('handleRegister: searchUsers error', err);
            return false;
        }

        const data = await callServer(createUser, { input: input });

        if (data && data.createUser) {
            // normalize id (some servers return _id)
            loggedInUser.value = data.createUser;
            loggedInUser.value.id = data.createUser.id || data.createUser._id || loggedInUser.value.id;
            console.log('handleRegister: loggedInUser stored =>', loggedInUser.value);
            return 'successful';
        }
        return false;
    }

    async function saveSettings(updatedInfo) {
        const rawUser = loggedInUser.value ? toRaw(loggedInUser.value) : null;
        let userId = rawUser && (rawUser.id || rawUser._id) || (loggedInUser.value && loggedInUser.value.id);

        // If id isn't available, try to resolve via username using searchUsers
        if (!userId && loggedInUser.value && loggedInUser.value.username) {
            try {
                const found = await callServer(searchUsers, { query: `username='${loggedInUser.value.username}'` });
                if (found && Array.isArray(found.searchUsers) && found.searchUsers.length > 0) {
                    userId = found.searchUsers[0].id || found.searchUsers[0]._id;
                    // update local store with resolved id for future calls
                    if (loggedInUser.value) loggedInUser.value.id = userId;
                }
            } catch (err) {
                console.error('saveSettings: error resolving user by username', err);
            }
        }

        if (!userId) {
            console.error('saveSettings: no user id available to update settings');
            return false;
        }

        const updateUserCall = await callServer(updateUser, { id: userId, input: updatedInfo });

        if (updateUserCall && updateUserCall.updateUser) {
            loggedInUser.value = updateUserCall.updateUser;
            return true;
        }
        return false;
    }

    async function changePassword(password) {
        const passwordObject = {
            id: loggedInUser.value.id,
            password: password
        };

        const data = await callServer(updatePassword, passwordObject);
        return data.updateUser;
    }

    async function handleLogout() {
        loggedInUser.value = null;
    }

    return { users, loggedInUser, allUsers, fetchAllUsers, fetchUser, addUser, modifyUser, removeUser, handleLogin, handleRegister, saveSettings, changePassword, handleLogout };
}, { persist: true });