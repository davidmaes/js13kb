import Instance from "./Instance";
import Renderable from "../renderables/Renderable";

export default class TrackInstance extends Instance
{
    /**
     * @param {Renderable} renderable
     */
    public constructor(renderable: Renderable) {
        super(renderable);
    }

    /**
     *
     */
    public animate()
    {
        this.rotateY(0.01);
    }
}