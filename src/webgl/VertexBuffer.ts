export default class VertexBuffer
{
    /**
     *
     */
    private vertexBuffer: WebGLBuffer;

    /**
     *
     */
    private index: number;

    /**
     *
     */
    private size: number;

    /**
     * @param {WebGLBuffer} vertexBuffer
     * @param {string} index
     * @param {number} size
     */
    public constructor(vertexBuffer: WebGLBuffer, index: number, size: number) {
        this.vertexBuffer = vertexBuffer;
        this.index = index;
        this.size = size;
    }

    /**
     * @return {WebGLBuffer}
     */
    public getVertexBuffer(): WebGLBuffer {
        return this.vertexBuffer;
    }

    /**
     * @return {number}
     */
    public getIndex(): number {
        return this.index;
    }

    /**
     * @return {number}
     */
    public getSize(): number {
        return this.size;
    }
}
