import Camera from "./Camera";
import Instance from "./Instance";
import Matrix from "../math/Matrix";
import Box from "../renderables/Box";
import Track from "../renderables/Track";

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
    }

    /**
     * Create all the instances in the world.
     */
    public genesis()
    {
        this.trackInstances = [];
        let track = new Track(this.gl);
        let trackInstance = new Instance(track);
        trackInstance.translate(-4, 0, -10);
        this.trackInstances.push(trackInstance);
        
        this.boxInstances = [];
        let box = new Box(this.gl);
        let boxInstance = new Instance(box);
        boxInstance.translate(4, 0, -10);
        this.boxInstances.push(boxInstance);

        let m: Matrix = new Matrix();
        m.translate(0, 1, 0);
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