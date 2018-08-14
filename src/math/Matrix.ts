export default class Matrix {
    protected m: Float32Array;

    /**
     *
     */
    public constructor()
    {
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
     * @param x
     * @param y
     * @param z
     */
    public translate(x, y, z) {
        this.m[12] += x;
        this.m[13] += y;
        this.m[14] += z;
    }

    /**
     * @param angle
     */
    public rotateY(angle) {
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        let mv0 = this.m[0];
        let mv4 = this.m[4];
        let mv8 = this.m[8];

        this.m[0] = cos *this.m[0]+sin *this.m[2];
        this.m[4] = cos *this.m[4]+sin *this.m[6];
        this.m[8] = cos *this.m[8]+sin *this.m[10];

        this.m[2] = cos *this.m[2]-sin *mv0;
        this.m[6] = cos *this.m[6]-sin *mv4;
        this.m[10] = cos *this.m[10]-sin *mv8;
    }

    /**
     * @param angle
     */
    public rotateZ(angle) {
        let cos = Math.cos(angle);
        let s = Math.sin(angle);
        let mv0 = this.m[0];
        let mv4 = this.m[4];
        let mv8 = this.m[8];

        this.m[0] = cos*this.m[0]-s*this.m[1];
        this.m[4] = cos*this.m[4]-s*this.m[5];
        this.m[8] = cos*this.m[8]-s*this.m[9];

        this.m[1]=cos*this.m[1]+s*mv0;
        this.m[5]=cos*this.m[5]+s*mv4;
        this.m[9]=cos*this.m[9]+s*mv8;
    }

    /**
     * @param angle
     */
    public rotateX(angle) {
        let cos = Math.cos(angle);
        let s = Math.sin(angle);
        let mv1 = this.m[1];
        let mv5 = this.m[5];
        let mv9 = this.m[9];

        this.m[1] = this.m[1]*cos-this.m[2]*s;
        this.m[5] = this.m[5]*cos-this.m[6]*s;
        this.m[9] = this.m[9]*cos-this.m[10]*s;

        this.m[2] = this.m[2]*cos+mv1*s;
        this.m[6] = this.m[6]*cos+mv5*s;
        this.m[10] = this.m[10]*cos+mv9*s;
    }
}
