import { nextTick, ref } from 'vue';
import { defineStore } from 'pinia';
import Konva from 'konva'

const { VITE_POST_URL } = import.meta.env;

export const useCanvasStore = defineStore('canvas', () => {
    const loading = ref(true);
    const selectedCanvas = ref('rectangle');
    const selectedCanvasSides = ref(3);
    const selectedCanvasAngle = ref(0);

    async function setCanvas() {
        changeCanvas('circle');
    }

    async function changeCanvas(input) {
        console.log('-- canvas store - changeCanvas triggered, -', input);
        selectedCanvas.value = input;
    }

    async function changeCanvasSides(input) {
        console.log('-- canvas store - changeCanvasSides - ', input);
        selectedCanvasSides.value = input;
    }

     async function changeCanvasAngle(input) {
        console.log('-- canvas store - changeCanvasAngle - ', input);
        selectedCanvasAngle.value = input;
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

    async function importFile() {
        console.log('-- canvas store - importFile triggered');
    }

    return { loading, selectedCanvas, selectedCanvasSides, selectedCanvasAngle, setCanvas, changeCanvas, changeCanvasSides, changeCanvasAngle, addItem, updateItem, deleteItem, selectItem, resetCanvas, undoCanvas, redoCanvas, importFile };
}, {
    persist: {
        paths: ['loading']
    }
});