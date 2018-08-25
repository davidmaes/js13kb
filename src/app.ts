import World from "./scene/World";
import Controller from "./controller/Controller";
import Camera from "./scene/Camera";

class Main
{
    /**
     *
     */
    private renderCallback: FrameRequestCallback;

    /**
     *
     */
    private world: World;

    /**
     *
     */
    private camera: Camera;

    /**
     *
     */
    private controller: Controller;

    /**
     *
     */
    public constructor() {
        let canvas = <HTMLCanvasElement> document.getElementById('canvas');

        let gl = <WebGLRenderingContext> canvas.getContext('webgl');

        this.camera = new Camera(gl, canvas.width, canvas.height);
        this.world = new World(gl, this.camera);
        this.world.genesis();
        this.controller = new Controller(this.camera);

        this.renderCallback = this.gameLoop.bind(this);

        this.gameLoop();
    }

    /**
     *
     */
    private gameLoop()
    {
        this.world.render();
        this.world.animate();
        this.controller.onFrame();

        window.requestAnimationFrame(this.renderCallback);
    }
}

/**
 *
 */
addEventListener('load', function(){
    new Main();
});