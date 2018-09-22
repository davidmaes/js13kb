import Renderable from "./Renderable";

export default class House extends Renderable
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
        return 'vertex-shader';
    }status

    /**
     * @inheritDoc
     */
    protected getFragmentShaderId() {
        return 'fragment-shader';
    }

    /**
     *
     */
    public uploadVertexBuffers() {
        this.uploadVertexBuffer("aPosition", this.getVertices(), 3);
    }

    /**
     * @returns {number[]}
     */
    protected  getVertices(): number[] {
        let lines: number[] = [
            
        ];

        let vertices: number[] = [];
        for (let k = 0; k < 3; k++) {

            for (let i = 0; i < lines.length; i += 6) {
                for (let j = 0; j < 6; j++) {

                    console.log(i+j);
                    vertices.push(lines[i+j] - 0.01 + Math.random() * 0.1);
                }
            }
        }


        console.log( vertices);
        return vertices;
    }

    /**
     * @inheritDoc
     */
    protected getIndices(): number[] {
        return [
            0, 1, 2, 0, 2, 3,
            4, 5, 6, 4, 6, 7,
            8, 9, 10, 8, 10, 11,
            12, 13, 14, 12, 14, 15,
            16, 17, 18, 16, 18, 19,
            20, 21, 22, 20, 22, 23
        ];
    }

    /**
     * @inheritDoc
     */
    public draw() {
        //this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.gl.drawArrays(this.gl.LINES, 0, 24*3);
    }
}
