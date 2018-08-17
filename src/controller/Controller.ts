import Camera from "../scene/Camera";
import Matrix from "../math/Matrix";

export default class Controller
{
    /**
     *
     */
    private camera: Camera;

    /**
     *
     */
    private left: Boolean;

    /**
     *
     */
    private up: Boolean;

    /**
     *
     */
    private right: Boolean;

    /**
     *
     */
    private down: Boolean;

    /**
     *
     */
    public constructor(camera: Camera)
    {
        this.camera = camera;
        this.left = false;
        this.up = false;
        this.right = false;
        this.down = false;

        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    /**
     *
     */
    public onKeyDown(e) {
        e = e || window.event;
        switch (e.keyCode) {
            case 37:
                this.left = true;
                break;
            case 38:
                this.up = true;
                break;
            case 39:
                this.right = true;
                break;
            case 40:
                this.down = true;
                break;
        }
    }

    /**
     *
     */
    public onKeyUp(e) {
        e = e || window.event;
        switch (e.keyCode) {
            case 37:
                this.left = false;
                break;
            case 38:
                this.up = false;
                break;
            case 39:
                this.right = false;
                break;
            case 40:
                this.down = false;
                break;
        }
    }

    /**
     *
     */
    public onFrame() {

        let m: Matrix;

        m = new Matrix();

        this.camera.transform(m);
        if (this.up) {
            m = new Matrix();
            m.translate(0, 0, 0.1);
            this.camera.transform(m);
        }

        if (this.right) {
            m = new Matrix();
            m.rotateY(1);
            this.camera.transform(m);
        }

        if (this.down) {
            m = new Matrix();
            m.translate(0, 0, -0.1);
            this.camera.transform(m);
        }

        if (this.left) {
            m = new Matrix();
            m.rotateY(-1);
            this.camera.transform(m);
        }
    }
}
