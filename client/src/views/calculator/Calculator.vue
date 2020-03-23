<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-tabs
            v-model="tab"
            background-color="transparent"
            height="5em"
            fixed-tabs
          >
            <v-tab v-for="shape in shapes" :key="shape.id">
              <v-icon v-text="shape.icon"></v-icon>
              {{ shape.title }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item v-for="shape in shapes" :key="shape.id">
              <v-card flat>
                <v-card-text>
                  <h2>{{ shape.title }}</h2>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row name="height" v-show="showProp('height')">
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="calc.height"
                          :rules="[rules.required]"
                          label="Depth/Height"
                          type="number"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          v-model="calc.heightUnit"
                          :items="units"
                          :rules="[rules.required]"
                          label="Unit"
                          required
                        ></v-select>
                      </v-col>
                    </v-row>

                    <v-row name="length" v-show="showProp('length')">
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="calc.length"
                          label="Length"
                          value="shape.id"
                          :rules="[rules.required]"
                          type="number"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          v-model="calc.lengthUnit"
                          :items="units"
                          :rules="[rules.required]"
                          label="Unit"
                          required
                        ></v-select>
                      </v-col>
                    </v-row>

                    <v-row name="width" v-show="showProp('width')">
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="calc.width"
                          :rules="[rules.required]"
                          type="number"
                          label="Width"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          v-model="calc.widthUnit"
                          :items="units"
                          :rules="[rules.required]"
                          label="Unit"
                          required
                        ></v-select>
                      </v-col>
                    </v-row>

                    <v-row name="diameter" v-show="showProp('diameter')">
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="calc.diameter"
                          :rules="[rules.required]"
                          type="number"
                          label="Diameter"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          v-model="calc.diameterUnit"
                          :items="units"
                          :rules="[rules.required]"
                          label="Unit"
                          required
                        ></v-select>
                      </v-col>
                    </v-row>

                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="deep-purple lighten-2" text @click="calculate">
                    Calculate
                  </v-btn>
                  <v-btn color="error lighten-2" text  @click="resetForm">
                      Reset Form
                    </v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <template>
          <v-card max-width="600" class="mx-auto">
            <v-toolbar color="light-blue" dark>
              <v-toolbar-title>History Results</v-toolbar-title>

              <v-spacer></v-spacer>
            </v-toolbar>

            <v-list two-line subheader>
              <v-subheader inset>Folders</v-subheader>

              <v-divider inset></v-divider>
            </v-list>
          </v-card>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import _ from "Underscore";
export default {
  name: "ConcreteCalculator",

  data() {
    return {
      //UI setup below
      tab: null, // init tab
      shapes: [
        {
          id: "square",
          title: "Square Slab / Wall/ Column",
          icon: "mdi-cube-outline",
          props: ["height", "length", "width"]
        },
        {
          id: "round",
          title: "Round Slab / Column",
          icon: "mdi-pillar",
          props: ["height", "diameter"]
        },
        {
          id: "steps",
          title: "Steps",
          icon: "",
          props: []
        }
      ],
      valid: true,
      rules: {
        required: value => !!value || "Required.",
        number: value => {
          return _.isNumber(value) || "Must be a number";
        }
      },
      select: null,
      units: ["cm", "m"],
//model data below
       calc: {
        height: "",
        length: "",
        width: "",
        diameter: "",
        heightUnit: "",
        lengthUnit: "",
        widthUnit: "",
        diameterUnit: ""
      },
    };
  },
  computed: {},
  methods: {
    calculate() {
      if(this.validate()){
        this.resetForm();
      }
    },
    showProp(measurement) {
      if (_.isNumber(this.tab)) {
        let shape = this.shapes[this.tab];
        return shape.props.includes(measurement);
      }
      return false;
    },
    resetForm() {
      this.$refs.form[0].reset();
    },
    validate () {
        return this.$refs.form[0].validate();
      },
  }
};
</script>

<style></style>
