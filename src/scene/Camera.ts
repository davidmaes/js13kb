import Matrix from "../math/Matrix";
import Triangle from "../objects/Triangle";
import Instance from "./Instance";

export default class Camera {
    /**
     *
     */
    private triangle: Triangle;

    /**
     *
     */
    private instances: Instance[];

    /**
     *
     */
    private modelMatrixIndex: WebGLUniformLocation;

    /**
     *
     */
    private viewMatrix: Matrix;

    /**
     *
     */
    private viewMatrixIndex: WebGLUniformLocation;

    /**
     *
     */
    private projectionMatrix: Matrix;

    /**
     *
     */
    private projectionMatrixIndex: WebGLUniformLocation;

    /**
     *
     */

    /**
     * @param {WebGLRenderingContext} gl
     */
    public constructor(gl: WebGLRenderingContext)
    {
        this.setupModel(gl);
        this.setupMatrices();
        this.setupMatrixIndices(gl);
        this.configureGL(gl);
        this.setupInstances();
    }

    /**
     *
     * @param {WebGLRenderingContext} gl
     */
    private setupModel(gl: WebGLRenderingContext)
    {
        this.triangle = new Triangle(gl);
    }

    /**
     *
     */
    private setupMatrices()
    {
        this.projectionMatrix = new Matrix();
        this.projectionMatrix.perspective(45, 1027 / 768, 1, 100);

        this.viewMatrix = new Matrix();
        this.viewMatrix.translate(0, -1, -4);
    }

    /**
     *
     */
    private setupMatrixIndices(gl: WebGLRenderingContext)
    {
        this.projectionMatrixIndex = gl.getUniformLocation(
            this.triangle.getShaderProgram(),
            "uProjection"
        );

        this.viewMatrixIndex = gl.getUniformLocation(
            this.triangle.getShaderProgram(),
            "uView"
        );

        this.modelMatrixIndex = gl.getUniformLocation(
            this.triangle.getShaderProgram(),
            "uModel"
        );
    }

    /**
     * @param {WebGLRenderingContext} gl
     */
    private configureGL(gl: WebGLRenderingContext)
    {
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
    }

    /**
     *
     */
    private setupInstances() {
        this.instances = [];
        this.instances.push(new Instance);
        this.instances.push(new Instance);
        this.instances.push(new Instance);
    }

    /**
     *
     */
    public render(gl: WebGLRenderingContext)
    {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.useProgram(this.triangle.getShaderProgram());

        this.uploadProjectionMatrix(gl);
        this.uploadViewMatrix(gl);

        for (let i = 0; i < this.instances.length; i++) {
            let instance: Instance = this.instances[i];
            instance.animate();
            this.uploadModelMatrix(gl, instance);

            gl.drawArrays(gl.LINE_LOOP, 0, 3);
        }
    }

    /**
     *
     */
    private uploadProjectionMatrix(gl: WebGLRenderingContext)
    {
        gl.uniformMatrix4fv(
            gl.getUniformLocation(
                this.triangle.getShaderProgram(),
                "uProjection"
            ),
            false,
            this.projectionMatrix.getMatrix()
        );
    }
    /**
     *
     */
    private uploadViewMatrix(gl: WebGLRenderingContext)
    {
        gl.uniformMatrix4fv(this.viewMatrixIndex, false, this.viewMatrix.getMatrix());
    }

    /**
     *
     */
    private uploadModelMatrix(gl: WebGLRenderingContext, matrix: Matrix)
    {
        gl.uniformMatrix4fv(this.modelMatrixIndex, false, matrix.getMatrix());
    }
}
