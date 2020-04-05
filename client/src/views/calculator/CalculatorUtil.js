export class Shape {
    constructor(...measurements){
        this._measurements = measurements;
    }

    /**
     * @returns{Measurement[]} measurements
     */
    get measurements() {
        return this._measurements;
    }

    get shapeId(){
        return this._shapeId;
    }

    get volume(){
        return this._volume;
    }

    toVolumnInMeters(){
        return this.bottomSurfaceArea() * this._heightMeasure.normalize();
    }

    bottomSurfaceArea() {}


};

class Measurement {
    constructor(dimension, shortname, obj) {
        this.dimension = dimension;
        this.number = obj.number;
        this.unit = obj.unit;
        this.shortname = shortname;    
    }

    get shortName() {
        return this.shortname;
    }

    normalize() { // convert everything to meter
        return this.unit === "cm"? this.number/100 : this.number;
    }
};

export class Slab extends Shape {
    constructor (widthMeasure, lengthMeasure, heightMeasure) {
        let _widthMeasure = new Width(widthMeasure);
        let _lengthMeasure = new Length(lengthMeasure);
        let _heightMeasure = new Height(heightMeasure);
        super(_widthMeasure, _lengthMeasure, _heightMeasure);
        this._widthMeasure = _widthMeasure
        this._lengthMeasure = _lengthMeasure;
        this._heightMeasure = _heightMeasure;
        this._shapeId = "slab";
        this._volume = this.toVolumnInMeters();
    }

    bottomSurfaceArea() {
        return this._widthMeasure.normalize() * this._lengthMeasure.normalize();
    }
    
    get heightMeasure(){
        return this._heightMeasure;
    }
}

export class Cylinder extends Shape {
    constructor (diameterMeasure, heightMeasure) {
        let _diameterMeasure = new Diameter(diameterMeasure);
        let _heightMeasure = new Height(heightMeasure);
        super(_diameterMeasure, _heightMeasure);
        this._diameterMeasure = _diameterMeasure;
        this._heightMeasure = _heightMeasure;
        this._shapeId = "cylinder";
        this._volume = this.toVolumnInMeters();
    }

    bottomSurfaceArea() {
        return 3.14 * (this._diameterMeasure.normalize()/2) * (this._diameterMeasure.normalize()/2)
    }

    get heightMeasure(){
        return this._heightMeasure;
    }
}


class Width extends Measurement {
    constructor(obj){
        super("width", "W", obj)
    }
}

class Length extends Measurement {
    constructor(obj){
        super("length", "L", obj)
    }
}

class Height extends Measurement {
    constructor(obj){
        super("height", "H", obj)
    }
}

export class Diameter extends Measurement {
    constructor(obj){
        super("diameter", "ø", obj)
    }
}

export class CalculatedResult {
    constructor(shape, measurements, volume, quantity) {
        this.shape = shape;
        this.measurements = measurements,
        this.volume = this.v
    }
}


