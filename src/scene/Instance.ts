import Matrix from "../math/Matrix";
import Renderable from "../renderables/Renderable";

export default abstract class Instance extends Matrix
{
    private renderable: Renderable;

    /**
     * @param {Renderable} renderable
     */
    protected constructor(renderable: Renderable)
    {
        super();

        this.renderable = renderable;
    }

    /**
     * @returns {Renderable}
     */
    getRenderable() {
        return this.renderable;
    }
}