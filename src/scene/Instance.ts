import Matrix from "../math/Matrix";
import Renderable from "../renderables/Renderable";

export default class Instance extends Matrix
{
    private renderable: Renderable;

    /**
     * @param {Renderable} renderable
     */
    public constructor(renderable: Renderable)
    {
        super();

        this.renderable = renderable;
    }

    /**
     * @returns {Renderable}
     */
    public getRenderable() {
        return this.renderable;
    }
}