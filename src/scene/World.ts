import Camera from "./Camera";
import Instance from "./Instance";
import Matrix from "../math/Matrix";
import Box from "../renderables/Box";

export default class World
{
    /**
     * The WebGL rendering context.
     */
    private gl: WebGLRenderingContext;

    /**
     * The camera
     */
    private camera: Camera;

    /**
     * A list of box instances
     */
    private boxInstances: Instance[];

    /**
     * @param {WebGLRenderingContext} gl
     * @param camera
     */
    constructor(gl: WebGLRenderingContext, camera: Camera)
    {
        this.gl = gl;
        this.camera = camera;
        this.boxInstances = [];
    }

    /**
     * Create all the instances in the world.
     */
    public genesis()
    {
        let box = new Box(this.gl);
        box.uploadGraphics();

        for (let x = 0; x < 20; x++) {
            for (let z = 0; z < 20; z++) {
                let boxInstance = new Instance(box);
                boxInstance.translate(-30 + x * 3, -10 + Math.random() * 20, z * -3);
                this.boxInstances.push(boxInstance);
            }
        }

        let m: Matrix = new Matrix();
        m.translate(0, 3, 2);
        this.camera.prepend(m);
    }

    /**
     * Renders the world.
     */
    public render()
    {
        this.camera.clear();
        this.camera.renderInstances(this.boxInstances);
    }

    /**
     * Animates anything that needs animation.
     */
    public animate()
    {
    }
}