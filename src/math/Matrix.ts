export default class Matrix {
    private m: Float32Array;

    /**
     * @param {Float32Array} m
     */
    public constructor(m: Float32Array = null)
    {
        if (m) {
            this.m = m;
        } else {
            this.identity();
        }
    }

    /**
     * @returns {Float32Array}
     */
    public getFloat32Array(): Float32Array {
        return this.m;
    }

    /**
     * Change the matrix back to identity.
     */
    public identity() {
        this.m = new Float32Array([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
    }

    /**
     * Turn the matrix into a perspective matrix.
     *
     * @param fov
     * @param aspect
     * @param zMin
     * @param zMax
     */
    public perspective(fov, aspect, zMin, zMax) {
        let angle = Math.tan((fov * 0.5) * Math.PI / 180);

        this.m = new Float32Array([
            0.5 / angle, 0, 0, 0,
            0, 0.5 * aspect / angle, 0, 0,
            0, 0, -(zMax + zMin) / (zMax - zMin), -1,
            0, 0, (-2 * zMax * zMin) / (zMax - zMin), 0
        ]);
    }

    /**
     * Translates the position by x, y, z.
     *
     * @param x
     * @param y
     * @param z
     */
    public translate(x, y, z) {
        let translation = new Matrix(new Float32Array([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            x, y, z, 1,
        ]));

        return this.prepend(translation);
    }

    /**
     * Rotates around the x axis.
     *
     * @param degrees
     */
    public rotateX(degrees) {
        let radians = degrees * Math.PI / 180;
        let sin = Math.sin(radians);
        let cos = Math.cos(radians);

        let rotation = new Matrix(new Float32Array([
            1, 0, 0, 0,
            0, cos, sin, 0,
            0, -sin, cos, 0,
            0, 0, 0, 1,
        ]));

        this.prepend(rotation);
    }

    /**
     * Rotates around the y axis.
     *
     * @param degrees
     */
    public rotateY(degrees) {
        let radians = degrees * Math.PI / 180;
        let sin = Math.sin(radians);
        let cos = Math.cos(radians);

        let rotation = new Matrix(new Float32Array([
            cos, 0, -sin, 0,
            0, 1, 0, 0,
            sin, 0, cos, 0,
            0, 0, 0, 1,
        ]));

        this.prepend(rotation);
    }

    /**
     * Rotates around the z axis.
     *
     * @param degrees
     */
    public rotateZ(degrees) {
        let radians = degrees * Math.PI / 180;
        let sin = Math.sin(radians);
        let cos = Math.cos(radians);

        let rotation = new Matrix(new Float32Array([
            cos, sin, 0, 0,
            -sin, cos, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ]));

        this.prepend(rotation);
    }

    /**
     *
     */
    public prepend(matrix: Matrix) {
        let lhs = matrix.getFloat32Array();
        let rhs = this.m;

        this.multiply(lhs, rhs);
    }

    /**
     *
     */
    public append(matrix: Matrix) {
        let lhs = this.m;
        let rhs = matrix.getFloat32Array();

        this.multiply(lhs, rhs);
    }

    /**
     * @param lhs
     * @param rhs
     */
    private multiply(lhs, rhs)
    {
        this.m = new Float32Array([
            lhs[0] * rhs[0] + lhs[1] * rhs[4] + lhs[2] * rhs[8] + lhs[3] * rhs[12],
            lhs[0] * rhs[1] + lhs[1] * rhs[5] + lhs[2] * rhs[9] + lhs[3] * rhs[13],
            lhs[0] * rhs[2] + lhs[1] * rhs[6] + lhs[2] * rhs[10] + lhs[3] * rhs[14],
            lhs[0] * rhs[3] + lhs[1] * rhs[7] + lhs[2] * rhs[11] + lhs[3] * rhs[15],
            lhs[4] * rhs[0] + lhs[5] * rhs[4] + lhs[6] * rhs[8] + lhs[7] * rhs[12],
            lhs[4] * rhs[1] + lhs[5] * rhs[5] + lhs[6] * rhs[9] + lhs[7] * rhs[13],
            lhs[4] * rhs[2] + lhs[5] * rhs[6] + lhs[6] * rhs[10] + lhs[7] * rhs[14],
            lhs[4] * rhs[3] + lhs[5] * rhs[7] + lhs[6] * rhs[11] + lhs[7] * rhs[15],
            lhs[8] * rhs[0] + lhs[9] * rhs[4] + lhs[10] * rhs[8] + lhs[11] * rhs[12],
            lhs[8] * rhs[1] + lhs[9] * rhs[5] + lhs[10] * rhs[9] + lhs[11] * rhs[13],
            lhs[8] * rhs[2] + lhs[9] * rhs[6] + lhs[10] * rhs[10] + lhs[11] * rhs[14],
            lhs[8] * rhs[3] + lhs[9] * rhs[7] + lhs[10] * rhs[11] + lhs[11] * rhs[15],
            lhs[12] * rhs[0] + lhs[13] * rhs[4] + lhs[14] * rhs[8] + lhs[15] * rhs[12],
            lhs[12] * rhs[1] + lhs[13] * rhs[5] + lhs[14] * rhs[9] + lhs[15] * rhs[13],
            lhs[12] * rhs[2] + lhs[13] * rhs[6] + lhs[14] * rhs[10] + lhs[15] * rhs[14],
            lhs[12] * rhs[3] + lhs[13] * rhs[7] + lhs[14] * rhs[11] + lhs[15] * rhs[15]
        ]);
    }
}
