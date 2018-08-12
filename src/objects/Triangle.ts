export default class Triangle
{
    /**
     * The vertexbuffer of the triangle.
     */
    private vertexBuffer: WebGLBuffer;

    /**
     *
     */
    private shaderProgram: WebGLProgram;

    /**
     *
     * @param {WebGLRenderingContext} gl
     */
    public constructor(gl: WebGLRenderingContext)
    {
        this.uploadShaderProgram(gl);
        this.uploadVertexBuffer(gl);
    }

    /**
     * @returns {WebGLProgram}
     */
    public getShaderProgram(): WebGLProgram
    {
        return this.shaderProgram;
    }

    /**
     *
     */
    public uploadShaderProgram(gl: WebGLRenderingContext)
    {
        this.shaderProgram = gl.createProgram();
        gl.attachShader(this.shaderProgram, this.createShader(gl, 'fragment-shader', gl.FRAGMENT_SHADER));
        gl.attachShader(this.shaderProgram, this.createShader(gl, 'vertex-shader', gl.VERTEX_SHADER));
        gl.linkProgram(this.shaderProgram);
    }
    /**
     *
     */
    public uploadVertexBuffer(gl: WebGLRenderingContext)
    {
        this.vertexBuffer = gl.createBuffer();

        let vertexBufferIndex = gl.getAttribLocation(this.shaderProgram, "aPosition");
        let vertices  = [
            0, 0, 0,
            -0.2, 0.3, 0.1,
            0.1, 0.3, 0.2
        ];

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        gl.vertexAttribPointer(vertexBufferIndex, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vertexBufferIndex);
    }

    /**
     * @param {WebGLRenderingContext} gl
     * @param {string} id
     * @param {number} type
     * @returns {WebGLShader}
     */
    private createShader(gl: WebGLRenderingContext, id: string, type: number)
    {
        let source = document.getElementById(id).innerHTML;
        let shader = gl.createShader(type);

        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        return shader;
    }
}
