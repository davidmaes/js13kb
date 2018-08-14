import Camera from "./Camera";
import TrackInstance from "./TrackInstance";
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
    private trackInstances: TrackInstance[];

    /**
     * @param {WebGLRenderingContext} gl
     */
    constructor(gl: WebGLRenderingContext)
    {
        this.gl = gl;
    }

    /**
     * Create all the instances in the world.
     */
    public genesis()
    {
        this.camera = new Camera(this.gl);
        this.trackInstances = [];

        let track = new Track(this.gl);

        for (let i = 0; i < 100; i++) {
            let trackInstance = new TrackInstance(track);
            trackInstance.translate(0, 0, -i * 2);
            this.trackInstances.push(trackInstance);

        }

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
        for (let i = 0; i < this.trackInstances.length; i++) {
            this.trackInstances[i].animate();
        }

        this.camera.translate(0, 0, 0.1);
    }
}