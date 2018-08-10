import World from "./scene/World";
import Camera from "./scene/Camera";

addEventListener('load', function(){

    let camera = new Camera();


    let world = new World();

    console.log(world.getSections());

});
