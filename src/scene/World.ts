import Camera from "./Camera";
import TrackInstance from "./TrackInstance";
import Track from "../renderables/Track";
import Matrix from "../math/Matrix";

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
    private trackInstances: TrackInstance[];

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

        for (let x = 0; x < 10; x++) {
            for (let z = 0; z < 10; z++) {
                let trackInstance = new TrackInstance(track);
                trackInstance.translate(-10 + x * 2, 0, z * -2);
                this.trackInstances.push(trackInstance);
            }
        }

        let m: Matrix = new Matrix();
        m.translate(0, 1, 1);
        this.camera.transform(m);
    }

    /**
     * Render the world.
     */
    public render()
    {
        this.camera.clear();
        this.camera.renderInstances(this.trackInstances);
    }

    /**
     *
     */
    public animate()
    {
    }
}