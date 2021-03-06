import Matrix from "../math/Matrix";
import Renderable from "../renderables/Renderable";
import Instance from "./Instance";
import ViewMatrix from "../math/ViewMatrix";

export default class Camera
{
    /**
     * The WebGL rendering context.
     */
    private gl: WebGLRenderingContext;

    /**
     * The view matrix
     */
    private viewMatrix: ViewMatrix;

    /**
     * The projection matrix
     */
    private projectionMatrix: Matrix;

    /**
     * @param {WebGLRenderingContext} gl
     * @param width
     * @param height
     */
    public constructor(gl: WebGLRenderingContext, width: number, height: number) {
        this.gl = gl;
        this.setupMatrices();
        this.configureGL(width, height);
    }

    /**
     * Creates the view and projection matrix.
     */
    private setupMatrices() {
        this.projectionMatrix = new Matrix();
        this.projectionMatrix.perspective(45, 1024 / 768, 1, 100);
        this.viewMatrix = new ViewMatrix();
    }

    /**
     * Sets some basic GL configuration parameters.
     *
     * @param {number} width
     * @param {number} height
     */
    private configureGL(width: number, height: number) {
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.viewport(0, 0, width, height);

    }

    /**
     * Clears the screen.
     */
    public clear() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }

    /**
     * Note that this function expects instances of only one Renderable at at time.
     */
    public renderInstances(instances:Instance[]) {

        if (instances.length == 0) {
            return;
        }

        let firstInstance: Instance = instances[0];
        let firstRenderable: Renderable = firstInstance.getRenderable();

        this.gl.useProgram(firstRenderable.getProgram());

        firstRenderable.setVertexAttributesPointers();

        this.uploadMatrix(firstRenderable.getViewMatrixIndex(), this.viewMatrix.getInvertedFloat32Array());
        this.uploadMatrix(firstRenderable.getProjectionMatrixIndex(), this.projectionMatrix.getFloat32Array());

        for (let instance of instances) {
            let renderable: Renderable = instance.getRenderable();

            this.uploadMatrix(renderable.getModelMatrixIndex(), instance.getFloat32Array());

            renderable.draw();
        }
    }

    /**
     *
     */
    private uploadMatrix(index: WebGLUniformLocation, matrix: Float32Array) {
        this.gl.uniformMatrix4fv(index, false, matrix);
    }

    /**
     * @param {Matrix} matrix
     */
    public prepend(matrix: Matrix) {
        this.viewMatrix.prepend(matrix);
    }

    /**
     * @param {Matrix} matrix
     */
    public append(matrix: Matrix) {
        this.viewMatrix.append(matrix);
    }
}
