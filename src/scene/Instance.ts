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
            -5 + Math.random() * 10,
            -5 + Math.random() * 10,
            -Math.random() * 10,
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