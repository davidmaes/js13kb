import Matrix from "../math/Matrix";

export default class Instance extends Matrix
{
    private isFixed: boolean;

    /**
     *
     */
    public constructor() {
        super();

        this.isFixed = false;

        this.translate(
            Math.random(),
            Math.random(),
            Math.random()
        );
    }

    /**
     *
     */
    public animate()
    {
        this.rotateY(0.01);
    }
}