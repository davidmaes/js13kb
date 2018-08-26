import Camera from "./Camera";
import Instance from "./Instance";
import Matrix from "../math/Matrix";
import Box from "../renderables/Box";

export default class World
{
    /**
     *
     */
    private gl: WebGLRenderingContext;

    /**
     *
     */
    private camera: Camera;

    /**
     *
     */
    private trackInstances: Instance[];

    /**
     *
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
        this.trackInstances = [];
    }

    /**
     * Create all the instances in the world.
     */
    public genesis()
    {
        let box = new Box(this.gl);

        for (let x = 0; x < 20; x++) {
            for (let z = 0; z < 20; z++) {
                let boxInstance = new Instance(box);
                boxInstance.translate(-30 + x * 3, 0, z * -3);
                this.boxInstances.push(boxInstance);
            }
        }

        let m: Matrix = new Matrix();
        m.translate(0, 3, 2);
        this.camera.prepend(m);
    }

    /**
     * Render the world.
     */
    public render()
    {
        this.camera.clear();
        this.camera.renderInstances(this.trackInstances);
        this.camera.renderInstances(this.boxInstances);
    }

    /**
     *
     */
    public animate()
    {
        for (let trackInstance of this.trackInstances) {
            trackInstance.rotateY(1);
        }

        for (let boxInstance of this.boxInstances) {
            boxInstance.rotateY(-1);
        }
    }
}