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

    const items = [
        {
            label: 'draft1',
            description: 'Last updated: 2024-06-01 12:00 PM',
            icon: 'i-lucide-file-pen',
            value: 'draft1'
        },
        {
            label: 'draft2',
            description: 'Last updated: 2024-06-01 12:00 PM',
            icon: 'i-lucide-file-pen',
            value: 'draft2'
        },
        {
            label: 'draft3',
            description: 'Last updated: 2024-06-01 12:00 PM',
            icon: 'i-lucide-file-pen',
            value: 'draft3'
        },
    ];

    const drafts = ref(items);
    const selectedDraft = ref(null);

    async function fetchAllDrafts() {
        console.log('-- drafts store - fetchAllDrafts triggered');

        // const data = await callServer(fetchDrafts);
        // drafts.value = data.drafts;
    }

    async function fetchDraft(id) {
        console.log('-- drafts store - fetchDraft triggered - id: ', id);

        // const findDraftCall = await callServer(findDraft, { id: id });
        // if (findDraftCall && findDraftCall.draft !== null) {
        //     return findDraftCall.draft;
        // }
        // return null;
    }

    async function saveDraft(input) {
        if (selectedDraft.value)
            modifyDraft(input);
        else
            addDraft(input);
    }

    async function addDraft(input) {
        console.log('-- drafts store - addDraft triggered - input: ', input);

        // const data = await callServer(createDraft, { input });
        // const targetDraft = data.createDraft;
        // return targetDraft;
    }

    async function modifyDraft(id, input) {
        console.log('-- drafts store - modifyDraft triggered - id: ', id, ' - input: ', input);

        // const data = await callServer(updateDraft, { id, input });
        // const targetDraft = data.updateDraft;
        // return targetDraft;
    }

    async function removeDraft(id) {
        console.log('-- drafts store - removeDraft triggered - id: ', id);

        // const data = await callServer(deleteDraft, { id });
        // return data.deleteDraft;
    }

    return { drafts, fetchAllDrafts, fetchDraft, saveDraft, addDraft, modifyDraft, removeDraft };
}, { persist: true });