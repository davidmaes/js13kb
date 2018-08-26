import Renderable from "./Renderable";

export default class Track extends Renderable
{
    /**
     * @param {WebGLRenderingContext} gl
     */
    public constructor(gl: WebGLRenderingContext)
    {
        super(gl);
    }

    /**
     * @inheritDoc
     */
    protected getVertexShaderId() {
        return 'track-vertex-shader';
    }

    /**
     * @inheritDoc
     */
    protected getFragmentShaderId() {
        return 'color-fragment-shader';
    }

    /**
     *
     */
    public uploadVertexBuffers() {
        this.uploadVertexBuffer("aPosition", this.getVertices(), 3);
        this.uploadVertexBuffer("aColor", this.getColors(), 4);
    }

    /**
     * @returns {number[]}
     */
    public getVertices(): number[] {
        return [
            -0.5, 0, 0.5,
            0.5, 0, 0.5,
            0.5, 0, -0.5,
            -0.5, 0, -0.5,
        ];
    }

    /**
     * @return {number[]}
     */
    public getColors(): number[] {
        return [
            1.0, 0.0, 1.0, 1.0,
            1.0, 1.0, 0.0, 1.0,
            0.0, 1.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 1.0,
        ];
    }

    /**
     * @inheritDoc
     */
    protected getIndices() {
        return [0, 1, 2, 3];
    }

    /**
     * @inheritDoc
     */
    public draw() {
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.gl.drawElements(this.gl.LINE_LOOP, 4, this.gl.UNSIGNED_SHORT, 0);
    }
}
