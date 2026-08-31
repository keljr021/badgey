export const transform = {
    boundBoxFunc: (oldBox, newBox) => {
        // limit resize
        if (newBox.width < 5 || newBox.height < 5) {
            return oldBox;
        }
        return newBox;
    }
};

export const stage = {
    width: 400,
    height: 400,
    scaleX: 1,
    scaleY: 1,
};

export const baseValues = {
    fill: '#fff',
    stroke: '#d9d9d9',
    shadowColor: '#ccc',
    shadowOpacity: 0.25,
    shadowBlur: 4,
    shadowOffsetY: 4,
    listening: false,
    rotation: 0,
    zIndex: -1,
};

export const bgCircle = {
    x: 200,
    y: 200,
    radius: 187,
    id: 'circleBackground',
    ...baseValues
};

export const bgRect = {
    x: 0,
    y: 0,
    width: 400,
    height: 400,
    id: 'rectBackground',
    listening: false,
    ...baseValues
};

export const bgPoly = {
    x: 200,
    y: 200,
    sides: 3,
    radius: 187,
    id: 'polyBackground',
    listening: false,
    ...baseValues
};

export const shape = {
    x: 100,
    y: 100,
    sides: 3,
    radius: 0,
    width: 100,
    height: 100,
    fill: '#659672',
    stroke: '#3f3f3f',
    draggable: true,
};

export const rect = {
    x: 50,
    y: 50,
    sides: 3,
    radius: 0,
    width: 100,
    height: 100,
    fill: '#659672',
    stroke: '#3f3f3f',
    draggable: true,
};

export const line = {
    points: [5, 70, 140, 70],
    hitStrokeWidth: 50,
    stroke: '#f92a2a',
    strokeWidth: 10,
    lineCap: 'round',
    lineJoin: 'round',
    draggable: true,
};

export const text = {
    x: 50,
    y: 50,
    text: 'Hello world!',
    fontFamily: 'Arial',
    fontSize: 24,
    draggable: true,
    width: 100
};

export const image = {
  x: 200, 
  y: 200,
  offsetX: 100, 
  offsetY: 100,
  rotation: 0,
  draggable: true,
};