/* eslint-disable max-classes-per-file */
import { v4 as uuidv4 } from 'uuid'; // For version 5

export class Schedule {
  constructor(project, location, date, time, note, deliveryItem) {
    this.project = project;
    this.location = location;
    this.scheduledDate = date;
    this.scheduledTime = time;
    this.note = note;
    this.deliveryItem = deliveryItem;
    this.id = uuidv4();
    this.createdTime = Date.now();
    this.lastModifiedDate = Date.now();
  }
}

export const DELIVERY_TYPE = {
  CONCRETE: 'concrete',
  REBAR: 'rebar',
  RENTAL: 'rental',
};

export class DeliveryItem {
  constructor(type, amount) {
    this.amount = amount;
    this.type = type;
  }
}

export class ConcreteDelivery extends DeliveryItem {
  constructor(grade, admixtures, amount) {
    super(DELIVERY_TYPE.CONCRETE, amount);
    this.grade = grade;
    this.admixtures = admixtures;
  }
}

export class Admixture {
  constructor(mixId, specs) {
    this.mixId = mixId;
    this.specs = specs;
  }
}

export class RebarDelivery extends DeliveryItem {
  constructor(barList, barType = 'black', amount) {
    super(DELIVERY_TYPE.REBAR, amount);
    this.deliveryType = DELIVERY_TYPE.REBAR;
    this.barlist = barList;
    this.barType = barType;
  }
}

export class RentalDelivery extends DeliveryItem {
  constructor(amount, description, supplier, rentalType, po) {
    super(DELIVERY_TYPE.RENTAL, amount);
    this.description = description;
    this.supplier = supplier;
    this.rentalType = rentalType;
    this.po = po;
  }
}

export const RENTAL_TYPE = {
  EQUIPMENT: 'equipment',
  WASHROOM: 'washroom',
};

export const RENTAL_SUPPLIERS = ["Stephenson's", 'Chantlers', 'Skyway'];
