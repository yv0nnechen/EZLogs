<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6">
        <base-material-card class="px-5 py-3">
          <template v-slot:heading>
            <v-tabs
              v-model="tab"
              background-color="transparent"
              height="5em"
              fixed-tabs
              @change="resetForm()"
            >
              <v-tab v-for="shape in shapes" :key="shape.id">
                <v-icon v-text="shape.icon"></v-icon>
                {{ shape.title }}
              </v-tab>
              </v-tabs>
          </template>

          <v-tabs-items v-model="tab">
            <v-tab-item v-for="shape in shapes" :key="shape.id">
              <v-card flat>
                <v-card-text>
                  <h2>{{ shape.title }}</h2>
                  <v-form ref="form-slab" v-model="validSlab" lazy-validation>
                    <v-row name="depth" v-show="showProp('depth')">
                      <v-col cols="6" sm="6">
                        <v-text-field
                          v-model="calc.depth.number"
                          :rules="[rules.required]"
                          label="Depth/Height"
                          type="number"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" sm="6">
                        <v-select
                          v-model="calc.depth.unit"
                          :items="units"
                          :rules="[rules.required]"
                          label="Unit"
                        ></v-select>
                      </v-col>
                    </v-row>

                    <v-row name="length" v-show="showProp('length')">
                      <v-col cols="6" sm="6">
                        <v-text-field
                          v-model="calc.length.number"
                          label="Length"
                          value="shape.id"
                          :rules="[rules.required]"
                          type="number"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" sm="6">
                        <v-select
                          v-model="calc.length.unit"
                          :items="units"
                          :rules="[rules.required]"
                          label="Unit"
                        ></v-select>
                      </v-col>
                    </v-row>

                    <v-row name="width" v-show="showProp('width')">
                      <v-col cols="6" sm="6">
                        <v-text-field
                          v-model="calc.width.number"
                          :rules="[rules.required]"
                          type="number"
                          label="Width"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" sm="6">
                        <v-select
                          v-model="calc.width.unit"
                          :items="units"
                          :rules="[rules.required]"
                          label="Unit"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-form>

                  <v-form
                    ref="form-cylinder"
                    v-model="validCylinder"
                    lazy-validation
                  >
                    <v-row name="height" v-show="showProp('height')">
                      <v-col cols="6" sm="6">
                        <v-text-field
                          v-model="calc.height.number"
                          :rules="[rules.required]"
                          label="Depth/Height"
                          type="number"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" sm="6">
                        <v-select
                          v-model="calc.height.unit"
                          :items="units"
                          :rules="[rules.required]"
                          label="Unit"
                        ></v-select>
                      </v-col>
                    </v-row>

                    <v-row name="diameter" v-show="showProp('diameter')">
                      <v-col cols="6" sm="6">
                        <v-text-field
                          v-model="calc.diameter.number"
                          :rules="[rules.required]"
                          label="Diameter"
                          type="number"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" sm="6">
                        <v-select
                          v-model="calc.diameter.unit"
                          :items="units"
                          :rules="[rules.required]"
                          label="Unit"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-form>

                  <v-divider inset></v-divider>
                  <v-row name="result">
                    <v-col cols="12">
                      <v-text-field
                        label="Result"
                        outlined
                        disabled
                        v-model="resultVolume"
                      >
                        <template v-slot:append>M<sup>3</sup></template>
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <!-- </v-form> -->
                </v-card-text>
                <v-card-actions>
                  <v-btn color="deep-purple lighten-2" text @click="calculate">
                    Calculate
                  </v-btn>
                  <v-btn color="error lighten-2" text @click="resetForm">
                    Reset Form
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </base-material-card>
      </v-col>

      <v-col cols="12" md="6">
        <result-history ref="resultHistory"></result-history>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import _ from 'underscore';
import {
  Slab, Cylinder, Shape, Width, Length, Height, Diameter,
} from '@/models/Calculator';
import FormValidator from '@/utils/FormValidation';
import ShapeFixture from './ShapeFixture';
import ResultHistory from './ResultHistory';

export default {
  name: 'ConcreteCalculator',
  components: {
    ResultHistory,
  },
  data() {
    return {
      // UI setup below
      tab: null, // init tab
      select: null,
      validSlab: true,
      validCylinder: true,
      rules: FormValidator,
      shapes: ShapeFixture.shapes,
      units: ShapeFixture.units,
      // model data below,
      resultVolume: '',
      calc: {},
    };
  },
  computed: {},
  methods: {
    calculate() {
      switch (this.tab) {
        case 0:
          if (this.validateSlab()) {
            const slab = new Slab(this.calc.width, this.calc.length, this.calc.depth);
            this.resultVolume = slab.toVolumnInMeters();
            this.resultAdded(slab);
          }
          break;
        case 1:
          if (this.validateCylinder()) {
            const cylinder = new Cylinder(this.calc.diameter, this.calc.height);
            this.resultVolume = cylinder.toVolumnInMeters();
            this.resultAdded(cylinder);
          }
          break;
        default: break;
      }
    },
    showProp(measurement) {
      if (_.isNumber(this.tab)) {
        const shape = this.shapes[this.tab];
        return shape.props.includes(measurement);
      }
      return false;
    },
    resetForm() {
      if (this.$refs['form-slab']) this.$refs['form-slab'].forEach((form) => { form.reset(); });
      if (this.$refs['form-cylinder']) this.$refs['form-cylinder'].forEach((form) => { form.reset(); });
      this.resultVolume = '';
    },
    validateSlab() {
      return this.$refs['form-slab'][0].validate();
    },
    validateCylinder() {
      return this.$refs['form-cylinder'][1].validate();
    },
    resultAdded(shape) {
      if (!(shape instanceof Shape)) return;
      this.$refs.resultHistory.resultAdded(JSON.stringify(shape));
    },
  },
  created() {
    this.calc.depth = new Height();
    this.calc.width = new Width();
    this.calc.height = new Height();
    this.calc.diameter = new Diameter();
    this.calc.length = new Length();
  },
};
</script>

<style></style>
