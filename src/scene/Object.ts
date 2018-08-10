import Matrix from "../math/Matrix";

export default class Object {

    private globalCoords:Matrix;
    private localCoords: Matrix;

    public constructor() {
        this.globalCoords = new Matrix();
        this.localCoords = new Matrix();
    }
}