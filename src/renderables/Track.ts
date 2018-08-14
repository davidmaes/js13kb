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
     * @returns {number[]}
     */
    public getVertices()
    {
        return [
            -0.5, 0, 0.5,
            0.5, 0, 0.5,
            0.5, 0, -0.5,
            -0.5, 0,0 -0.5,
        ];
    }

    /**
     *
     */
    draw() {
        this.gl.drawArrays(this.gl.LINE_LOOP, 0, 4);
    }
}
