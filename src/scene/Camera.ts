import Object3D from "./Object3D";

export default class Camera extends Object3D {
    private gl: WebGLRenderingContext;

    private vertexShader: WebGLShader;
    private fragmentShader: WebGLShader;
    private shaderProgram: WebGLProgram;
    private vertexBuffer: WebGLBuffer;
    private verteBufferIndex: number;

    /**
     * @param {WebGLRenderingContext} gl
     */
    public constructor(gl: WebGLRenderingContext) {
        super();

        this.gl = gl;
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.enable(this.gl.DEPTH_TEST);
    }

    /**
     *
     */
    public render() {
        this.setupShaders();
        this.setupVertexBuffer();
        this.uploadVertexBuffer();

        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.drawArrays(this.gl.POINTS, 0, 100);
    }

    /**
     *
     */
    private setupShaders() {
        this.vertexShader = this.getShader('vertex-shader', this.gl.VERTEX_SHADER);
        this.fragmentShader = this.getShader('fragment-shader', this.gl.FRAGMENT_SHADER);

        this.shaderProgram = this.gl.createProgram();
        this.gl.attachShader(this.shaderProgram, this.vertexShader);
        this.gl.attachShader(this.shaderProgram, this.fragmentShader);
        this.gl.linkProgram(this.shaderProgram);

        if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        this.gl.useProgram(this.shaderProgram);
    }

    /**
     * @param {string} id
     * @param {number} type
     * @returns {WebGLShader}
     */
    private getShader(id: string, type: number)
    {
        let source = document.getElementById(id).innerHTML;
        let shader = this.gl.createShader(type);

        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            alert(this.gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    }

    /**
     *
     */
    private setupVertexBuffer()
    {
        this.vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);

        let vertices = [];

        for (let x = 0; x < 10; x++) {
            for (let z = 0; z < 10; z++) {
                vertices.push(x/100);
                vertices.push(z/100);
                vertices.push(0);
            }
        }

        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    }

    private uploadVertexBuffer() {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.verteBufferIndex = this.gl.getAttribLocation(this.shaderProgram, "aPosition");
        this.gl.enableVertexAttribArray(this.verteBufferIndex);
        this.gl.vertexAttribPointer(this.verteBufferIndex, 3, this.gl.FLOAT, false, 0, 0);
    }

}
