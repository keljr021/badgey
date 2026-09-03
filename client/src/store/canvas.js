import { nextTick, ref } from 'vue';
import { defineStore } from 'pinia';
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
        let timestamp = new Date().getTime();
        
        let itemId = '';
        let inputType = input.type;

        switch(input.type) {
            case 'rectangle': case 'circle': 
            case 'polygon': case 'shape':
                inputType = 'shape';
                itemId = 'shape' + timestamp;
                break;
            default:
                itemId = input.type + timestamp;
                break;
        }

        output.id = itemId;
        output.konvaValues = {
            ...canvasConfig[inputType],
            id: itemId,
        }

        if (input.type !== 'line') {
            output.konvaValues.x = canvasConfig[inputType].x + (nodes.value.length + 10);
            output.konvaValues.y = canvasConfig[inputType].y + (nodes.value.length + 10);
        }

        console.log('-- canvas store - addItem triggered: ', output);
        nodes.value.push(output);
        console.log('-- canvas store - addItem - nodes: ', nodes.value);
    }

    async function updateItem(id, input) {
        console.group('-- canvas.js [updateItem] - updateItem triggered - id: ', id, ' - input: ', input);

        for (let i = 0; i < nodes.value.length; i++) {
            if (nodes.value[i].id === id) {
                console.log('-- canvas.js [updateItem] - node found: ', nodes.value[i]);

                Object.keys(input).forEach((inputKey) => {
                    console.log('  -- canvas.js [updateItem] - inputKey: ', inputKey, ' - value: ', input[inputKey]);
                    if (inputKey === 'konvaValues') {
                        Object.keys(input.konvaValues).forEach((konvaKey) => {
                            console.log('     -- konvaValues: key - ', konvaKey, ' - value: ', input.konvaValues[konvaKey]);
                            nodes.value[i].konvaValues[konvaKey] = input.konvaValues[konvaKey];
                        });
                    }
                    else {
                        if (inputKey !== 'id') {
                            console.log('   -- key: ', inputKey, ' - value: ', input[inputKey]);
                            nodes.value[i][inputKey] = input[inputKey];
                        }
                    }
                });
                console.log('node updated to: ', nodes.value[i]);
                console.groupEnd();
                break;
            }
        }
    }

    async function deleteItem(id) {
        console.log('-- canvas store - deleteItem triggered - id: ', id);
        let updatedNodes = [];
        for (let i = 0; i < nodes.value.length; i++) {
            let node = nodes.value[i];
            if (node.id !== id) {
                updatedNodes.push(node);
            }
        }
        nodes.value = updatedNodes;
    }

    async function selectItem(id) {
        console.log('-- canvas store - selectItem triggered - id: ', id);
        let output = null;
        for (let i = 0; i < nodes.value.length; i++) {
            let node = nodes.value[i];

            if (node.id === id) {
                output = node;
                break;
            }
        }
        return output;
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

        let timestamp = new Date().getTime();

        nodes.value.push({
            type: 'image',
            element: input,
            id: 'image' + timestamp,
            konvaValues: {
                ...canvasConfig.image,
                id: 'image' + timestamp,
            }
        });        
    }

    return { loading, selectedCanvas, selectedCanvasSides, selectedCanvasAngle, selectedCanvasBorder, nodes, setCanvas, changeCanvas, changeCanvasSides, changeCanvasAngle, changeCanvasBorder, addItem, updateItem, deleteItem, selectItem, resetCanvas, undoCanvas, redoCanvas, importFile };
}, {
    persist: {
        paths: ['loading']
    }
});