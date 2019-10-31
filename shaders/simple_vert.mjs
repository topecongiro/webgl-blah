export {shader_simple_vert as default};
const shader_simple_vert =`#version 300 es

precision mediump float;

in vec3 aVertexPosition;

void main(void)
{
    gl_Position = vec4(aVertexPosition, 1.0);
}
`;