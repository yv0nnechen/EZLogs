<template>
  <base-material-card color="warning" class="px-5 py-3">
    <template v-slot:heading>
      <div class="display-2 font-weight-light">
        History Result
      </div>

      <div class="subtitle-1 font-weight-light">
        Subtotal is calculated automatically. Remove unwanted entries or change multipliers for correct results.
      </div>
    </template>
    <template>
      <v-data-table :headers="headers" :items="histories" class="elevation-1"     
      hide-default-footer
      divider="true"
      >
        <template v-slot:item.shape="{ item }">
          <v-icon>
            {{ findShapeIconById(item['_shapeId']) }}
          </v-icon>
        </template>

        <template v-slot:item.volume="{ item }">
          <span>{{ item._volume }} M<sup>3</sup></span>
        </template>

        <template v-slot:item.measurements="{ item }" class="d-inline-flex">
          <div v-for="measurement in item._measurements">
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

        <template v-slot:footer="{ headers, item }">
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
import ShapeFixture from "./ShapeFixture";
import {Shape, Diameter} from "./CalculatorUtil";
import _ from "Underscore";

export default {
  props: {
    newResult: {
      volumn: 0,
      shape: "",
      heightMeasure: {}
    }
  },
  name: "ResultHistory",
  data() {
    return {
      //view setup
      expanded: [],
      headers: [
        { text: "Type", align: "center", value: "shape", sortable: false },
        {
          text: "Measurements",
          align: "center",
          value: "measurements",
          sortable: false
        },

        { text: "Volume", align: "center", value: "volume", sortable: false },
        {
          text: "Quantity",
          align: "center",
          value: "quantity",
          sortable: false
        },
        { text: "Actions", align: "center", value: "actions", sortable: false }
      ],
      //data model
      histories: []
    };
  },
  methods: {
    findShapeIconById: function(id) {
      let shape = this.findShapeById(id);
      return shape ? shape.icon : "";
    },
    findShapeById: function(id) {
      return ShapeFixture.shapes.find(x => x.id === id);
    },
    deleteItem: function(item) {
      const index = this.histories.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.histories.splice(index, 1);
    },
    resultAdded: function(shape){
      if(!(shape instanceof Shape)) return; 
      this.histories.push(_.extend(shape, {quantity: 1}));
    },
  },
  computed: {
    total: function() {
      return this.histories.reduce(function(acc, history) {
        return acc + history.volume * history.quantity;
      }, 0);
    }
  }
};
</script>

<style></style>
