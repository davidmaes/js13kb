import VertexBuffer from "../webgl/VertexBuffer";

export default abstract class Renderable
{
    /**
     * The WebGL rendering context.
     */
    protected gl: WebGLRenderingContext;

    /**
     * The shader program
     */
    private program: WebGLProgram;

    /**
     * The vertexbuffer of the renderable.
     */
    private vertexBuffers: VertexBuffer[];

    /**
     * The indexbuffer of the renderable.
     */
    protected indexBuffer: WebGLBuffer;

    /**
     * The index of where to store the model matrix
     */
    private modelMatrixIndex: WebGLUniformLocation;

    /**
     * The index of where to store the view matrix
     */
    private viewMatrixIndex: WebGLUniformLocation;

    /**
     * The index of where to store the projection matrix
     */
    private projectionMatrixIndex: WebGLUniformLocation;

    /**
     *
     * @param {WebGLRenderingContext} gl
     */
    protected constructor(gl: WebGLRenderingContext) {
        this.gl = gl;
        this.vertexBuffers = [];
    }

    /**
     * Returns the program for rendering classes.
     *
     * @returns {WebGLProgram}
     */
    public getProgram(): WebGLProgram
    {
        return this.program;
    }

    /**
     * @returns {WebGLUniformLocation}
     */
    public getModelMatrixIndex(): WebGLUniformLocation
    {
        return this.modelMatrixIndex;
    }

    /**
     * @returns {WebGLUniformLocation}
     */
    public getViewMatrixIndex(): WebGLUniformLocation
    {
        return this.viewMatrixIndex;
    }

    /**
     * @returns {WebGLUniformLocation}
     */
    public getProjectionMatrixIndex(): WebGLUniformLocation
    {
        return this.projectionMatrixIndex;
    }

    /**
     * Uploads all graphics of this renderable, such as shaders, vertexbuffers, indexbuffer.
     */
    public uploadGraphics() {
        this.uploadProgram();
        this.uploadVertexBuffers();
        this.uploadIndexBuffer();
        this.retrieveMatrixIndices();
    }

    /**
     * Creates and uploads both the vertex as fragment shader to the GPU.
     */
    private uploadProgram()
    {
        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program, this.createShader(this.getVertexShaderId(), this.gl.VERTEX_SHADER));
        this.gl.attachShader(this.program, this.createShader(this.getFragmentShaderId(), this.gl.FRAGMENT_SHADER));
        this.gl.linkProgram(this.program);
    }

    /**
     * @return {string} Id of the vertex shader.
     */
    protected abstract getVertexShaderId();

    /**
     * @return {string} Id of the fragment shader.
     */
    protected abstract getFragmentShaderId();

    /**
     * @param {string} id
     * @param {number} type
     * @returns {WebGLShader}
     */
    private createShader(id: string, type: number)
    {
        let source = document.getElementById(id).innerHTML;
        let shader = this.gl.createShader(type);

        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        return shader;
    }

    /**
     *
     */
    protected abstract uploadVertexBuffers();

    /**
     * @param {string} vertexBufferName
     * @param {number[]} vertexBufferData
     * @param {number} vertexBufferDataSize
     */
    protected uploadVertexBuffer(vertexBufferName: string, vertexBufferData: number[], vertexBufferDataSize: number) {
        let vertexBuffer = this.gl.createBuffer();
        let vertexBufferIndex = this.gl.getAttribLocation(this.program, vertexBufferName);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertexBufferData), this.gl.STATIC_DRAW);
        this.gl.enableVertexAttribArray(vertexBufferIndex);

        this.vertexBuffers.push(new VertexBuffer(vertexBuffer, vertexBufferIndex, vertexBufferDataSize));
    }

    /**
     *
     */
    private uploadIndexBuffer() {
        this.indexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.getIndices()), this.gl.STATIC_DRAW);
    }

    /**
     * @return {number[]}
     */
    protected abstract getIndices(): number[];

    /**
     *
     */
    private retrieveMatrixIndices() {
        this.modelMatrixIndex = this.gl.getUniformLocation(this.program, "uModel");
        this.viewMatrixIndex = this.gl.getUniformLocation(this.program, "uView");
        this.projectionMatrixIndex = this.gl.getUniformLocation(this.program, "uProjection");
    }

    /**
     *
     */
    public setVertexAttributesPointers() {
        for (let vertexBuffer of this.vertexBuffers) {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer.getVertexBuffer());
            this.gl.vertexAttribPointer(vertexBuffer.getIndex(), vertexBuffer.getSize(), this.gl.FLOAT, false, 0, 0);
        }
    }

    /**
     *
     */
    public abstract draw();
}
