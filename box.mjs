import shader_simple_vert from './shaders/simple_vert.mjs';
import shader_simple_frag from './shaders/simple_frag.mjs';

let gl, indices, squareIndexBuffer, squareVertexBuffer, program;

function getShader(shaderType, shaderString) {
    const shader = gl.createShader(shaderType);
    gl.shaderSource(shader, shaderString);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

function initProgram() {
    const vertexShader = getShader(gl.VERTEX_SHADER, shader_simple_vert);
    const fragmentShader = getShader(gl.FRAGMENT_SHADER, shader_simple_frag);

    program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Failed to initialize shaders');
    }

    gl.useProgram(program);
    program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
}

function initBuffers() {
    const vertices = [
        -0.5,  0.5, 0,
        -0.5, -0.5, 0,
         0.5, -0.5, 0,
         0.5,  0.5, 0
    ];
    indices = [0, 1, 2, 0, 2, 3];
    squareVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    squareIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
}

function draw() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
    gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(program.aVertexPosition);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndexBuffer);

    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
}

function init() {
    const canvas = document.getElementById('webgl-canvas');

    if (canvas == null) {
        console.error('No HTML5 Canvas found');
        return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    gl = canvas.getContext('webgl2');
    gl.clearColor(0, 0, 0, 1);

    initProgram();
    initBuffers();
    draw();
}

window.onload = init;