import { ref, toRaw } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { fetchBadges, findBadge, createBadge, updateBadge, deleteBadge } from './../gql/badgeQuery.js'

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
        console.log(response.data);
        return response.data.data;
    })
    .catch(error => {
        console.log('-- callServer error: ', error);
    });
}

export const useBadgeStore = defineStore('badge', () =>{

    const badges = ref([]);
    const pendingBadges = ref([]);
    
    async function fetchAllBadges() {
        const data = await callServer(fetchBadges);
        badges.value = data.badges;

        // filter pending badges (status 'P' and isDraft is false or null/undefined)
        pendingBadges.value = badges.value.filter(badge => badge.status === 'P' && !badge.isDraft);
    }

    async function fetchBadge(id) {
        const findBadgeCall = await callServer(findBadge, { id: id });
        if (findBadgeCall && findBadgeCall.badge !== null) {
            return findBadgeCall.badge;
        }
        return null;
    }

    async function addBadge(input) {
        const data = await callServer(createBadge, { input });
        const targetBadge = data.createBadge;
        return targetBadge;
    }

    async function modifyBadge(id, input) {
        const data = await callServer(updateBadge, { id, input });
        const targetBadge = data.updateBadge;
        return targetBadge;
    }

    async function removeBadge(id) {
        const data = await callServer(deleteBadge, { id });
        return data.deleteBadge;
    }

    return { badges, pendingBadges, fetchAllBadges, fetchBadge, addBadge, modifyBadge, removeBadge };
  },
  { persist: true }
);