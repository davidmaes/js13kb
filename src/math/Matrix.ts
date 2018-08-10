import Vector from "./Vector";

export default class Matrix {
    private x: Vector;
    private y: Vector;
    private z: Vector;
    private w: Vector;

    public constructor() {
        this.x = new Vector(1, 0, 0, 0);
        this.y = new Vector(0, 1, 0, 0);
        this.z = new Vector(0, 0, 1, 0);
        this.w = new Vector(0, 0, 0, 1);
    }
}