/* eslint-disable max-classes-per-file */
import { v4 as uuid } from 'uuid';

export class Shape {
  // vars measurements, shapeId, volume,

  constructor({
    widthMeasure, lengthMeasure, heightMeasure, diameterMeasure,
  }) {
    this.widthMeasure = widthMeasure;
    this.lengthMeasure = lengthMeasure;
    this.heightMeasure = heightMeasure;
    this.diameterMeasure = diameterMeasure;
    this.measurements = [widthMeasure, lengthMeasure, heightMeasure, diameterMeasure]
      .filter((measure) => measure);
  }


  toVolumnInMeters() {
    return this.bottomSurfaceArea() * this.heightMeasure.normalize();
  }

  // eslint-disable-next-line class-methods-use-this
  bottomSurfaceArea() {
    throw new TypeError('No implementation found, please implement this method');
  }
}

class Measurement {
  constructor(dimension, shortname, obj) {
    this.dimension = dimension;
    this.number = obj.number;
    this.unit = obj.unit;
    this.shortname = shortname;
    this.uuid = uuid();
  }

  get shortName() {
    return this.shortname;
  }

  normalize() { // convert everything to meter
    switch (this.unit) {
      case 'm':
        return this.number;
      case 'cm':
        return this.number / 100;
      case 'mm':
        return this.number / 1000;
      default: throw Error('Unit not recognized');
    }
  }
}

export class Slab extends Shape {
  constructor(widthMeasure, lengthMeasure, heightMeasure) {
    super({ widthMeasure, lengthMeasure, heightMeasure });
    this.shapeId = 'slab';
    this.volume = this.toVolumnInMeters();
  }

  bottomSurfaceArea() {
    return this.widthMeasure.normalize() * this.lengthMeasure.normalize();
  }
}

export class Cylinder extends Shape {
  constructor(diameterMeasure, heightMeasure) {
    super({ diameterMeasure, heightMeasure });

    this.shapeId = 'cylinder';
    this.volume = this.toVolumnInMeters();
  }

  bottomSurfaceArea() {
    return 3.14 * (this.diameterMeasure.normalize() / 2) * (this.diameterMeasure.normalize() / 2);
  }
}


export class Width extends Measurement {
  constructor(obj = {}) {
    super('width', 'W', obj);
  }
}

export class Length extends Measurement {
  constructor(obj = {}) {
    super('length', 'L', obj);
  }
}

export class Height extends Measurement {
  constructor(obj = {}) {
    super('height', 'H', obj);
  }
}

export class Diameter extends Measurement {
  constructor(obj = {}) {
    super('diameter', 'ø', obj);
  }
}
