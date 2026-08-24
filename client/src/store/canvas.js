import { nextTick, ref } from 'vue';
import { defineStore } from 'pinia';
import Konva from 'konva';
import * as canvasConfig from './../components/create/canvasConfig.js';

const { VITE_POST_URL } = import.meta.env;

export const useCanvasStore = defineStore('canvas', () => {
    const loading = ref(true);
    const selectedCanvas = ref('circle');
    const selectedCanvasSides = ref(3);
    const selectedCanvasAngle = ref(0);
    const selectedCanvasBorder = ref({});

    const nodes = ref([]);

    async function setCanvas() {
        changeCanvas(selectedCanvas.value);
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

    async function changeCanvasBorder(input) {
        console.log('-- canvas store - changeCanvasBorder triggered: ', input);
        selectedCanvasBorder.value = input;
    }

    async function addItem(input) {        
        let output = input;
        output.konvaValues = (canvasConfig[input.type]) ? (canvasConfig[input.type]) : null;
        console.log('-- canvas store - addItem triggered: ', output);
        nodes.value.push(output);
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
        nodes.value = [];
        setCanvas();
    }

    async function undoCanvas() {
        console.log('-- canvas store - undoCanvas triggered');
    }

    async function redoCanvas() {
        console.log('-- canvas store - redoCanvas triggered');
    }

    async function importFile(input) {
        console.log('-- canvas store - importFile triggered - input: ', input);
        nodes.value.push({
            type: 'image',
            element: input,
        });        
    }

    return { loading, selectedCanvas, selectedCanvasSides, selectedCanvasAngle, selectedCanvasBorder, nodes, setCanvas, changeCanvas, changeCanvasSides, changeCanvasAngle, changeCanvasBorder, addItem, updateItem, deleteItem, selectItem, resetCanvas, undoCanvas, redoCanvas, importFile };
}, {
    persist: {
        paths: ['loading']
    }
});