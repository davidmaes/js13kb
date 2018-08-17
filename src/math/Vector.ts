import Matrix from "./Matrix";

export default class Vector {

    /**
     *
     */
    private v: Float32Array;

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {number} w
     */
    public constructor(x: number, y: number, z: number, w: number) {
        this.v = new Float32Array([x, y, z, w]);
    }

    /**
     * @returns {Float32Array}
     */
    public getFloat32Array() {
        return this.v;
    }

    /**
     * @param {Matrix} matrix
     */
    public multiply(matrix: Matrix) {
        let lhs = this.v;
        let rhs = matrix.getFloat32Array();

        this.v = new Float32Array([
            lhs[0] * rhs[0] + lhs[1] * rhs[4] + lhs[2] * rhs[8] + lhs[3] * rhs[12],
            lhs[0] * rhs[1] + lhs[1] * rhs[5] + lhs[2] * rhs[9] + lhs[3] * rhs[13],
            lhs[0] * rhs[2] + lhs[1] * rhs[6] + lhs[2] * rhs[10] + lhs[3] * rhs[14],
            lhs[0] * rhs[3] + lhs[1] * rhs[7] + lhs[2] * rhs[11] + lhs[3] * rhs[15],
        ]);
    }
}
