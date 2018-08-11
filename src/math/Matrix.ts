export default class Matrix {
    private m: Float32Array;

    public constructor() {
        this.identity();
    }

    /**
     *
     */
    public getMatrix() {
        return this.m;
    }

    /**
     *
     */
    public identity() {
        this.m = new Float32Array([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ]);
    }

    /**
     *
     * @param fov
     * @param aspect
     * @param near
     * @param far
     */
    public perspective(fov, aspect, near, far) {
        let f: number;
        let yy: number;
        let yz: number;

        f = 1.0 / Math.tan(fov / 2);

        if (far != null && far !== Infinity) {
            yy = (far + near) * (1 / (near - far));
            yz = (2 * far * near) * (1 / (near - far));
        } else {
            yy = -1;
            yz = -2 * near;
        }

        this.m = new Float32Array([
            f / aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, yy, -1,
            0, 0, yz, 0
        ]);
    }
}
