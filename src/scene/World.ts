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
    private track: Track;

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

        this.track = new Track(this.gl);
        this.trackInstances = [];
        this.trackInstances.push(new TrackInstance(this.track));
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
    }
}