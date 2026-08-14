import { ref, toRaw } from 'vue';
import { defnieStore } from 'pinia';

const { VITE_POST_URL } = import.meta.env;

export const useCanvasStore = defineStore('canvas', () => {
    const canvas = ref([]);

    const loading = ref(false);
    const undoStep = ref([]);
    const redoStep = ref([]);

    async function changeCanvas() {
        console.log('-- canvas store - changeCanvas triggered');
    }

    async function addItem(type) {
        console.log('-- canvas store - addItem triggered: type - ', type);
    }

    async function updateItem(id, input) {
        console.log('-- canvas store - updateItem triggered - id: ', id, ' - input: ', input);

    }

    async function deleteItem(id) {
        console.log('-- canvas store - deleteItem triggered - id: ', id);

    }

    async function selectItem(id) {
        console.log('-- canvas store - selectItem triggered - id: ', id);
    }

    async function resetCanvas() {
        console.log('-- canvas store - resetCanvas triggered');
    }

    async function undoCanvas() {
        console.log('-- canvas store - undoCanvas triggered');
    }

    async function redoCanvas() {
        console.log('-- canvas store - redoCanvas triggered');
    }

    return { canvas, changeCanvas, addItem, updateItem, deleteItem, selectItem, resetCanvas, undoCanvas, redoCanvas };
}, { persist: true });