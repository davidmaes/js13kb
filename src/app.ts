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
    private camera: Camera;

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

        this.camera = new Camera(this.gl);

        this.renderCallback = this.render.bind(this);
        this.render();
    }

    /**
     *
     */
    private render()
    {
        this.camera.render(this.gl);

        window.requestAnimationFrame(this.renderCallback);
    }
}

/**
 *
 */
addEventListener('load', function(){
    new Main();
});