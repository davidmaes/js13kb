import Matrix from "../math/Matrix";
import Renderable from "../renderables/Renderable";
import Instance from "./Instance";

export default class Camera
{
    /**
     *
     */
    private gl: WebGLRenderingContext;

    /**
     *
     */
    private viewMatrix: Matrix;

    /**
     *
     */
    private projectionMatrix: Matrix;

    /**
     * @param {WebGLRenderingContext} gl
     */
    public constructor(gl: WebGLRenderingContext)
    {
        this.gl = gl;
        this.setupMatrices();
        this.configureGL();
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
     * @param {WebGLRenderingContext} gl
     */
    private configureGL()
    {
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.enable(this.gl.DEPTH_TEST);
    }

    /**
     *
     * @param {WebGLRenderingContext} gl
     */
    public clear()
    {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }

    /**
     * Note that this function expects instances of only one Renderable at at time.
     */
    public renderInstances(instances:Instance[])
    {
        let firstInstance: Instance = instances[0];
        let firstRenderable: Renderable = firstInstance.getRenderable();

        this.uploadMatrix(firstRenderable.getViewMatrixIndex(), this.viewMatrix);
        this.uploadMatrix(firstRenderable.getProjectionMatrixIndex(), this.projectionMatrix);

        this.gl.useProgram(firstRenderable.getProgram());

        for (let instance of instances) {
            let renderable: Renderable = instance.getRenderable();

            this.uploadMatrix(renderable.getModelMatrixIndex(), instance);

            renderable.draw();
        }
    }

    /**
     *
     */
    private uploadMatrix(index: WebGLUniformLocation, matrix: Matrix)
    {
        this.gl.uniformMatrix4fv(index, false, matrix.getMatrix());
    }
}
