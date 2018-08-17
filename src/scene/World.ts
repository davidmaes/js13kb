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

        for (let i = 0; i < 100; i++) {
            let trackInstance = new TrackInstance(track);
            trackInstance.translate(0, 0, -i * 2);
            this.trackInstances.push(trackInstance);

        }

        let m: Matrix;
        m = new Matrix();
        m.translate(0, -1, 0);
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