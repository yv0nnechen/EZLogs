<template>
  <base-material-card color="warning" class="px-5 py-3">
    <template v-slot:heading>
      <div class="display-2 font-weight-light">
        History Result
      </div>

      <div class="subtitle-1 font-weight-light">
        Subtotal is calculated automatically.
        Remove unwanted entries or change multipliers for correct results.
      </div>
    </template>
    <template>
      <v-data-table :headers="headers" :items="histories" class="elevation-1"
      hide-default-footer v-once
      divider="true"
      >
        <template v-slot:item.shape="{ item }">
          <v-icon>
            {{ findShapeIconById(item['shapeId']) }}
          </v-icon>
        </template>

        <template v-slot:item.volume="{ item }">
          <span>{{ item.volume }} M<sup>3</sup></span>
        </template>

        <template v-slot:item.measurements="{ item }" class="d-inline-flex">
          <div v-for="measurement in item.measurements" :key="measurement.uuid">
            <v-chip class="ma-2" color="info" outlined>
              {{ measurement.shortname }} {{ measurement.number }}
              {{ measurement.unit }}
            </v-chip>
          </div>
        </template>

        <template v-slot:item.quantity="{ item }">
          <v-text-field v-model="item.quantity" dense>
            <v-icon slot="append" color="red" @click="item.quantity++">mdi-plus</v-icon>
            <v-icon slot="prepend" color="green" @click="item.quantity--">mdi-minus</v-icon>
          </v-text-field>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>

        <template v-slot:footer="{ headers }">
          <v-divider></v-divider>
          <td :colspan="headers.length">
            <p class="font-weight-bold">Total Volume: {{total}} M<sup>3</sup></p>
            </td>
        </template>
      </v-data-table>
    </template>
  </base-material-card>
</template>

<script>
import _ from 'underscore';
import { v4 as uuid } from 'uuid';
import ShapeFixture from './ShapeFixture';

export default {
  props: {
    newResult: {
      volumn: 0,
      shape: '',
      heightMeasure: {},
    },
  },
  name: 'ResultHistory',
  data() {
    return {
      // view setup
      expanded: [],
      headers: [
        {
          text: 'Type', align: 'center', value: 'shape', sortable: false,
        },
        {
          text: 'Measurements',
          align: 'center',
          value: 'measurements',
          sortable: false,
        },

        {
          text: 'Volume', align: 'center', value: 'volume', sortable: false,
        },
        {
          text: 'Quantity',
          align: 'center',
          value: 'quantity',
          sortable: false,
        },
        {
          text: 'Actions', align: 'center', value: 'actions', sortable: false,
        },
      ],
      // data model
      histories: [],
    };
  },
  methods: {
    findShapeIconById(id) {
      const shape = this.findShapeById(id);
      return shape ? shape.icon : '';
    },
    findShapeById(id) {
      return ShapeFixture.shapes.find((x) => x.id === id);
    },
    deleteItem(item) {
      const index = this.histories.indexOf(item);
      // eslint-disable-next-line no-restricted-globals
      if (confirm('Are you sure you want to delete this item?')) {
        this.histories.splice(index, 1);
      }
    },
    resultAdded(shape) {
      const history = JSON.parse(shape);
      this.histories.push(_.extend(history, { quantity: 1, uuid: uuid() }));
    },
  },
  computed: {
    total() {
      return this.histories.reduce((acc, history) => acc + history.volume * history.quantity, 0);
    },
  },
};
</script>

<style></style>
