import Object3D from "./Object3D";
import Matrix from "../math/Matrix";

export default class Camera extends Object3D {
    private gl: WebGLRenderingContext;

    private vertexShader: WebGLShader;
    private fragmentShader: WebGLShader;
    private shaderProgram: WebGLProgram;
    private vertexBuffer: WebGLBuffer;
    private vertexBufferIndex: number;

    private projectionMatrix: Matrix;
    private projectionMatrixIndex: WebGLUniformLocation;
    private viewMatrix: Matrix;
    private viewMatrixIndex: WebGLUniformLocation;
    private modelMatrix: Matrix;
    private modelMatrix2: Matrix;
    private modelMatrixIndex: WebGLUniformLocation;
    private renderCallback: FrameRequestCallback;

    /**
     * @param {WebGLRenderingContext} gl
     */
    public constructor(gl: WebGLRenderingContext) {
        super();

        this.renderCallback = this.render.bind(this);

        this.gl = gl;
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.enable(this.gl.DEPTH_TEST);

        this.setupShaders();
        this.setupVertexBuffer();
        this.setupProjectionMatrix();
        this.setupViewMatrix();
        this.setupModelMatrix();
        this.setupModelMatrix2();
    }

    /**
     *
     */
    public render() {
        this.uploadVertexBuffer();
        this.uploadProjectionMatrix();
        this.uploadViewMatrix();

        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        for (let i = 0; i < 500; i++) {
            this.modelMatrix = new Matrix();
            this.modelMatrix.translate(
                this.getRandom(-5000, 5000),
                0,
                this.getRandom(-100000, 0)
            );
            this.uploadModelMatrix();
            this.gl.drawArrays(this.gl.POINTS, 0, 1);
        }

        window.requestAnimationFrame(this.renderCallback);
    }

    private getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return (Math.floor(Math.random() * (max - min)) + min) / 1000;
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
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([0, 0, 0]), this.gl.STATIC_DRAW);
    }

    /**
     *
     */
    private uploadVertexBuffer() {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.vertexBufferIndex = this.gl.getAttribLocation(this.shaderProgram, "aPosition");
        this.gl.vertexAttribPointer(this.vertexBufferIndex, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.vertexBufferIndex);

    }

    /**
     *
     */
    private setupProjectionMatrix() {
        this.projectionMatrix = new Matrix();
        this.projectionMatrix.perspective(40, 1024/768, 1, 100);
    }

    /**
     *
     */
    private setupViewMatrix() {
        this.viewMatrix = new Matrix();
        this.viewMatrix.translate(0, -2, -6);
    }

    /**
     *
     */
    private setupModelMatrix() {
        this.modelMatrix = new Matrix();
    }
    /**
     *
     */
    private setupModelMatrix2() {
        this.modelMatrix2 = new Matrix();
    }

    /**
     *
     */
    private uploadProjectionMatrix() {
        this.projectionMatrixIndex = this.gl.getUniformLocation(this.shaderProgram, "uProjection");
        this.gl.uniformMatrix4fv(this.projectionMatrixIndex, false, this.projectionMatrix.getMatrix());
    }

    /**
     *
     */
    private uploadViewMatrix() {
        this.viewMatrixIndex = this.gl.getUniformLocation(this.shaderProgram, "uView");
        this.gl.uniformMatrix4fv(this.viewMatrixIndex, false, this.viewMatrix.getMatrix());
    }

    /**
     *
     */
    private uploadModelMatrix() {
        this.modelMatrixIndex = this.gl.getUniformLocation(this.shaderProgram, "uModel");
        this.gl.uniformMatrix4fv(this.modelMatrixIndex, false, this.modelMatrix.getMatrix());
    }
}
