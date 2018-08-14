import World from "./scene/World";

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
    private gl: WebGLRenderingContext;

    /**
     *
     */
    public constructor() {
        let canvas = <HTMLCanvasElement> document.getElementById('canvas');
        this.gl = <WebGLRenderingContext> canvas.getContext('webgl');

        this.gl.viewport(0, 0, canvas.width, canvas.height);

        this.world = new World(this.gl);
        this.world.genesis();
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

        window.requestAnimationFrame(this.renderCallback);
    }
}

/**
 *
 */
addEventListener('load', function(){
    new Main();
});