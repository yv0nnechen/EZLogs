<template>
  <v-container fluid id="new-schedules-container">
    <h2 class="title">Schedule New</h2>
    <v-row dense>
      <v-col v-for="type in types" :key="type.id" cols="12" md="4">
        <v-card :color="type.color" dark @click="openDialog(type)">
          <div class="d-flex flex-no-wrap justify-space-between">
            <v-avatar class="ma-3" size="100" tile>
              <v-icon dark>{{ type.icon }}</v-icon>
            </v-avatar>
            <div>
              <v-card-title
                class="title font-weight-black my-2"
                v-text="type.displayName"
              ></v-card-title>
              <v-card-subtitle
                class="subtitle-1 font-italic mt-2"
                v-text="type.despt"
              ></v-card-subtitle>
            </div>
          </div>
        </v-card>
      </v-col>
      <!-- concrete form -->
      <v-dialog v-model="dialog" max-width="600px" persistent>
        <schedule-form-wrapper :dialog="dialog"  :type=dialogType
          @cancelDialog="cancel()">
          <template slot="form-concrete"><concrete-form></concrete-form></template>
          <template slot="form-rebar"><rebar-form></rebar-form></template>
          <template slot="form-rental"><rental-form></rental-form></template>
        </schedule-form-wrapper>
        <v-card>
          <!-- <concrete-form
            @cancelDialog="cancel(type)"
            @keydown.esc="cancel(type)"
          ></concrete-form> -->
        </v-card>
      </v-dialog>
      <!-- end of concrete form -->
    </v-row>
    <v-divider></v-divider>
  </v-container>
</template>

<script>
import { ScheduleViewConfig } from './ScheduleViewConfig';
import ScheduleFormWrapper from './ScheduleFormWrapper';
import ConcreteForm from './ConcreteForm';
import RebarForm from './RebarForm';
import RentalForm from './RentalForm';

export default {
  name: 'ScheduleDashboard',
  components: {
    ScheduleFormWrapper,
    ConcreteForm,
    RebarForm,
    RentalForm,
  },
  data() {
    return {
      types: ScheduleViewConfig.types,
      dialogType: null,
      dialog: false,
    };
  },
  methods: {
    cancel() {
      this.dialog = false;
    },
    save() {
      // emit event
    },
    openDialog(type) {
      this.dialog = !this.dialog;
      this.dialogType = type;
    },
  },
};
</script>

<style></style>
