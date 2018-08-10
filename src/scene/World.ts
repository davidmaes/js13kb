import Vector from "../math/Vector";

export default class World {
    readonly sections:Vector[];

    public constructor()
    {
        this.sections = [];

        let x = 10;
        let z = 0;

        for (let i=0; i<10; i++) {
            this.sections.push(new Vector(x, 0, z, 0));

            x *= -1;
            z += 10;
        }
    }

    public getSections() {
        return this.sections;
    }
}