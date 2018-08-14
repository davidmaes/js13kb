export default abstract class Renderable
{
    /**
     * 
     */
    protected gl: WebGLRenderingContext;

    /**
     * The vertexbuffer of the triangle.
     */
    private vertexBuffer: WebGLBuffer;

    /**
     *
     */
    private program: WebGLProgram;

    /**
     *
     */
    private modelMatrixIndex: WebGLUniformLocation;

    /**
     *
     */
    private viewMatrixIndex: WebGLUniformLocation;

    /**
     *
     */
    private projectionMatrixIndex: WebGLUniformLocation;

    /**
     *
     * @param {WebGLRenderingContext} gl
     */
    protected constructor(gl: WebGLRenderingContext)
    {
        this.gl = gl;
        this.uploadProgram();
        this.uploadVertexBuffer();
        this.retrieveMatrixIndices();
    }

    /**
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
     *
     */
    public uploadProgram()
    {
        this.program = this.gl.createProgram();

        this.gl.attachShader(this.program, this.createShader('fragment-shader', this.gl.FRAGMENT_SHADER));
        this.gl.attachShader(this.program, this.createShader('vertex-shader', this.gl.VERTEX_SHADER));
        this.gl.linkProgram(this.program);
    }

    /**
     * @param {WebGLRenderingContext} gl
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
    public uploadVertexBuffer()
    {
        this.vertexBuffer = this.gl.createBuffer();

        let vertexBufferIndex = this.gl.getAttribLocation(this.program, "aPosition");

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.getVertices()), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(vertexBufferIndex, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(vertexBufferIndex);
    }

    /**
     *
     */
    abstract getVertices();

    /**
     * @param {WebGLRenderingContext} gl
     */
    private retrieveMatrixIndices() {
        this.modelMatrixIndex = this.gl.getUniformLocation(this.program, "uModel");
        this.viewMatrixIndex = this.gl.getUniformLocation(this.program, "uView");
        this.projectionMatrixIndex = this.gl.getUniformLocation(this.program, "uProjection");
    }

    /**
     *
     */
    abstract draw();
}
