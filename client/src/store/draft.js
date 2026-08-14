import { ref, toRaw } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { fetchDrafts, findDraft, createDraft, updateDraft, deleteDraft } from './../gql/draftQuery.js'

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

export const useDraftStore = defineStore('draft', () => {

    const drafts = ref([]);
    const selectedDraft = ref(null);

    async function fetchAllDrafts() {
        const data = await callServer(fetchDrafts);
        drafts.value = data.drafts;
    }

    async function fetchDraft(id) {
        const findDraftCall = await callServer(findDraft, { id: id });
        if (findDraftCall && findDraftCall.draft !== null) {
            return findDraftCall.draft;
        }
        return null;
    }

    async function saveDraft(input) {
        if (selectedDraft)
            updateDraft(selectedDraft.id, input);
        else
            addDraft(input);
    }

    async function addDraft(input) {
        const data = await callServer(createDraft, { input });
        const targetDraft = data.createDraft;
        return targetDraft;
    }

    async function modifyDraft(id, input) {
        const data = await callServer(updateDraft, { id, input });
        const targetDraft = data.updateDraft;
        return targetDraft;
    }

    async function removeDraft(id) {
        const data = await callServer(deleteDraft, { id });
        return data.deleteDraft;
    }

    return { drafts, fetchAllDrafts, fetchDraft, addDraft, modifyDraft, removeDraft };
}, { persist: true });