import { ref, toRaw } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { fetchDrafts, findDraft, createDraft, updateDraft, deleteDraft } from './../gql/draftQuery.js';
import { useCanvasStore } from './canvas.js';
import { useUserStore } from './user.js';

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

    const canvasStore = useCanvasStore();
    const userStore = useUserStore();

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

    const drafts = ref([]);
    const selectedDraft = ref(null);

    async function fetchAllDrafts() {
        console.log('-- drafts store - fetchAllDrafts triggered');

        const data = await callServer(fetchDrafts);
        drafts.value = data.drafts;
    }

    async function fetchDraft(id) {
        console.log('-- drafts store - fetchDraft triggered - id: ', id);

        // const findDraftCall = await callServer(findDraft, { id: id });
        // if (findDraftCall && findDraftCall.draft !== null) {
        //     return findDraftCall.draft;
        // }
        // return null;
    }

    async function addDraft(name) {
        const input = {
            userId: userStore.loggedInUser.id,
            name: name,
            canvas: JSON.stringify(canvasStore.nodes),
        }

        console.log('-- drafts store - addDraft triggered - input: ', input);

        const data = await callServer(createDraft, { input });
        const targetDraft = data.createDraft;
        return targetDraft;
    }

    async function loadDraft() {
        console.log('[loadDraft] - selected draft: ', selectedDraft.value);
        await canvasStore.resetCanvas();
        
        let targetItem = null;
        for (let i = 0; i < drafts.value.length; i++) {
            let item = drafts.value[i];
            if (item.value === selectedDraft.id) {
                targetItem = item;
                break;
            }
        }

        if (targetItem) {
            console.log('[loadDraft] - target item: ', targetItem);
            canvasStore.loadNodesFromDraft(JSON.parse(targetItem.canvas));
        }
    }

    async function removeDraft(id) {
        console.log('-- drafts store - removeDraft triggered - id: ', id);

        // const data = await callServer(deleteDraft, { id });
        // return data.deleteDraft;
    }

    return { 
        drafts, 
        selectedDraft,
        fetchAllDrafts, 
        fetchDraft, 
        addDraft, 
        loadDraft,
        removeDraft 
    };
}, { persist: true });