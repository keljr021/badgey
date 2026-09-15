import { nextTick, ref } from 'vue';
import { defineStore } from 'pinia';
import * as canvasConfig from './../components/create/canvasConfig.js';

const { VITE_POST_URL } = import.meta.env;

export const useCanvasStore = defineStore('canvas', () => {

    const loading = ref(true);
    const history = ref([]);
    const historyStep = ref(0);
    
    const canvasLayer = ref(null);
    const nodes = ref([]);
    const selectedNode = ref(null);

    const selectedCanvas = ref('circle');
    const selectedCanvasSides = ref(3);
    const selectedCanvasAngle = ref(0);
    const selectedCanvasBorder = ref({});
    const currentImportedFile = ref(null);
    
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
            case 'rectangle':
                itemId = 'rectangle' + timestamp;
                break;
            case 'circle': 
                inputType = 'circle';
                itemId = 'circle' + timestamp;
                break; 
            case 'polygon':
                inputType = 'polygon';
                itemId = 'polygon' + timestamp;
                break;    
            case 'shape':
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
            output.konvaValues.x = canvasConfig[inputType].x + (nodes.value.length * 10);
            output.konvaValues.y = canvasConfig[inputType].y + (nodes.value.length * 10);
        }

        console.log('-- canvas store - addItem triggered: ', output);
        nodes.value.push(output);
        selectedNode.value = output.id;

        recordHistory(output.id, output);

        console.log('-- canvas store - addItem - nodes: ', nodes.value);
    }

    async function updateItem(id, input, isUndoRedo = false) {
        console.group('-- [updateItem] - updateItem triggered - id: ', id, ' - input: ', input);

        selectedNode.value = input.id ? input.id : id;

        console.log(' - selectedNode: ', selectedNode.value);

        for (let i = 0; i < nodes.value.length; i++) {
            if (nodes.value[i].id === id) {
                let targetNode = nodes.value[i];
                console.log('-- node found: ', targetNode);

                Object.keys(input).forEach((inputKey) => {
                    console.log('  -- inputKey: ', inputKey, ' - value: ', input[inputKey]);
                    if (inputKey === 'konvaValues') {
                        Object.keys(input.konvaValues).forEach((konvaKey) => {
                            targetNode.konvaValues[konvaKey] = input.konvaValues[konvaKey];
                            console.log('  -- konvaValues: key - ', konvaKey, ' - value: ', input.konvaValues[konvaKey]);
                        });
                    }
                    else {
                        targetNode[inputKey] = input[inputKey];
                        console.log('   -- key: ', inputKey, ' - value: ', input[inputKey]);
                    }
                });
                console.log('node updated to: ', targetNode, ' - id: -', targetNode.id);
                nodes.value[i] = targetNode;

                if (isUndoRedo === false)
                    recordHistory(selectedNode.value, targetNode);

                break;
            }
        }
        console.groupEnd();
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

        let updatedHistory = [];
        for (let h = 0; h < history.value.length; h++) {
            let historyItem = history.value[h];
            if (historyItem.id !== id) {
                updatedHistory.push(historyItem);
            }
        }
        history.value = updatedHistory;
        historyStep.value = history.value.length;
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
        selectedNode.value = null;
        historyStep.value = 0;
        history.value = [];
        setCanvas();
    }

    async function undoCanvas() {
        console.log('-- canvas store - undoCanvas triggered');
        if (historyStep.value <= 0) 
            return;
  
        historyStep.value -= 1;
        stepToHistory();
    }

    async function redoCanvas() {
        console.log('-- canvas store - redoCanvas triggered');
        if (historyStep.value >= history.value.length) 
            return;
        
        historyStep.value += 1;
        stepToHistory();
    }

    async function recordHistory(id, value) {
        const historyItem = { id: id, value: JSON.stringify(value) };
        console.log( ' - [recordHistory] item: ', JSON.stringify(historyItem));
        history.value.push(historyItem);
        historyStep.value = history.value.length;
        console.log(' - [recordHistory] history step value: ', historyStep.value, ' - history is now: ', JSON.stringify(history.value));
    }

    async function stepToHistory() {
        console.log(' - [stepToHistory] step is now: ', historyStep.value);
        const obj = history.value[historyStep.value - 1];
        if (obj) {
            const id = obj.id;
            const parsedValue = JSON.parse(obj.value);
            console.log( ' - [stepToHistory] step object: ', obj.id, parsedValue);
            updateItem(id, parsedValue, true);
        }
    }

    async function importFile(input) {
        console.log('-- canvas store - importFile triggered - input: ', input);

        currentImportedFile.value = input;
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

    return { 
        history, 
        historyStep, 
        loading, 
        canvasLayer, 
        selectedCanvas, 
        selectedCanvasSides, 
        selectedCanvasAngle, 
        selectedCanvasBorder, 
        nodes, 
        selectedNode, 
        setCanvas, 
        changeCanvas, 
        changeCanvasSides, 
        changeCanvasAngle, 
        changeCanvasBorder, 
        addItem, 
        updateItem, 
        deleteItem, 
        selectItem, 
        resetCanvas, 
        undoCanvas,
        redoCanvas, 
        recordHistory, 
        importFile 
    };
}, {
    persist: {
        paths: ['loading']
    }
});