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
     *
     * @param {WebGLRenderingContext} gl
     */
    constructor(gl: WebGLRenderingContext)
    {
        this.gl = gl;
        this.camera = new Camera(gl);

        this.setupInstances(gl);
    }

    /**
     *
     */
    private setupInstances(gl: WebGLRenderingContext)
    {
        this.track = new Track(gl);
        this.trackInstances = [];
        this.trackInstances.push(new TrackInstance(this.track));
    }

    /**
     *
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