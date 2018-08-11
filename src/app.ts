import Camera from "./scene/Camera";

class Main
{
    private canvas: HTMLCanvasElement;
    private gl: WebGLRenderingContext;
    private camera: Camera;

    public constructor()
    {
        this.canvas = <HTMLCanvasElement> document.getElementById('canvas');
        this.gl = <WebGLRenderingContext> this.canvas.getContext('webgl');
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.camera = new Camera(this.gl);
        this.camera.render();


    }
}

addEventListener('load', function(){
    new Main();
});